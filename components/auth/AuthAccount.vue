<script setup lang="ts">
type Tab = 'signin' | 'register'

const tab = $ref<Tab>('signin')
</script>

<template>
  <ul>
    <li>
      <button class="btn" @click="tab = 'signin'">
        Signin
      </button>
    </li>
    <li>
      <button class="btn" @click="tab = 'register'">
        Register
      </button>
    </li>
  </ul>
  <AuthSignin v-if="tab === 'signin'" />
  <AuthRegister v-else-if="tab === 'register'" />
</template>
