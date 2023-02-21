<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'

import { usePacksStore } from '~~/store/packs'

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

const {
  isPlaying,
  startGame,
  secondsLeft,
  currentWord,
  correctAnswers,
  skippedAnswers,
  guessCorrect,
  skipWord,
  orientation,
} = useGameController(currentPack.words)

// Setup PWA features
const { request: wakeLock } = useWakeLock()
const { enter: enterFullscreen } = useFullscreen()

const setupGamePwaFeatures = () => {
  wakeLock('screen')
  enterFullscreen()
}

const start = () => {
  startGame()
  // setupGamePwaFeatures()
}

// PWA controller
watch(orientation, (newOrientation) => {
  if (newOrientation === 'down')
    guessCorrect()
  else if (newOrientation === 'center')
    skipWord()
})

// Keyboard controller
onKeyStroke('Enter', () => guessCorrect())
onKeyStroke('Backspace', () => skipWord())
</script>

<template>
  <main flex h-full w-full gap="5">
    <template v-if="isPlaying">
      <GameWord h="full" w="full" :word="currentWord" :orientation="orientation" />

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
            {{ skippedAnswers }}
          </p>
        </div>
        <div p="4" text="center">
          <Clock tag="p" :seconds="secondsLeft" text="3xl bolder" />
        </div>
      </div>
    </template>

    <AppButton v-else p="4" text="5xl" place-self="center" @click="start">
      Start Game
    </AppButton>
  </main>
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
