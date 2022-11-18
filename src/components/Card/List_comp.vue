<script setup>
import { ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
import CardVue from './Card.vue';
const response = ref({})
const error = ref('')
const props = defineProps(['search'])

let API_BASE_URL = `https://rickandmortyapi.com/api`

function getfilteredCharactersbyName(){
  console.log(props.search)
  if(props.search.length < 2) return fetch(API_BASE_URL + '/character') // return all characters
  return fetch(API_BASE_URL + '/character' + '?name='+ props.search) // filtering by name
}

const myTimeout = setTimeout(getData, 1000);

async function getData() {
    const res = await getfilteredCharactersbyName()
    if (!res.ok) {
      throw new Error()
  } else {
    response.value = await res.json()
  }
}

onMounted(() => {
// getData()
})

watch(props, () => {
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
    <div class="All_cards_list">
      <CardVue v-for="card in showCardsPerPage"
        @click="$emit('pass_id', card.id)"
        :id="card.id"
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