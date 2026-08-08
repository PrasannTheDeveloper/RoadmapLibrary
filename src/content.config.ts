import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const roadmaps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/roadmaps' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    estimatedTime: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    topicCount: z.number(),
    order: z.number(),
    icon: z.string(),
    thumbnail: z.string().optional(),
    sections: z.array(
      z.object({
        title: z.string(),
        weekLabel: z.string().optional(),
        topics: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            resources: z
              .array(
                z.object({
                  title: z.string(),
                  url: z.string(),
                  type: z.enum(['article', 'video', 'course', 'docs', 'project']),
                })
              )
              .optional(),
            subtopics: z
              .array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  description: z.string().optional(),
                })
              )
              .optional(),
          })
        ),
        projects: z
          .array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
            })
          )
          .optional(),
      })
    ),
  }),
});

export const collections = { roadmaps };
