<script setup lang="ts">
type Tab = 'signin' | 'register'

const tab = $ref<Tab>('signin')
</script>

<template>
  <ul>
    <li>
      <AppButton @click="tab = 'signin'">
        Signin
      </AppButton>
    </li>
    <li>
      <AppButton @click="tab = 'register'">
        Register
      </AppButton>
    </li>
  </ul>
  <AuthSignin v-if="tab === 'signin'" />
  <AuthRegister v-else-if="tab === 'register'" />
</template>
