<script setup lang="ts">
import { useSensorsStore } from '~~/store/sensors'

const sensorsStore = useSensorsStore()

const hasPermission = $computed(() => sensorsStore.hasPermission)
const isIOS = $computed(() => sensorsStore.isIOS)
const getPermission = () => sensorsStore.getPermission()
</script>

<template>
  <btn v-if="isIOS && !hasPermission" class="btn" @click="getPermission()">
    Grant Access
  </btn>
</template>
