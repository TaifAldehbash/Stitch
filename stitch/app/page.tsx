'use client';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function Page() {
  const sections = useBuilderStore((s) => s.layout.sections);
  const add = useBuilderStore((s) => s.addSection);
  const del = useBuilderStore((s) => s.deleteSection);

  return (
    <div className="flex flex-col items-center p-10 text-white bg-slate-900 min-h-screen">
      <button
        className="mb-4 px-4 py-2 bg-emerald-600 rounded"
        onClick={() => add('hero')}
      >
        Add Hero
      </button>

      <ul>
        {sections.map((sec) => (
          <li key={sec.id} className="flex gap-3 mb-2">
            <span>{sec.type}</span>
            <button
              className="text-red-400"
              onClick={() => del(sec.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}