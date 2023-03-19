<script setup lang="ts">
import Flipper from './Flipper.vue'

const props = withDefaults(defineProps<{
  seconds: number
  tag: string
}>(), {
  tag: 'div',
})

const seconds = $computed(() => props.seconds % 60)
const minutes = $computed(() => Math.floor(props.seconds / 60))
</script>

<template>
  <component :is="tag" font="mono" flex="~" gap="2">
    <template v-if="minutes > 0">
      <Flipper :value="minutes" label="min" />
    </template>
    <Flipper :value="seconds" label="sec" />
  </component>
</template>
