<script setup lang="ts">
const props = defineProps<{
  word: string
  orientation: 'up' | 'down'
}>()

const color = computed(() => {
  if (props.orientation === 'up')
    return 'bg-orange-600'

  else if (props.orientation === 'down')
    return 'bg-green-600'

  else
    return 'bg-blue-600'
})
</script>

<template>
  <div :class="color" flex="~" justify="center" items="center" p="4" border="5 white" rounded="2xl">
    <h2 text="6xl">
      {{ word }}
    </h2>
  </div>
</template>
