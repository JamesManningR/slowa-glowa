<script setup lang="ts">
const name = $ref('')

let newWord = $ref('')
const words = $ref<string[]>([])

const addWord = () => {
  words.push(newWord)
  newWord = ''
}

const removeWord = (index: number) => {
  words.splice(index, 1)
}
</script>

<template>
  <main>
    <form @submit.prevent>
      <h1>Create Pack</h1>

      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" v-model="name" class="input" type="text">
      </div>

      <div class="form-control">
        <label for="add-word">Add Word</label>
        <div class="input-group">
          <input id="add-word" v-model="newWord" class="input" type="text">
          <button class="btn btn-primary" @click.prevent="addWord">
            Add
          </button>
        </div>
      </div>

      <h2>Words</h2>

      <ul>
        <li v-for="(word, index) in words" :key="word" flex gap="2" m="b-2">
          <input v-model.lazy="words[index]" class="input">
          <button class="btn btn-error" @click.prevent="removeWord(index)">
            <Icon name="mdi-trash-can" />
          </button>
        </li>
      </ul>
    </form>
  </main>
</template>
