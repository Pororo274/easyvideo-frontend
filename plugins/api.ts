export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const apiAddress = runtimeConfig.public.apiAddress
  const apiAddressServer = runtimeConfig.public.apiAddressServer
  const serverOrigin = runtimeConfig.public.serverOrigin

  const baseUrl = import.meta.server ? apiAddressServer : apiAddress
  const origin = import.meta.server ? serverOrigin : useRequestURL().origin

  const api = $fetch.create({
    baseURL: (baseUrl || apiAddress) + '/api',
    credentials: 'include',
    async onRequest({ options }) {
      const clientCookies = useRequestHeaders(['cookie']);

      if (!useCookie('XSRF-TOKEN').value) {
        await $fetch.create({
          credentials: 'include',
          baseURL: apiAddress
        }).raw(`/sanctum/csrf-cookie`)
      }

      // if (import.meta.server) {
      //   console.log(useCookie('XSRF-TOKEN').value)
      //   console.log(useRequestURL().origin)
      // }

      options.headers = {
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': (origin || useRequestURL().origin),
        ...options.headers,
        ...(clientCookies.cookie && clientCookies),
      }
    },
  })

  addRouteMiddleware('auth', async () => {
    const { authenticated, isAlreadyTryAuth, refreshUserData } = useUser()

    if (!isAlreadyTryAuth.value) {
      await refreshUserData()
    }
    
    if (!authenticated.value) {
      return navigateTo('/login')
    }
  })

  addRouteMiddleware('guest', async () => {
    const { authenticated, refreshUserData, isAlreadyTryAuth } = useUser()
    if (!isAlreadyTryAuth.value) {
      await refreshUserData()
  
      if (authenticated.value) return navigateTo('/account')
    }
  })

  return {
    provide: {
      api
    }
  }
})