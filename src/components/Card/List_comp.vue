<script setup>
import { ref, computed, onMounted, onErrorCaptured, watch  } from 'vue'
import CardVue from './Card.vue';
const response = ref({})
const error = ref('')
const search = ref('')

let API_BASE_URL = `https://rickandmortyapi.com/api`

// I have no idea if that's good this way. Just trying things there..I have never tried APIs before. 

function getfilteredCharactersbyName(){
  if(search.value.length < 2) return fetch(API_BASE_URL + '/character') // return all characters
  return fetch(API_BASE_URL + '/character' + '?name='+ search.value) // filtering by name
}

async function getData() {
    const res = await getfilteredCharactersbyName()
    if (!res.ok) {
      throw new Error()
  } else {
    response.value = await res.json()
  }
}

onMounted(() => {
  getData()
})

watch(search, () => {
  getData()
});

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})

const showCardsPerPage = computed(() => {
    return response.value.results
})

</script>
<template>
  <div class="search_field">
    <form name="search" @submit.prevent="SearchMovies">
        <input type="text" class="input" placeholder="What are you looking for?" v-model="search"/>
    </form>
  </div> 
  <div class="All_cards">
    <CardVue v-for="card in showCardsPerPage" 
      :key="card.id" 
      :image="card.image"
      :name="card.name"
      :species="card.species"
      :origin="card.origin.name"
      :status="card.status"
      >
    </CardVue>
  </div>
</template>