<script setup lang="ts">
const props = withDefaults(defineProps<{
  seconds: number
  tag: string
}>(), {
  tag: 'div',
})

const formatted = $computed(() => {
  const minutes = Math.floor(props.seconds / 60)
  const seconds = props.seconds % 60

  return `${minutes}:${seconds}`
})
</script>

<template>
  <component :is="tag">
    {{ formatted }}}
  </component>
</template>
