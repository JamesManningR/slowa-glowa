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

  const minutesString = minutes.toString().padStart(2, '0')
  const secondsString = seconds.toString().padStart(2, '0')

  return `${minutesString}:${secondsString}`
})
</script>

<template>
  <component :is="tag">
    {{ formatted }}
  </component>
</template>
