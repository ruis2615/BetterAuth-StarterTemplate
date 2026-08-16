<script setup lang="ts">
import { authClient } from '~/utils/auth-client'

const { data: session } = await authClient.useSession(useFetch)

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function signInWithGoogle() {
  errorMessage.value = ''
  await authClient.signIn.social({ provider: 'google' })
}

async function signInWithTwitter() {
  errorMessage.value = ''
  await authClient.signIn.social({ provider: 'twitter' })
}

async function onSignUp() {
  errorMessage.value = ''
  const { error } = await authClient.signUp.email({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMessage.value = error.message ?? 'Sign up failed'
  }
}

async function onSignIn() {
  errorMessage.value = ''
  const { error } = await authClient.signIn.email({
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMessage.value = error.message ?? 'Sign in failed'
  }
}

async function onSignOut() {
  errorMessage.value = ''
  await authClient.signOut()
}
</script>

<template>
  <main class="mx-auto max-w-sm px-6 py-16">
    <h1 class="text-lg font-semibold tracking-tight">
      Better Auth starter
    </h1>
    <p class="mt-1 text-sm text-zinc-500">
      Google, X, or email and password.
    </p>

    <section
      v-if="session"
      class="mt-8 space-y-4 rounded-lg border border-zinc-200 bg-white p-5"
    >
      <p class="text-sm">
        Signed in as
        <span class="font-medium">{{ session.user.name }}</span>
        <span class="text-zinc-500"> ({{ session.user.email }})</span>
      </p>
      <button
        type="button"
        class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
        @click="onSignOut"
      >
        Sign out
      </button>
    </section>

    <section
      v-else
      class="mt-8 space-y-5 rounded-lg border border-zinc-200 bg-white p-5"
    >
      <div class="space-y-2">
        <button
          type="button"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          @click="signInWithGoogle"
        >
          Continue with Google
        </button>
        <button
          type="button"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          @click="signInWithTwitter"
        >
          Continue with X
        </button>
      </div>

      <div class="flex items-center gap-3 text-xs text-zinc-400">
        <span class="h-px flex-1 bg-zinc-200" />
        or
        <span class="h-px flex-1 bg-zinc-200" />
      </div>

      <form class="space-y-3" @submit.prevent="onSignIn">
        <label class="block text-sm">
          Name (sign up)
          <input
            v-model="name"
            type="text"
            name="name"
            autocomplete="name"
            class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
          >
        </label>
        <label class="block text-sm">
          Email
          <input
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            required
            class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
          >
        </label>
        <label class="block text-sm">
          Password (8–128 characters)
          <input
            v-model="password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
            minlength="8"
            maxlength="128"
            class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
          >
        </label>
        <div class="flex gap-2 pt-1">
          <button
            type="submit"
            class="flex-1 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
          >
            Sign in
          </button>
          <button
            type="button"
            class="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            @click="onSignUp"
          >
            Sign up
          </button>
        </div>
      </form>
    </section>

    <p v-if="errorMessage" class="mt-4 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </main>
</template>
