// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-19',
  devtools: { enabled: true },
  css: ['~/app.css'],
  imports: {
    dirs: ['types/**']
  },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/supabase', '@nuxt/ui', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'ja',
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'd1'
    }
  },
  supabase: {
    redirectOptions: {
      login: '/signin',
      callback: '/',
      include: ['/my', '/my/**']
    }
  },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'infs',
        observability: {
          enabled: true,
          logs: {
            enabled: true
          }
        },
        keep_vars: true
      }
    }
  }
})
