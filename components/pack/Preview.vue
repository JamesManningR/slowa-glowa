<script setup lang="ts">
</script>

<template>
  <article
    class="card card-bordered"
    w="50"
    h="65"
    shadow="md hover:lg"
    scale="hover:105"
    transition="transform shadow"
  >
    <div class="card-body">
      <h3 class="card-title">
        <slot />
      </h3>
    </div>
  </article>
</template>
