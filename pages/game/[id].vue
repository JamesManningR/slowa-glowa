<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'

import { usePacksStore } from '~~/store/packs'

import Flipper from '~~/components/clock/Flipper.vue'

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
} = useGameController(currentPack.words, 120)

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
  <main v-if="isPlaying" flex h="full" gap="5">
    <GameWord h="full" flex-grow :word="currentWord" :orientation="orientation" />

    <div flex="~ col" gap="4">
      <div p="4" text="center">
        <Flipper tag="p" :value="correctAnswers" label="Correct" text="3xl bolder" />
      </div>
      <div p="4" text="center">
        <Flipper tag="p" :value="skippedAnswers" label="Skipped" text="3xl bolder" />
      </div>
      <div p="4" text="center">
        <Clock tag="p" :seconds="secondsLeft" text="3xl bolder" />
      </div>
    </div>
  </main>

  <main v-else flex justify="center" items="center" h="full">
    <button class="btn btn-primary btn-lg" text="3xl" @click="start">
      Start Game
    </button>
  </main>
</template>
