import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

const locales = ['en', 'es', 'fr', 'ar', 'sw', 'ht'] as const

// Static pages (home/about/etc.)
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(locales),
    navOrder: z.number().optional()
  })
})

// ESL resources (library items)
const resources = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      lang: z.enum(locales).optional(),
      proficiency: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      topics: z.array(z.string()).default([]),
      type: z.enum(['pdf', 'video', 'link']),
      fileUrl: z.string().url().optional(), // for pdf
      videoUrl: z.string().url().optional(), // for video
      externalUrl: z.string().url().optional(), // for link
      description: z.string().optional(),
      source: z.string().optional(),
      duration: z.string().optional()
    })
    .refine(
      (d) =>
        (d.type === 'pdf' && !!d.fileUrl) ||
        (d.type === 'video' && !!d.videoUrl) ||
        (d.type === 'link' && !!d.externalUrl),
      { message: 'Provide a URL matching the resource type.' }
    )
})

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  pages,
  resources
}
