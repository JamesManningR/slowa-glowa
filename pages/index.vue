<script setup lang="ts">
import { usePacksStore } from '~~/store/packs'

const packsStore = usePacksStore()
const currentUser = $computed(() => packsStore.currentUser)
</script>

<template>
  <main flex justify="center" align="center" h="full" w="full">
    <PermissionsIos />

    <template v-if="currentUser">
      <Suspense>
        <template #default>
          <PackList />
        </template>

        <template #fallback>
          <Icon name="mdi-loading" animate="spin" />
        </template>
      </Suspense>
    </template>

    <template v-else>
      <AuthAccount />
    </template>
  </main>
</template>
