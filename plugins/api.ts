export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const apiAddress = runtimeConfig.public.apiAddress

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiAddress + '/api',
    credentials: 'include',
    async onRequest({ options }) {
      const clientCookies = useRequestHeaders(['cookie']);

      if (!useCookie('XSRF-TOKEN').value) {
        await $fetch.create({
          credentials: 'include'
        }).raw(`${apiAddress}/sanctum/csrf-cookie`)
      }

      // if (import.meta.server) {
      //   console.log(useCookie('XSRF-TOKEN').value)
      //   console.log(useRequestURL().origin)
      // }

      options.headers = {
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': useRequestURL().origin,
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
    if (authenticated.value) return navigateTo('/account')
  
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