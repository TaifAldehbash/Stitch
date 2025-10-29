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

function SortableSection({ id, type }: { id: string; type: string }) {
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
      onClick={() => select(id)}
      className={`m-3 p-4 rounded border cursor-pointer ${
        isSelected ? 'border-emerald-500 bg-slate-800' : 'border-slate-700 bg-slate-850'
      }`}
    >
      <h3 className="capitalize font-medium">{type}</h3>
      <p className="text-sm text-slate-400">[Section preview placeholder]</p>
    </motion.div>
  );
}

export default function Canvas() {
  const sections = useBuilderStore((s) => s.layout.sections);
  const reorder = useBuilderStore((s) => s.reorder);

  const sensors = useSensors(useSensor(PointerSensor));

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
            <SortableSection key={s.id} id={s.id} type={s.type} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}