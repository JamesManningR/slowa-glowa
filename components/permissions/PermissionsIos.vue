<script setup lang="ts">
import { useSensorsStore } from '~~/store/sensors'

const sensorsStore = useSensorsStore()

const hasPermission = $computed(() => sensorsStore.hasPermission)
const isIOS = $computed(() => sensorsStore.isIOS)
const getPermission = () => sensorsStore.getPermission()
</script>

<template>
  <AppButton v-if="isIOS && !hasPermission" bg="blue-600" @click="getPermission()">
    Grant Access
  </AppButton>
</template>
