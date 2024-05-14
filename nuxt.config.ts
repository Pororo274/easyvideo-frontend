// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiAddress: process.env.API_ADDRESS,
      reverbAppKey: process.env.REVERB_APP_KEY,
      reverbHost: process.env.REVERB_HOST,
      reverbPort: process.env.REVERB_PORT,
      reverbScheme: process.env.REVERB_SCHEME
    }
  },
  experimental: {
    asyncContext: true
  }
})
