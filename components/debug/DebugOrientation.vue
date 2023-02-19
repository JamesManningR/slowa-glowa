<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSensorsStore } from '~~/store/sensors'

const { orientation } = storeToRefs(useSensorsStore())

const color = computed(() => {
  if (orientation.value === 'up')
    return 'bg-orange-500'

  else if (orientation.value === 'down')
    return 'bg-green-500'

  else
    return 'gray'
})
</script>

<template>
  <div class="grid grid-cols-2" :class="color">
    <p>state: {{ orientation }}</p>
  </div>
</template>

<style scoped>
.direction-idndicator {
  display: flex;
  flex-direction: column;
}
</style>
