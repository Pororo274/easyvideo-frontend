interface AppModalProvide {
  hideModal(): void
}

export const useAppModal = () => {
  const { hideModal } = inject('appModal') as AppModalProvide

  return {
    hideModal
  }
}