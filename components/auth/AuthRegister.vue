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
        <AppInput id="email" v-model="email" type="email" name="email" placeholder="Email" m="b-2" />

        <label for="username">Username</label>
        <AppInput id="username" v-model="username" type="text" name="email" placeholder="Username" m="b-2" />

        <label for="password">Password</label>
        <AppInput id="password" v-model="password" type="password" name="password" placeholder="*********" />

        <label for="confirmPassword">Confirm Password</label>
        <AppInput
          id="confirmPassword" v-model="confirmPassword" type="password" name="password"
          placeholder="*********"
        />
      </div>

      <AppButton
        type="submit" :disabled="!matchingPasswords" bg="teal-400 hover:teal-500" text="black" border="black"
        m="safe" opacity="disabled:75"
      >
        Register
      </AppButton>
    </div>
  </form>
</template>
