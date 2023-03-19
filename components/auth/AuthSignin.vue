<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'
const packsStore = usePacksStore()

const username = $ref('')
const password = $ref('')

let isLoading = $ref(false)

const handleSubmit = async () => {
  isLoading = true

  await packsStore.login(username, password)

  isLoading = false
}
</script>

<template>
  <form flex flex-col items="center" justify="center" @submit.prevent="handleSubmit()">
    <header bg="base-100" text="base-content" w="full" p="4">
      <h2 text="4xl">
        Sign in
      </h2>
    </header>

    <div p="8" bg="neutral" text="neutral-content">
      <div text="left" flex="~ col" m="b-8">
        <div class="form-control">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            class="input"
            type="text"
            name="username"
            placeholder="Username"
            m="b-2"
          >
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            class="input"
            type="password"
            name="password"
            placeholder="*********"
          >
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        m="safe"
      >
        Sign in
      </button>
    </div>
  </form>
</template>
