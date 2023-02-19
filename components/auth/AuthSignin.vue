<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'
const packsStore = usePacksStore()

const username = $ref('')
const password = $ref('')

const handleSubmit = () => {
  packsStore.login(username, password)
}
</script>

<template>
  <form flex flex-col items="center" justify="center" text="gray-800" bg="gray-200" @submit.prevent="handleSubmit()">
    <div bg="black" text="white" w="full" p="4">
      <h2 text="4xl">
        Sign in
      </h2>
    </div>

    <div p="8">
      <div text="left" flex="~ col" m="b-8">
        <label for="username">Username</label>
        <AppInput
          id="username"
          v-model="username"
          type="text"
          name="username"
          placeholder="Username"
          m="b-2"
        />

        <label for="password">Password</label>
        <AppInput
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="*********"
        />
      </div>

      <AppButton
        type="submit"
        bg="teal-400 hover:teal-500"
        text="black"
        border="black"
        m="safe"
      >
        Sign in
      </AppButton>
    </div>
  </form>
</template>
