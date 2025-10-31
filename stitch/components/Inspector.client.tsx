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

function FeaturesEditor({ section }: { section: Section }) {
  const updateProps = useBuilderStore((s) => s.updateProps);
  if (section.type !== 'features') return null;

  const items = section.props.items ?? [];

  const handleItemChange = (index: number, key: 'title' | 'description', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    updateProps(section.id, { items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...items, { title: '', description: '' }];
    updateProps(section.id, { items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateProps(section.id, { items: newItems });
  };

  return (
    <div className="space-y-3">
      <Field
        label="Title"
        value={section.props.title ?? ''}
        onChange={(v) => updateProps(section.id, { title: v })}
      />
      <div>
        <label className="block text-sm text-slate-400 mb-1">Features</label>
        {items.map((item, index) => (
          <div key={index} className="mb-4 border border-slate-700 rounded p-2 space-y-2 bg-slate-900">
            <Field
              label="Feature Title"
              value={item.title}
              onChange={(v) => handleItemChange(index, 'title', v)}
            />
            <Field
              label="Feature Description"
              value={item.description}
              textarea
              onChange={(v) => handleItemChange(index, 'description', v)}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 text-sm underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 px-3 py-1 bg-slate-700 rounded text-white text-sm"
        >
          Add Feature
        </button>
      </div>
    </div>
  );
}

function FaqEditor({ section }: { section: Section }) {
  const updateProps = useBuilderStore((s) => s.updateProps);
  if (section.type !== 'faq') return null;

  const items = section.props.items ?? [];

  const handleItemChange = (index: number, key: 'q' | 'a', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    updateProps(section.id, { items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...items, { question: '', answer: '' }];
    updateProps(section.id, { items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateProps(section.id, { items: newItems });
  };

  return (
    <div className="space-y-3">
      <Field
        label="Title"
        value={section.props.title ?? ''}
        onChange={(v) => updateProps(section.id, { title: v })}
      />
      <div>
        <label className="block text-sm text-slate-400 mb-1">FAQ Items</label>
        {items.map((item, index) => (
          <div key={index} className="mb-4 border border-slate-700 rounded p-2 space-y-2 bg-slate-900">
            <Field
              label="Question"
              value={item.q}
              onChange={(v) => handleItemChange(index, 'q', v)}
            />
            <Field
              label="Answer"
              value={item.a}
              textarea
              onChange={(v) => handleItemChange(index, 'a', v)}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 text-sm underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 px-3 py-1 bg-slate-700 rounded text-white text-sm"
        >
          Add FAQ Item
        </button>
      </div>
    </div>
  );
}

function FooterEditor({ section }: { section: Section }) {
  const updateProps = useBuilderStore((s) => s.updateProps);
  if (section.type !== 'footer') return null;

  const links = section.props.links ?? [];

  const handleLinkChange = (index: number, key: 'label' | 'href', value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [key]: value };
    updateProps(section.id, { links: newLinks });
  };

  const handleAddLink = () => {
    const newLinks = [...links, { label: '', href: '' }];
    updateProps(section.id, { links: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    updateProps(section.id, { links: newLinks });
  };

  return (
    <div className="space-y-3">
      <Field
        label="Copyright"
        value={section.props.copyright ?? ''}
        onChange={(v) => updateProps(section.id, { copyright: v })}
      />
      <div>
        <label className="block text-sm text-slate-400 mb-1">Links</label>
        {links.map((link, index) => (
          <div key={index} className="mb-4 border border-slate-700 rounded p-2 space-y-2 bg-slate-900">
            <Field
              label="Label"
              value={link.label}
              onChange={(v) => handleLinkChange(index, 'label', v)}
            />
            <Field
              label="Href"
              value={link.href}
              onChange={(v) => handleLinkChange(index, 'href', v)}
            />
            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="text-red-500 text-sm underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddLink}
          className="mt-2 px-3 py-1 bg-slate-700 rounded text-white text-sm"
        >
          Add Link
        </button>
      </div>
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

      {section.type === 'hero' && <HeroEditor section={section} />}
{section.type === 'features' && <FeaturesEditor section={section} />}
{section.type === 'faq' && <FaqEditor section={section} />}
{section.type === 'footer' && <FooterEditor section={section} />}

    </div>
  );
}