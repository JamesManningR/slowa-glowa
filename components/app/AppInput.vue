<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:model-value', value),
})
</script>

<template>
  <input v-model="value" bg="transparent" transition="border-color ease" border="b-2 current focus:teal-400" py="2" outline="none">
</template>
