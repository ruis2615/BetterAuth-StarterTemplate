import { getAuth, type AuthEnv } from '../../utils/auth'

export default defineEventHandler((event) => {
  const env = event.context.cloudflare?.env as AuthEnv | undefined
  if (!env?.DB) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare bindings are not available',
    })
  }

  const auth = getAuth(env)
  return auth.handler(toWebRequest(event))
})
