import { defineCollection, z } from 'astro:content'
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

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

// -- Shared content schema

const contentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.enum(['document']),
    body: z.string()
  }),
  z.object({
    type: z.enum(['pdf']),
    description: z.string().optional(),
    file: z.string()
  }),
  z.object({
    type: z.enum(['video']),
    description: z.string().optional(),
    file: z.string()
  }),
  z.object({
    type: z.enum(['link']),
    url: z.string().url()
  })
])

// -- Resources for learners

export const resourceTypeSchema = z.enum([
  'vocabulary-builder-worksheet',
  'reading-comprehension-check',
  'writing-prompts',
  'conversation-templates',
  'video',
  'conversation-cards'
])

export const resourceProficiencyLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])

export const resourceTopicSchema = z.enum([
  'johnson-county-culture',
  'bussing-transportation',
  'shopping',
  'health-care',
  'parent-responsibilities',
  'adult-responsibilities',
  'work-situations',
  'ordering-food',
  'talking-on-the-phone',
  'interviewing',
  'meeting-new-people-social-skills'
])

export type ResourceContent = z.infer<typeof contentSchema>
export type ResourceProficiencyLevel = z.infer<typeof resourceProficiencyLevelSchema>
export type ResourceTopic = z.infer<typeof resourceTopicSchema>

export const resourceSchema = z.object({
  title: z.string().optional(),
  type: resourceTypeSchema.optional(),
  summary: z.string().optional(),
  level: resourceProficiencyLevelSchema.default('beginner'),
  topics: z.array(resourceTopicSchema).optional().default([]),
  content: z.array(contentSchema).optional()
})

const resources = defineCollection({
  type: 'content',
  schema: resourceSchema.optional()
})

// -- ESL Resources for tutors

export const eslResourceTopicSchema = z.enum([
  'new-tutor-essentials',
  'lesson-planning-resources',
  'advanced-teaching-methods'
])

export type EslResourceTopic = z.infer<typeof eslResourceTopicSchema>

export const eslResourceSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  topics: z.array(eslResourceTopicSchema).optional().default([]),
  content: z.array(contentSchema).optional()
})

const eslResources = defineCollection({
  type: 'content',
  schema: eslResourceSchema.optional(),
})

// -- Export collections

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  resources,
  'esl-resources': eslResources,
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        'resources.title': z.string(),
        'resources.description': z.string(),
        'resources.filters.title': z.string(),
        'resources.filters.resourceType': z.string(),
        'resources.filters.level': z.string(),
        'resources.filters.topic': z.string(),
        'resources.filters.language': z.string(),

        'resources.filters.apply': z.string(),
        'resources.filters.reset': z.string(),

        'resources.filters.sort.title': z.string(),

        'resources.emptyState.noResults': z.string(),
        'resources.emptyState.tryAdjustingFilters': z.string(),
        'resources.card.file.view': z.string(),
        'resources.card.file.open': z.string(),
        'resources.card.file.download': z.string(),
        'resources.card.url.goTo': z.string(),

        'resource.notFound.title': z.string(),
        'resource.notFound.content': z.string(),
        'resource.notFound.suggestion': z.string(),
        'resource.notFound.linkText': z.string(),

        'resource.types.any': z.string(),
        'resource.types.vocabulary-builder-worksheet': z.string(),
        'resource.types.reading-comprehension-check': z.string(),
        'resource.types.writing-prompts': z.string(),
        'resource.types.conversation-templates': z.string(),
        'resource.types.video': z.string(),
        'resource.types.conversation-cards': z.string(),

        'resource.topics.johnson-county-culture': z.string(),
        'resource.topics.bussing-transportation': z.string(),
        'resource.topics.shopping': z.string(),
        'resource.topics.health-care': z.string(),
        'resource.topics.parent-responsibilities': z.string(),
        'resource.topics.adult-responsibilities': z.string(),
        'resource.topics.work-situations': z.string(),
        'resource.topics.ordering-food': z.string(),
        'resource.topics.talking-on-the-phone': z.string(),
        'resource.topics.interviewing': z.string(),
        'resource.topics.meeting-new-people-social-skills': z.string(),

        'resource.levels.any': z.string(),
        'resource.levels.beginner': z.string(),
        'resource.levels.intermediate': z.string(),
        'resource.levels.advanced': z.string(),

        'resource.languages.any': z.string(),

        'ui.languages': z.string()
      })
    })
  })
}
