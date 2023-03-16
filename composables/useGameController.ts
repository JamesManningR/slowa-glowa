import type { MaybeRef } from '@vueuse/shared'
import { useSensorsStore } from '~~/store/sensors'

export const useGameController = (words: string[], gameLength: MaybeRef<number> = 60) => {
// Orientation setup
  const sensorsStore = useSensorsStore()
  const orientation = computed(() => sensorsStore.orientation)

  // Game state
  const isPlaying = ref(false)
  const index = ref(0)
  const correctAnswers = ref(0)
  const skippedAnswers = computed(() => index.value - correctAnswers.value)

  // Word loading
  const safeIndex = computed(() => index.value % words.length)
  const currentWord = computed(() => words[safeIndex.value])

  const nextWord = () => index.value++

  const guessCorrect = () => {
    correctAnswers.value++
    nextWord()
  }

  const skipWord = () => nextWord()

  // Timer
  const secondsLeft = ref(unref(gameLength))
  const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(() => {
    secondsLeft.value--
  }, 1000)
  pauseTimer()

  const resetGame = () => {
    isPlaying.value = false
    secondsLeft.value = unref(gameLength)
    index.value = 0
    correctAnswers.value = 0
    pauseTimer()
  }

  // Game start
  const startGame = () => {
    isPlaying.value = true
    resumeTimer()
  }

  return {
    isPlaying,
    resetGame,
    startGame,
    secondsLeft,
    currentWord,
    // Scoring
    correctAnswers,
    skippedAnswers,
    guessCorrect,
    skipWord,
    orientation,
  }
}
