<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'
import { usePacksStore } from '~~/store/packs'
import { useGameController } from '~~/store/game'

definePageMeta({
  layout: 'game',
})

// Fetch packs if not already fetched
const packsStore = usePacksStore()
const packs = $computed(() => packsStore.packs)

const route = useRoute()

if (packs.length === 0)
  await packsStore.fetchPacks()

const currentPack = $computed(() => {
  const pack = packs.find(pack => pack.name === route.params.id)

  if (!pack)
    throw new Error('Pack not found')

  return pack
})

const { isPlaying, startGame, secondsLeft, currentWord, correctAnswers } = useGameController(currentPack.words)

// Setup PWA features
const { request: wakeLock } = useWakeLock()
const { enter: enterFullscreen } = useFullscreen()

const setupGamePwaFeatures = () => {
  wakeLock('screen')
  enterFullscreen()
}
</script>

<template>
  <div flex h-full gap="5">
    <div v-if="!isPlaying">
      <AppButton h="100" w="100" text="5xl" @click="startGame">
        Start Game
      </AppButton>
    </div>

    <GameWord v-else h="full" w="full" :word="currentWord" :orientation="orientation" />

    <div flex="~ col" gap="4">
      <div p="4" text="center">
        <h2>Correct</h2>
        <p text="3xl bolder">
          {{ correctAnswers }}
        </p>
      </div>
      <div p="4" text="center">
        <h2>Incorrect</h2>
        <p text="3xl bolder">
          {{ index - correctAnswers }}
        </p>
      </div>
      <div p="4" text="center">
        <p text="3xl bolder">
          {{ clockDisplay }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
