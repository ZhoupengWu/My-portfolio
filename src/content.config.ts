import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      technologies: z.array(z.string()),
      category: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Use "contain" for logos and other images that must not be cropped.
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      repo: z.url().optional(),
      demo: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// Repositories used to learn a language or tool; they grow over time.
const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      technologies: z.array(z.string()),
      status: z.enum(['in-progress', 'completed']).default('in-progress'),
      // Short list of what the repo covers so far, shown on the card.
      topics: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      repo: z.url(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, education };
