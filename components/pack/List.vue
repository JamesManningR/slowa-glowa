<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'

const packsStore = usePacksStore()

const packs = $computed(() => packsStore.packs)

if (packs.length === 0)
  await packsStore.fetchPacks()
</script>

<template>
  <PackPreview v-for="pack in packs" :key="pack.name" :pack="pack" />
</template>
