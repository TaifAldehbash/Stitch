import { z } from 'zod';

// Define the supported section types
export const sectionTypes = [
  'hero',
  'features',
  'faq',
  'footer',
] as const;

export type SectionType = (typeof sectionTypes)[number];

// Props schema per section type
export const baseSectionProps = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Define a Section schema
export const sectionSchema = z.object({
  id: z.string(),
  type: z.enum(sectionTypes),
  props: baseSectionProps.catchall(z.any()),
});

// Layout schema
export const layoutSchema = z.object({
  version: z.number().default(1),
  title: z.string().default('Untitled Page'),
  sections: z.array(sectionSchema),
});

// TypeScript types
export type Section = z.infer<typeof sectionSchema>;
export type Layout = z.infer<typeof layoutSchema>;