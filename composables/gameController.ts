import { useSensorsStore } from '~~/store/sensors'

export const useGameController = (words: string[]) => {
// Orientation setup
  const sensorsStore = useSensorsStore()
  const orientation = computed(() => sensorsStore.orientation)

  // Game state
  let isPlaying = $ref(false)
  let index = $ref(0)
  let correctAnswers = $ref(0)

  // Word loading
  const safeIndex = $computed(() => index % words.length)
  const currentWord = $computed(() => words[safeIndex])

  const nextWord = () => index++

  const incrementScore = () => {
    correctAnswers++
    nextWord()
  }

  // Timer
  let secondsLeft = $ref(60)
  const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(() => {
    secondsLeft--
  }, 1000)
  pauseTimer()

  // PWA controller
  watch(orientation, (newOrientation) => {
    if (newOrientation === 'down')
      incrementScore()
    else if (newOrientation === 'center')
      nextWord()
  })

  // Keyboard controller
  onKeyStroke('Enter', () => incrementScore())
  onKeyStroke('Backspace', () => nextWord())

  // Game start
  const startGame = () => {
    isPlaying = true
    secondsLeft = 60
    resumeTimer()
  }

  return {
    isPlaying,
    startGame,
    secondsLeft,
    currentWord,
    correctAnswers,
    orientation,
  }
}
