<script setup lang="ts">
defineProps<{
  value: number
  label: string
}>()
</script>

<template>
  <div flex="~ col" items="center" p="2" bg="neutral" text="neutral-content" rounded="box">
    <span class="countdown" font="mono" text="5xl">
      <span :style="{ '--value': value }" />
    </span>
    <span text="5">
      {{ label }}
    </span>
  </div>
</template>
