<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'
import { useSensorsStore } from '~~/store/sensors'
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

// Orientation setup
const sensorsStore = useSensorsStore()
const orientation = computed(() => sensorsStore.orientation)

// Setup PWA features
const { enter } = useFullscreen()
const { request } = useWakeLock()

const setupGamePwaFeatures = () => {
  request('screen')
  enter()
}

// Game
let isGameStarted = $ref(false)
let index = $ref(0)
const words = $computed(() => currentPack.words)
const safeIndex = $computed(() => index % words.length)
const currentWord = $computed(() => words[safeIndex])

const startGame = () => {
  isGameStarted = true
  setupGamePwaFeatures()
}

// Game controller
const correctAnswers = ref(0)

const incrementScore = () => {
  correctAnswers.value++
}

const loadNextWord = () => {
  index++
}

watch(orientation, (newOrientation) => {
  if (newOrientation === 'down')
    incrementScore()
  else if (newOrientation === 'center')
    loadNextWord()
})
</script>

<template>
  <div flex h-full gap="5">
    <div v-if="!isGameStarted">
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
