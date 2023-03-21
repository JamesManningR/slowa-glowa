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
      <NuxtLink
        :to="`/game/${pack.name}`"
      >
        <PackPreview
          bg="primary"
          text="primary-content"
        >
          {{ pack.name }}
        </PackPreview>
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/create"
      >
        <PackPreview bg="success" text="success-content">
          Create
          <Icon name="mdi-plus-circle" />
        </PackPreview>
      </NuxtLink>
    </li>
  </ul>
</template>
