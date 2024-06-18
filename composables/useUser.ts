import type { User } from "~/interfaces/account/user.interface"

export const useUser = () => {
  const { $api } = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)  
  const tryAuthCount = useState('tryAuthCount', () => 0)

  const isAlreadyTryAuth = computed(() => tryAuthCount.value > 0)
  const isLogout = useState("isLogout", () => false)
  const authenticated = computed(() => !!user.value && !isLogout.value )
  const isAdmin = computed(() => !!user.value?.roles.find(x => x === 'admin'))

  const refreshUserData = async (data?: any) => {
    if (data) {
      user.value = data
      return
    }
    try {
      user.value = await $api("/user");
    } catch (e) {}
    tryAuthCount.value += 1
  }

  const clearUser = () => {

  }

  return {
    refreshUserData,
    isAlreadyTryAuth,
    authenticated,
    user: readonly(user as Ref<User>),
    clearUser,
    isAdmin
  }
}