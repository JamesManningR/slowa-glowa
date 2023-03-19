<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'
const packsStore = usePacksStore()

const username = $ref('')
const email = $ref('')
const password = $ref('')
const confirmPassword = $ref('')

const matchingPasswords = computed(() => password === confirmPassword)

let isLoading = $ref(false)

const handleSubmit = async () => {
  if (!matchingPasswords)
    return

  isLoading = true
  await packsStore.register(email, username, password, confirmPassword)

  isLoading = false
}
</script>

<template>
  <form flex flex-col items="center" justify="center" :aria-busy="isLoading" @submit.prevent="handleSubmit()">
    <header bg="base-100" text="base-content" w="full" p="4">
      <h2 text="4xl">
        Register
      </h2>
    </header>

    <div bg="neutral" text="neutral-content" p="8">
      <div text="left" flex="~ col" m="b-8">
        <div class="form-control">
          <label for="email">Email</label>
          <input id="email" v-model="email" class="input" type="email" name="email" placeholder="Email" m="b-2">
        </div>

        <div class="form-control">
          <label for="username">Username</label>
          <input id="username" v-model="username" class="input" type="text" name="email" placeholder="Username" m="b-2">
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input id="password" v-model="password" class="input" type="password" name="password" placeholder="*********">
        </div>

        <div class="form-control">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword" class="input" type="password" name="password"
            placeholder="*********"
          >
        </div>
      </div>

      <button
        class="btn btn-primary"
        :class="{ loading: isLoading }"
        type="submit" :disabled="!matchingPasswords"
        m="safe" opacity="disabled:75"
      >
        Register
      </button>
    </div>
  </form>
</template>
