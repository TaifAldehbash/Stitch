'use client';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function Toolbar() {
  const reset = useBuilderStore((s) => s.reset);
  const layout = useBuilderStore((s) => s.layout);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${layout.title || 'stitch_layout'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
      <h1 className="text-lg font-semibold">🧵 Stitch Builder</h1>
      <div className="space-x-3">
        <button
          onClick={handleExport}
          className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded"
        >
          Export
        </button>
        <button
          onClick={reset}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded"
        >
          Reset
        </button>
      </div>
    </header>
  );
}