<script setup lang="ts">
const props = defineProps<{
  word: string
  orientation?: 'up' | 'down'
}>()

const classes = computed(() => {
  if (!props.orientation)
    return 'bg-primary text-primary-content'

  if (props.orientation === 'up')
    return 'bg-error text-error-content'

  else if (props.orientation === 'down')
    return 'bg-success text-success-content'

  else
    return 'bg-primary text-primary-content'
})
</script>

<template>
  <div :class="classes" flex="~" justify="center" items="center" p="4" border="5 white" rounded="2xl">
    <h2 text="6xl">
      {{ word }}
    </h2>
  </div>
</template>
