export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('out', {
    mounted (el, binding) {
      document.addEventListener(binding.arg || 'click', binding.value)
    },
    getSSRProps (binding, vnode) {
      return {}
    }
  })
})