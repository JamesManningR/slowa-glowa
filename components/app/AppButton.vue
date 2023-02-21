<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    p="x-6"
    uppercase
    tracking="wide"
    font="semibold"
    border-2
    text="black"
  >
    <slot />
  </button>
</template>
