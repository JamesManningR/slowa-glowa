import PocketBase from 'pocketbase'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Pack } from '~~/types'

// Get the PocketBase url from the environment variables
const runtimeCfg = useRuntimeConfig()
const dbUrl = runtimeCfg.public.dbUrl
const db = new PocketBase(dbUrl)

export const usePacksStore = defineStore('packs', () => {
  // Auth ==================================================
  const currentUser = ref(db.authStore.model)

  // Sync authStore with currentUser
  db.authStore.onChange(() => {
    currentUser.value = db.authStore.model
  })

  /**
   * Logs the user in to allow access to the database
   */
  const login = async (username: string, password: string) => {
    await db.collection('users').authWithPassword(username, password)

    return currentUser.value
  }

  /**
   * Creats a new user and logs them in
   */
  const register = async (email: string, username: string, password: string, passwordConfirm: string) => {
    try {
      await db.collection('users').create({ email, username, password, passwordConfirm })
      await login(username, password)
    }
    catch (err: any) {
      throw new Error(err.message)
    }

    return currentUser.value
  }

  /**
   * Logs the user out
   */
  const logout = () => db.authStore.clear()

  /**
   * Returns true if the user is logged in
   */
  const isLoggedIn = computed(() => currentUser.value !== null)

  // Packs =================================================

  const packs = ref<Pack[]>([])

  /**
   * Fetch a list of all packs from the database
   */
  const fetchPacks = async () => {
    let data

    try {
      data = await db.collection('packs').getFullList<Pack>()
    }
    catch (err: any) {
      throw new Error(err)
    }

    packs.value = data
    return packs.value
  }

  return {
    currentUser,
    isLoggedIn,
    login,
    register,
    logout,
    packs,
    fetchPacks,
  }
})
