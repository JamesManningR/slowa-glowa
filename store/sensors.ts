import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDeviceOrientation } from '@vueuse/core'

export const useSensorsStore = defineStore('sensors', () => {
  const {
    gamma,
  } = useDeviceOrientation()

  const orientation = computed(() => {
    if (!gamma.value)
      return null

    if (gamma.value > 20 && gamma.value < 60)
      return 'down'

    else if (gamma.value > -45 && gamma.value < 0)
      return 'up'

    else
      return 'center'
  })

  const hasPermission = ref(false)

  // Find out if the user is on IOS
  const isIOS = $computed(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  })

  // Get the device orientation permission
  const getPermission = async () => {
    if (isIOS) {
      const permission = await (DeviceOrientationEvent as any).requestPermission()
      if (permission === 'granted')
        hasPermission.value = true

      else
        hasPermission.value = false
    }
  }

  return {
    orientation,
    isIOS,
    hasPermission,
    getPermission,
  }
})
