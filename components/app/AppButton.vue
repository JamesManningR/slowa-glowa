<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <button
    :aria-busy="isLoading"
    :disabled="isLoading"
    p="x-6"
    uppercase
    tracking="wide"
    font="semibold"
    border="2"
    bg="hover:bg-opacity-90 active:bg-opacity-75"
  >
    <slot />

    <Icon v-if="isLoading" name="mdi-loading" animate="spin" />
  </button>
</template>
