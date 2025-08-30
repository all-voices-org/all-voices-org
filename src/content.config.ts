import { defineCollection, z } from 'astro:content'
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const locales = ['en', 'es', 'fr', 'ar', 'sw', 'ht'] as const
export type Locale = (typeof locales)[number]
export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  sw: 'Kiswahili',
  ht: 'Kreyòl ayisyen'
}

export const resourceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['pdf', 'video', 'youtube-video', 'link']).optional(),
  file: z.string().optional(), // for pdf
  url: z.string().url().optional(), // for link
})

const resources = defineCollection({
  type: 'content',
  schema: resourceSchema
})

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  resources,
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        'resources.title': z.string(),
        'resources.description': z.string(),
        'resources.filters.title': z.string(),
        'resources.filters.resourceType': z.string(),
        'resources.filters.topic': z.string(),
        'resources.filters.language': z.string(),
        'resources.emptyState.noResults': z.string(),
        'resources.emptyState.tryAdjustingFilters': z.string(),
        'resources.card.file.view': z.string(),
        'resources.card.file.open': z.string(),
        'resources.card.file.download': z.string(),
        'resources.card.url.goTo': z.string(),

        'resource.notFound.title': z.string(),
        'resource.notFound.content': z.string(),
        'resource.notFound.suggestion': z.string(),
        'resource.notFound.linkText': z.string()
      }),
    }),
  }),
}
