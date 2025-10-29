'use client';
import { useBuilderStore } from '@/store/useBuilderStore';
import { sectionTypes } from '@/lib/schema';

export default function SectionCatalog() {
  const addSection = useBuilderStore((s) => s.addSection);

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">Section Library</h2>

      {sectionTypes.map((type) => (
        <button
          key={type}
          onClick={() => addSection(type)}
          className="w-full text-left bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded transition"
        >
          + Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}