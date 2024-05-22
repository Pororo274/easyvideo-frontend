import type { Account } from "~/interfaces/account/account.interface"

export const useProjectConfig = () => {
  const { data } = useNuxtData<Account>("accountData")

  return {
    account: readonly(data as Ref<Account>)
  }
}