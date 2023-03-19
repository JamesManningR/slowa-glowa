<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'
const packsStore = usePacksStore()

const username = $ref('')
const email = $ref('')
const password = $ref('')
const confirmPassword = $ref('')

const matchingPasswords = computed(() => password === confirmPassword)

const handleSubmit = () => {
  if (!matchingPasswords)
    return

  packsStore.register(email, username, password, confirmPassword)
}
</script>

<template>
  <form flex flex-col items="center" justify="center" text="gray-800" bg="gray-200" @submit.prevent="handleSubmit()">
    <div bg="black" text="white" w="full" p="4">
      <h2 text="4xl">
        Register
      </h2>
    </div>

    <div p="8">
      <div text="left" flex="~ col" m="b-8">
        <label for="email">Email</label>
        <input id="email" v-model="email" class="form-control" type="email" name="email" placeholder="Email" m="b-2">

        <label for="username">Username</label>
        <input id="username" v-model="username" class="form-control" type="text" name="email" placeholder="Username" m="b-2">

        <label for="password">Password</label>
        <input id="password" v-model="password" class="form-control" type="password" name="password" placeholder="*********">

        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword" class="form-control" type="password" name="password"
          placeholder="*********"
        >
      </div>

      <button
        class="btn"
        type="submit" :disabled="!matchingPasswords"
        m="safe" opacity="disabled:75"
      >
        Register
      </button>
    </div>
  </form>
</template>
