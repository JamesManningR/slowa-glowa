<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'

const packsStore = usePacksStore()
const packs = $computed(() => packsStore.packs)
const currentUser = $computed(() => packsStore.currentUser)
</script>

<template>
  <div flex justify="center" align="center" h="full" w="full">
    <PermissionsIos />

    <template v-if="currentUser">
      <PackList />
    </template>

    <template v-else>
      <AuthAccount />
    </template>
  </div>
</template>
