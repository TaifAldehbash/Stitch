'use client';

import { useRef, useState } from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { downloadJSON, parseLayoutJSON } from '@/lib/serialization';

export default function Toolbar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const layout = useBuilderStore((s) => s.layout);
  const reset = useBuilderStore((s) => s.reset);
  const loadLayout = useBuilderStore((s) => s.loadLayout);

  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; msg: string | null }>({
    type: null,
    msg: null,
  });

  const handleExport = () => {
    downloadJSON(layout.title || 'stitch_layout', layout);
    setStatus({ type: 'success', msg: 'Layout exported.' });
    setTimeout(() => setStatus({ type: null, msg: null }), 1500);
  };

  const triggerImport = () => {
    inputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      const parsed = parseLayoutJSON(text); // throws if invalid

      if (parsed.ok) {
        loadLayout(parsed.data); // ✅ Correct
      } else {
        setStatus({ type: 'error', msg: parsed.issues });
      }

      setStatus({ type: 'success', msg: 'Layout imported successfully.' });
    } catch (err: any) {
      // ZodError pretty print
      const zodIssues = err?.issues as Array<{ path: (string | number)[]; message: string }> | undefined;
      const details =
        zodIssues?.slice(0, 3).map((i) => `• ${i.path.join('.')} — ${i.message}`).join('\n') ||
        err?.message ||
        'Invalid JSON';
      setStatus({ type: 'error', msg: `Import failed:\n${details}` });
    } finally {
      // allow re-importing the same file name without page reload
      if (inputRef.current) inputRef.current.value = '';
      // auto-hide success after a moment; keep error until user changes it
      if (status.type === 'success') {
        setTimeout(() => setStatus({ type: null, msg: null }), 1500);
      }
    }
  };

  return (
    <header className="flex flex-col gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
      {/* Row: Title + Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">🧵 Stitch Builder</h1>

        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />

          <button
            onClick={triggerImport}
            className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded"
          >
            Import
          </button>

            <button
              onClick={handleExport}
              className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded"
            >
              Export
            </button>

          <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded">
            Reset
          </button>
    
<button
  onClick={() => document.dispatchEvent(new CustomEvent('toggleCatalog'))}
  className="md:hidden bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded"
>
  Sections
</button>

<button
  onClick={() => document.dispatchEvent(new CustomEvent('toggleInspector'))}
  className="md:hidden bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded"
>
  Inspector
</button>
        </div>
      </div>

      {/* Status / Error UI */}
      {status.type && status.msg && (
        <div
          className={`whitespace-pre-line text-sm px-3 py-2 rounded border ${
            status.type === 'error'
              ? 'bg-red-950/40 text-red-200 border-red-600'
              : 'bg-emerald-950/40 text-emerald-200 border-emerald-600'
          }`}
        >
          {status.msg}
        </div>
      )}
    </header>
  );
}