'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Layout, Section, SectionType } from '@/lib/schema';

// ---- Store Type ----
interface BuilderState {
  layout: Layout;
  selectedId: string | null;

  // Actions
  addSection: (type: SectionType, atIndex?: number) => void;
  deleteSection: (id: string) => void;
  reorder: (from: number, to: number) => void;
  updateProps: (id: string, props: Partial<Section['props']>) => void;
  select: (id: string | null) => void;
  loadLayout: (layout: Layout) => void;
  reset: () => void;
}

// ---- Store Implementation ----
export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      layout: {
        version: 1,
        title: 'New Page',
        sections: [],
      },
      selectedId: null,

      addSection: (type, atIndex) => {
        const newSection: Section = {
          id: nanoid(),
          type,
          props: {},
        };
        set((state) => {
          const sections = [...state.layout.sections];
          if (typeof atIndex === 'number') {
            sections.splice(atIndex, 0, newSection);
          } else {
            sections.push(newSection);
          }
          return {
            layout: { ...state.layout, sections },
            selectedId: newSection.id,
          };
        });
      },

      deleteSection: (id) => {
        set((state) => ({
          layout: {
            ...state.layout,
            sections: state.layout.sections.filter((s) => s.id !== id),
          },
          selectedId: state.selectedId === id ? null : state.selectedId,
        }));
      },

      reorder: (from, to) => {
        set((state) => {
          const updated = [...state.layout.sections];
          const [moved] = updated.splice(from, 1);
          updated.splice(to, 0, moved);
          return { layout: { ...state.layout, sections: updated } };
        });
      },

      updateProps: (id, props) => {
        set((state) => ({
          layout: {
            ...state.layout,
            sections: state.layout.sections.map((s) =>
              s.id === id ? { ...s, props: { ...s.props, ...props } } : s
            ),
          },
        }));
      },

      select: (id) => set({ selectedId: id }),

      loadLayout: (layout) => set({ layout }),

      reset: () =>
        set({
          layout: { version: 1, title: 'New Page', sections: [] },
          selectedId: null,
        }),
    }),
    {
      name: 'stitch-layout', // localStorage key
      version: 1,
      partialize: (state) => ({ layout: state.layout }), // only persist layout
    }
  )
);