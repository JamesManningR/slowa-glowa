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
        class="card card-bordered"
        w="50"
        h="65"
        bg="success"
        shadow="md hover:lg"
        scale="hover:105"
        transition="transform shadow"
      >
        Create
        <Icon name="mdi-plus-circle" />
      </NuxtLink>
    </li>
  </ul>
</template>
