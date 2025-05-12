// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/app.css'],
  imports: {
    dirs: ['types/**']
  },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/supabase', '@nuxt/ui'],
  app: {
    head: {
      title: 'INF SCORE TOOL',
      titleTemplate: '%s - INF SCORE TOOL',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      meta: [
        { name: 'description', content: 'beatmania IIDX INFINITAS SCORE TOOL' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'INF SCORE TOOL' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://infs.iidx.wiki' },
        { property: 'og:image', content: '/icon.png' },
        { property: 'og:site_name', content: 'INF SCORE TOOL' },
        { property: 'og:description', content: 'beatmania IIDX INFINITAS SCORE TOOL' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@hyrorre' },
        { name: 'twitter:title', content: 'INF SCORE TOOL' },
        { name: 'twitter:description', content: 'beatmania IIDX INFINITAS SCORE TOOL' }
      ]
    }
  },
  supabase: {
    redirectOptions: {
      login: '/signin',
      callback: '/',
      include: ['/my', '/my/**']
    }
  }
})
