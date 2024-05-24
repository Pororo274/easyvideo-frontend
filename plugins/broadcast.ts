import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const broadcast = () => window.Echo
  
  nuxtApp.hook('app:mounted', () => {
    window.Pusher = Pusher
    window.Echo = new Echo({
      broadcaster: 'reverb',
      authEndpoint: runtimeConfig.public.apiAddress + '/broadcasting/auth',
      key: runtimeConfig.public.reverbAppKey,
      wsHost: runtimeConfig.public.reverbHost,
      wsPort: runtimeConfig.public.reverbPort,
      forceTLS: (runtimeConfig.public.reverbScheme ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      authHost: 'localhost:3000',
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            $fetch.create({
              baseURL: runtimeConfig.public.apiAddress
            })(
                `/broadcasting/auth`,
                {
                  method: 'post',
                  body: {
                    socket_id: socketId,
                    channel_name: channel.name,
                  },
                  credentials: 'include',
                  headers: {
                    'X-XSRF-TOKEN': useCookie("XSRF-TOKEN"),
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Origin': useRequestURL().origin,
                  }
                },
              )
              .then((res: any) => {
                callback(false, res);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
    })
  })



  return {
    provide: {
      broadcast
    }
  }
})