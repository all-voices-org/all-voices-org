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
      defaultLocale: 'en',
      locales: {
        en: { label: 'English' },
        es: { label: 'Español' },
        fr: { label: 'Français' },
        ar: { label: 'العربية' },
        sw: { label: 'Kiswahili' },
        ht: { label: 'Kreyòl Ayisyen' }
      },
      sidebar: [
        {
          label: 'About',
          items: [{ label: 'About All Voices', slug: 'about' }]
        },
        {
          label: 'Resources',
          items: [{ label: 'Browse Resources', link: '/resources' }]
        }
      ]
    })
  ],

  adapter: netlify()
})
