// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    starlight({
      prerender: false,
      title: '',
      logo: {
        src: './src/assets/logo-bubble.png',
        alt: 'All Voices — community ESL resources'
      },
      favicon: './src/assets/logo-mark.png',
      customCss: ['./src/styles/custom.css'],
      components: {
        PageFrame: './src/components/page-frame.astro'
      },
      defaultLocale: 'en',
      locales: {
        en: { label: 'English' },
        es: { label: 'Español' },
        fr: { label: 'Français' },
        ar: { label: 'العربية', dir: 'rtl' },
        sw: { label: 'Kiswahili' },
        ht: { label: 'Kreyòl Ayisyen' }
      },
      sidebar: [
        {
          label: 'About',
          slug: 'about',
          translations: {
            es: 'Acerca de',
            fr: 'À propos',
            ar: 'حول',
            sw: 'Kuhusu',
            ht: 'Konsènan'
          }
        },
        {
          label: 'Find a Tutor',
          slug: 'tutoring',
          translations: {
            es: 'Buscar un Tutor',
            fr: 'Trouver un tuteur',
            ar: 'ابحث عن معلم',
            sw: 'Tafuta Mwalimu',
            ht: 'Jwenn yon Titè'
          }
        },
        {
          label: 'Resources',
          translations: {
            es: 'Recursos',
            fr: 'Ressources',
            ar: 'الموارد',
            sw: 'Rasilimali',
            ht: 'Resous'
          },
          items: [
            {
              label: 'Browse All',
              link: '/resources',
              translations: {
                es: 'Explorar todo',
                fr: 'Parcourir tout',
                ar: 'تصفح الكل',
                sw: 'Kagua yote',
                ht: 'Browse tout'
              }
            }
          ]
        }
      ]
    })
  ],

  adapter: netlify()
})
