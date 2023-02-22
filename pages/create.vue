<script setup lang="ts">
const name = $ref('')

let newWord = $ref('')
const words = $ref([])

const addWord = () => {
  words.push(newWord)
  newWord = ''
}
</script>

<template>
  <main>
    <form>
      <h1>Create Pack</h1>

      <label for="name">Name</label>
      <AppInput id="name" v-model="name" type="text" />

      <label for="add-word">Add Word</label>
      <AppInput id="add-word" v-model="newWord" type="text" />
      <AppButton @click.prevent="addWord">
        Add
      </AppButton>

      <h2>Words</h2>

      <ul>
        <li v-for="(word, index) in words" :key="word">
          <AppInput v-model="words[index]" />
          <AppButton class="bg-red-500 hover:bg-red-800">
            <Icon name="mdi-trash-can" />
          </AppButton>
        </li>
      </ul>
    </form>
  </main>
</template>
