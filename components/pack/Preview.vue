<script setup lang="ts">
import type { Pack } from '~~/types'

defineProps<{
  pack: Pack
}>()
</script>

<template>
  <article>
    <NuxtLink
      :to="`/game/${pack.name}`"
      class="card card-bordered"
      w="50"
      h="65"
      bg="primary"
      shadow="md hover:lg"
      scale="hover:105"
      transition="transform shadow"
    >
      <div class="card-body" text="primary-content">
        <h3 class="card-title">
          {{ pack.name }}
        </h3>
      </div>
    </NuxtLink>
  </article>
</template>
