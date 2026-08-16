import { getAuth, type AuthEnv } from './server/utils/auth'

/**
 * Better Auth CLI entry (`npx auth@latest generate`).
 * Runtime handlers must not import this file; they call getAuth(env) per request.
 */
export const auth = getAuth({
  DB: {} as D1Database,
  R2: {} as R2Bucket,
  ASSETS: {} as Fetcher,
  BETTER_AUTH_SECRET: 'cli-schema-generate-only-not-a-runtime-secret',
  BETTER_AUTH_URL: 'http://localhost:3000',
  GOOGLE_CLIENT_ID: 'cli',
  GOOGLE_CLIENT_SECRET: 'cli',
  TWITTER_CLIENT_ID: 'cli',
  TWITTER_CLIENT_SECRET: 'cli',
} as AuthEnv)
