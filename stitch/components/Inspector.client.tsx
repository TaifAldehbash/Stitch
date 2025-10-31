'use client';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Section } from '@/lib/schema';
import { shallow } from 'zustand/shallow';

// Field Component
const Field = ({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
  textarea?: boolean;
}) => (
  <div className="space-y-1">
    <label className="block text-sm text-slate-400">{label}</label>
    {textarea ? (
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
      />
    ) : (
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
      />
    )}
  </div>
);

// Per-type editors
function HeroEditor({ section }: { section: Section }) {
  const updateProps = useBuilderStore((s) => s.updateProps);

  if (section.type !== 'hero') return null; // ✅ narrow type

  return (
    <div className="space-y-3">
      <Field
        label="Title"
        value={section.props.title}
        onChange={(v) => updateProps(section.id, { title: v })}
      />
      <Field
        label="Subtitle"
        value={section.props.subtitle}
        onChange={(v) => updateProps(section.id, { subtitle: v })}
      />
      <Field
        label="Image URL"
        value={section.props.imageUrl}
        onChange={(v) => updateProps(section.id, { imageUrl: v })}
      />
      <Field
        label="CTA Text"
        value={section.props.ctaText}
        onChange={(v) => updateProps(section.id, { ctaText: v })}
      />
      <Field
        label="CTA Link"
        value={section.props.ctaHref}
        onChange={(v) => updateProps(section.id, { ctaHref: v })}
      />
    </div>
  );
}

// Fallback generic editor
function GenericEditor({ section }: { section: Section }) {
  const updateProps = useBuilderStore((s) => s.updateProps);

  const hasTitle = 'title' in section.props;
  const hasDescription = 'description' in section.props;

  return (
    <div className="space-y-3">
      {hasTitle && (
        <Field
          label="Title"
          value={(section.props as any).title ?? ''}
          onChange={(v) => updateProps(section.id, { title: v })}
        />
      )}

      {hasDescription && (
        <Field
          label="Description"
          textarea
          value={(section.props as any).description ?? ''}
          onChange={(v) => updateProps(section.id, { description: v })}
        />
      )}
    </div>
  );
}
export default function Inspector() {
  const selectedId = useBuilderStore((s) => s.selectedId);
  const section = useBuilderStore(
    (s) => s.layout.sections.find((sec) => sec.id === s.selectedId)
  );
  const updateProps = useBuilderStore((s) => s.updateProps);

  if (!selectedId || !section){
    return <p className="p-4 text-slate-500">Select a section to edit.</p>;
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-2 capitalize">{section.type}</h2>

      {section.type === 'hero' ? (
        <HeroEditor section={section} />
      ) : (
        <GenericEditor section={section} />
      )}

    </div>
  );
}