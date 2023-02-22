<script setup lang="ts">
import type { Pack } from '~~/types'

defineProps<{
  pack: Pack
}>()
</script>

<template>
  <NuxtLink
    :to="`/game/${pack.name}`"
    flex
    content="center"
    items="center"
    w="50"
    h="65"
    p="10"
    bg="blue-600 hover:blue-800"
    transition="background-color transform"
    transform="hover:scale-110"
    z-index="hover:10"
    border="white 5"
    rounded="xl"
    text-3xl
    text-white
    text-center
  >
    {{ pack.name }}
  </NuxtLink>
</template>
