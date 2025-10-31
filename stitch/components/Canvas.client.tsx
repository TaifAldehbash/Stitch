'use client';
import { useBuilderStore } from '@/store/useBuilderStore';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

function SortableSection({ id, type, props }: { id: string; type: string; props: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const select = useBuilderStore((s) => s.select);
  const selectedId = useBuilderStore((s) => s.selectedId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedId === id;

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      layout
      onClick={(e) => {
        e.stopPropagation();
        select(id);
      }}
      className={`m-3 p-4 rounded border cursor-pointer ${
        isSelected ? 'border-emerald-500 bg-slate-800' : 'border-slate-700 bg-slate-850'
      }`}
    >
      {/* 🧩 Dynamic section preview */}
      {type === 'hero' && (
        <div>
          <h3 className="text-xl font-semibold">{props.title || 'Hero Title'}</h3>
          <p className="text-slate-400">{props.subtitle || 'Subtitle goes here'}</p>
          {props.imageUrl && (
            <img
              src={props.imageUrl}
              alt="Hero"
              className="w-full h-32 object-cover rounded mt-2"
            />
          )}
          {props.ctaText && (
            <button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded">
              {props.ctaText}
            </button>
          )}
        </div>
      )}

{type === 'features' && (
  <div>
    <h3 className="text-xl font-semibold mb-2">{props.title || 'Features'}</h3>
    <ul className="space-y-2">
      {(props.items ?? []).map((item: any, i: number) => (
        <li key={i} className="border border-slate-700 rounded p-2 bg-slate-900">
          <p className="font-medium text-emerald-400">{item.title || `Feature ${i + 1}`}</p>
          <p className="text-slate-400 text-sm">{item.description || ''}</p>
        </li>
      ))}
    </ul>
  </div>
)}

{type === 'faq' && (
  <div>
    <h3 className="text-xl font-semibold mb-2">{props.title || 'FAQ'}</h3>
    <div className="space-y-2">
      {(props.items ?? []).map((item: any, i: number) => (
        <div key={i} className="border border-slate-700 rounded p-2 bg-slate-900">
          <p className="font-medium text-emerald-400">{item.question || `Question ${i + 1}`}</p>
          <p className="text-slate-400 text-sm">{item.answer || ''}</p>
        </div>
      ))}
    </div>
  </div>
)}

{type === 'footer' && (
  <div>
    <p className="text-slate-400 text-sm mb-2">
      {props.copyright || '© 2025 Your Company'}
    </p>
    <div className="flex flex-wrap gap-3">
      {(props.links ?? []).map((link: any, i: number) => (
        <a
          key={i}
          href={link.href || '#'}
          className="text-emerald-400 text-sm hover:underline"
        >
          {link.label || 'Link'}
        </a>
      ))}
    </div>
  </div>
)}

{/* Generic fallback for unknown types */}
{!['hero', 'features', 'faq', 'footer'].includes(type) && (
  <>
    <h3 className="capitalize font-medium">{type}</h3>
    {props.title && <p className="text-white">{props.title}</p>}
    <p className="text-sm text-slate-400">
      {props.description || '[Section preview placeholder]'}
    </p>
  </>
)}
    </motion.div>
  );
}

export default function Canvas() {
  const sections = useBuilderStore((s) => s.layout.sections);
  const reorder = useBuilderStore((s) => s.reorder);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      reorder(oldIndex, newIndex);
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-full bg-slate-950 p-2">
          {sections.length === 0 && (
            <p className="text-center text-slate-500 mt-10">No sections yet. Add from the left.</p>
          )}

          {sections.map((s) => (
            <SortableSection key={s.id} id={s.id} type={s.type} props={s.props} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}