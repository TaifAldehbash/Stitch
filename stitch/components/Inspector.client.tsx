'use client';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function Inspector() {
  const selectedId = useBuilderStore((s) => s.selectedId);
  const section = useBuilderStore((s) =>
    s.layout.sections.find((sec) => sec.id === s.selectedId)
  );
  const updateProps = useBuilderStore((s) => s.updateProps);

  if (!selectedId || !section)
    return <p className="p-4 text-slate-500">Select a section to edit.</p>;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-2 capitalize">{section.type}</h2>

      <div className="space-y-2">
        <label className="block text-sm text-slate-400">Title</label>
        <input
          type="text"
          value={section.props.title ?? ''}
          onChange={(e) => updateProps(section.id, { title: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-slate-400">Description</label>
        <textarea
          value={section.props.description ?? ''}
          onChange={(e) => updateProps(section.id, { description: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
        />
      </div>
    </div>
  );
}