export default defineNuxtRouteMiddleware(() => {
  const { isAdmin } = useUser()

  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Вход запрещен',
    })
  }
})