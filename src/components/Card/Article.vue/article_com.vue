<script setup>
import { ref, computed, onMounted, onErrorCaptured } from 'vue'
const response = ref({})
const error = ref('')

let API_BASE_URL =  'https://newsapi.ai/api/v1/article/getArticlesForTopicPage?uri=240f6a12-b9d8-40a6-b1c6-a220e31d08de&dataType=news&resultType=articles&articlesSortBy=rel&includeArticleCategories=true&includeArticleImage=true&articleBodyLen=-1&apiKey=f05bdd8b-b41f-468f-a0e7-3cb7e4281ba2'

async function getData() {
    const res = await fetch(API_BASE_URL)
    if (!res.ok) {
      throw new Error()
  } else {
    response.value = await res.json()
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
          <p class="origin">{{ card.results }}</p>
        </div>
      </li>
  </ul>
  </template>