<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'

const packsStore = usePacksStore()

const packs = $computed(() => packsStore.packs)

if (packs.length === 0)
  await packsStore.fetchPacks()
</script>

<template>
  <ul flex gap="4">
    <li v-for="pack in packs" :key="pack.name">
      <PackPreview :pack="pack" />
    </li>
    <li>
      <NuxtLink
        to="/create"
        flex="~ col"
        justify="center"
        items="center"
        gap="1"
        w="50"
        h="65"
        p="10"
        bg="green-600 hover:green-800"
        transition="background-color transform"
        transform="hover:scale-110"
        z-index="hover:10"
        border="white 5"
        rounded="xl"
        text-3xl
        text-white
        text-center
      >
        Create
        <Icon name="mdi-plus-circle" />
      </NuxtLink>
    </li>
  </ul>
</template>
