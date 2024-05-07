interface User {
  username: string;
  id: number;
}

export const useUser = () => {
  const { $api } = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)  
  const tryAuthCount = useState('tryAuthCount', () => 0)

  const isAlreadyTryAuth = computed(() => tryAuthCount.value > 0)
  const authenticated = computed(() => !!user.value) 

  const refreshUserData = async () => {
    try {
      user.value = await $api("/user");
    } catch (e) {}
    tryAuthCount.value += 1
  }

  return {
    refreshUserData,
    isAlreadyTryAuth,
    authenticated,
    user: readonly(user)
  }
}