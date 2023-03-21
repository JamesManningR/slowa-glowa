<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'

const packsStore = usePacksStore()
const isLoggedIn = $computed(() => packsStore.isLoggedIn)

const logout = () => packsStore.logout()
</script>

<template>
  <header flex justify="between">
    <NuxtLink to="/">
      <i i-fluent-emoji-flat-person-gesturing-ok />
    </NuxtLink>

    <nav
      text="xl gray4"
      m="5"
      flex
      gap="3"
    >
      <!-- <ul>
        <li>
        </li>
      </ul> -->

      <button v-if="isLoggedIn" @click="logout">
        Sign out
      </button>
    </nav>
  </header>
</template>
