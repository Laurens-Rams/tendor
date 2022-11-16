<script setup>
import { ref } from 'vue'
const response = ref({})

// RICK AND MORTY API - working
let API = `https://rickandmortyapi.com/api`

// ARTICLE API - working
// let API =  https:newsapi.org/v2/top-headlines?q=Apple&from=2022-11-15&sortBy=popularity&apiKey=3e54c57a83a04c1d87d2d144e53cec01

// CITY API - working
// let API = https://api.teleport.org/api/cities/

function getPromise() {
	return fetch(API + parameter)
}

// without timer for the loading.. 
const res = await getPromise('/character')
  if (!res.ok) {
    throw new Error()
  } else {
    response.value = (await res.json())
  }

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

</script>

<template>
<p>{{ response }}</p>
</template>