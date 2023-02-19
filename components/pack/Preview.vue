<script setup lang="ts">
import type { Pack } from '~~/types'

defineProps<{
  pack: Pack
}>()
</script>

<template>
  <NuxtLink :to="`/game/${pack.name}`" p="4" bg="blue-600" text="white">
    <h3>{{ pack.name }}}</h3>
  </NuxtLink>
</template>
