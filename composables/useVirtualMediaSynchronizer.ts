export const useVirtualMediaSynchronizer = () => {
  const { project } = useProject()
  const { $api } = useNuxtApp()

  const { virtualMedias } = useVirtualMedias()

  const sync = async () => {
    await $api(`/projects/${project.value.id}/virtual-media/sync`, {
      method: 'post',
      body: {
        virtualMedias: virtualMedias.value
      }
    })
  }

  const planNextSync = () => {
    setTimeout(async () => {
      await sync();
      planNextSync()
    }, 1000 * 60)
  }

  return {
    sync
  }
}