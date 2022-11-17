<script setup>
import { ref, computed, onMounted, onErrorCaptured, watch  } from 'vue'
import CardVue from './Card.vue';
const response = ref({})
const error = ref('')
const search = ref('')

// RICK AND MORTY API - working
let API_BASE_URL = `https://rickandmortyapi.com/api`

// ARTICLE API - working
// let API =  https:newsapi.org/v2/top-headlines?q=Apple&from=2022-11-15&sortBy=popularity&apiKey=3e54c57a83a04c1d87d2d144e53cec01

// CITY API - working
// let API = https://api.teleport.org/api/cities/
// SAME FOR ALL VARIATIONS I TRIED

function getAllCharacters(page) {
	return fetch(API_BASE_URL + '/character',  + '/?page=' + page)
}

// return fetch(API_BASE_URL + parameter + '/?page=' + page)
// ------------
// // without timer for the loading.. 
// const res = await getPromise('/character')
//   if (!res.ok) {
//     throw new Error()
//   } else {
//     response.value = (await res.json())
//   }

// ------------
// with a  timer for the loading.. so we can stimulate a loading
// await new Promise(resolve => {
//     setTimeout(() => { 
//       resolve()
//     }, 1000)
//   })

//   try {
//     const res = await getPromise('/character')
//     response.value = (await res.json())
//     console.log(response.value.results)
//   } catch (error) {
//     response.value = {answer: 'The Rick API responded with an Error: ' + error}
//   }
// ------------

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