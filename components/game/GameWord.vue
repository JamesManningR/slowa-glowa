<script setup lang="ts">
const props = defineProps<{
  word: string
  orientation: 'up' | 'down'
}>()

const color = computed(() => {
  if (props.orientation === 'up')
    return 'bg-orange-500'

  else if (props.orientation === 'down')
    return 'bg-green-500'

  else
    return 'bg-blue-500'
})
</script>

<template>
  <div :class="color" flex p="4" border="5 white" rounded-2xl items="center" justify="center">
    <h2 text="6xl">
      {{ word }}
    </h2>
  </div>
</template>
