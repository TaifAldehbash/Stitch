import { z } from 'zod';

// Define the supported section types
export const sectionTypes = [
  'hero',
  'features',
  'faq',
  'footer',
] as const;

export type SectionType = (typeof sectionTypes)[number];

// --- Typed props per section ---
const heroProps = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().url().optional(),
    ctaText: z.string().optional(),
    ctaHref: z.string().optional(),
  });
  
  const featuresProps = z.object({
    title: z.string().optional(),
    items: z
      .array(
        z.object({
          icon: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .optional(),
  });
  
  const faqProps = z.object({
    title: z.string().optional(),
    items: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  });
  
  const footerProps = z.object({
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    copyright: z.string().optional(),
  });

// Props schema per section type
export const baseSectionProps = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Section schema
export const sectionSchema = z.discriminatedUnion('type', [
    z.object({ id: z.string(), type: z.literal('hero'), props: heroProps }),
    z.object({ id: z.string(), type: z.literal('features'), props: featuresProps }),
    z.object({ id: z.string(), type: z.literal('faq'), props: faqProps }),
    z.object({ id: z.string(), type: z.literal('footer'), props: footerProps }),
  ]);

// Layout schema
export const layoutSchema = z.object({
  version: z.number().default(1),
  title: z.string().default('Untitled Page'),
  sections: z.array(sectionSchema),
});

// TypeScript types
export type Section = z.infer<typeof sectionSchema>;
export type Layout = z.infer<typeof layoutSchema>;