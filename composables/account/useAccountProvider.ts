import type { Subscription } from "~/interfaces/account/subscription.interface"
import type { UserBrief } from "~/interfaces/account/user-brief.interface"

interface AccountProvider {
  account: Readonly<Ref<{
    brief: UserBrief,
    subscription: Subscription | null
  }>>

}

export const useAccountProvider = () => {
  const { account } = inject("accountProvider") as AccountProvider
  
  return {
    account
  }
}