import type { UserBrief } from "~/interfaces/account/user-brief.interface"

interface AccountProvider {
  brief: Readonly<Ref<UserBrief>>
}

export const useAccountProvider = () => {
  const { brief } = inject("accountProvider") as AccountProvider
  
  return {
    brief
  }
}