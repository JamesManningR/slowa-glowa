<script setup lang="ts">
type Tab = 'signin' | 'register'

const activeTab = $ref<Tab>('signin')

const tabs = [
  { name: 'signin', label: 'Signin' },
  { name: 'register', label: 'Register' },
] as {
  name: Tab
  label: string
}[]
</script>

<template>
  <div class="flex flex-col">
    <ul class="tabs">
      <li
        v-for="tabItem in tabs"
        :key="tabItem.name"
        class="tab tab-lifted"
        :class="{ 'tab-active': activeTab === tabItem.name }"
        @click="activeTab = tabItem.name"
      >
        {{ tabItem.label }}
      </li>
    </ul>
    <AuthSignin v-if="activeTab === 'signin'" />
    <AuthRegister v-else-if="activeTab === 'register'" />
  </div>
</template>
