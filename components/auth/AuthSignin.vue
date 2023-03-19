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
        <input
          id="username"
          v-model="username"
          class="form-control"
          type="text"
          name="username"
          placeholder="Username"
          m="b-2"
        >

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          class="form-control"
          type="password"
          name="password"
          placeholder="*********"
        >
      </div>

      <button
        type="submit"
        class="btn"
        m="safe"
      >
        Sign in
      </button>
    </div>
  </form>
</template>
