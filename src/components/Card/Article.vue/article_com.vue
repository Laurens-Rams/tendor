<script setup>
import { ref, computed, onMounted, onErrorCaptured } from 'vue'
const response = ref({})
const error = ref('')

let API_BASE_URL =  'https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=3e54c57a83a04c1d87d2d144e53cec01'

async function getData() {
    const res = await fetch(API_BASE_URL)
    if (!res.ok) {
      throw new Error()
  } else {
    response.value = await res.json()
    console.log(response.value.articles)
  }
}

onMounted(() => {
  getData()
})

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})


const showCardsPerPage = computed(() => {
    return response.value.articles
})

</script>

<template>
  <ul class="All_cards">
      <li v-for="card in showCardsPerPage" :key="card.id">
        <!-- TODO: Create Component for this -->
        <div class="RickMorty_card">
          <p class="origin">{{ card.title }}</p>
          <p class="origin">{{ card.description }}</p>
          <div class="picture"><img :src="card.urlToImage" alt="test"/></div>
          <p class="origin">{{ card.publishedAt }}</p>

        </div>
      </li>
  </ul>
  </template>