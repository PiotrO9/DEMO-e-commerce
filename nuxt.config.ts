// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
    css: ['./assets/styles/main.css'],
    ssr: false,

    eslint: {
        checker: true,
        config: {
            stylistic: true
        }
    },

    compatibilityDate: '2024-10-08'
});
