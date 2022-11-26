<script setup>
import { ref, computed, onMounted, onErrorCaptured, watch, defineEmits } from 'vue'
import CardVue from './Card.vue';

// Store
import { storeToRefs } from 'pinia'
import { useCardStore } from '../../stores/CardStore'

const CardStore = useCardStore();
const { DisableNextbutton, ResultsCount, PagesCount, DisableControlls } = storeToRefs(CardStore);

// API
let API_BASE_URL = `https://rickandmortyapi.com/api`

// Constants
const response = ref({})
const error = ref('')
const props = defineProps(['search', 'page', 'status_input', 'species_input', 'gender_input'])
const data = ref([])
const showError = ref(false)
const error404 = 'does not exist in this universe.'

// BEFORE USING STORE EMITS
// const emit = defineEmits(['results-count', 'update-parent','pages-count', 'no-results'])

watch(() => props.page, (newValue) => getData(newValue));

watch(() => [props.status_input, props.species_input, props.gender_input, props.search], () => {
  data.value = [] // clear array
  showError.value = false

  // Store
  DisableControlls.value = false  // Old with Emits // emit('no-results', false)
  DisableNextbutton.value = false
  getData(1) // always when we change a filter, go to first page
});


await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 800)
  })
  
async function getData(page) {
  try {
    const res = await getfilteredCharactersbyName(page)
    if (!res.ok) {
      if (res.status === 404) {
        error.value = res.status
        showError.value = true
        DisableNextbutton.value = true; // Old with; emit('no-results', false)
        DisableControlls.value = true;
      } else {
        error.value = "other error"
      }
  } else {
    response.value = await res?.json() || {};
    data.value = data.value.concat(response.value.results)
    handleOutputs()
  }
} catch(e) {
  throw new Error(e)
}
}

// Another way of doing the filters is by creating a computed and filter the fetch there, the advantage is that I don't have to fetch again everytime something changes. 
// But I wanted to try it like this because we already did it in the movie-queries..

// Filters and fetch without filters
function getfilteredCharactersbyName(){
      return fetch(API_BASE_URL + '/character' + '?page=' + props.page + '&name='+ props.search + '&status=' + props.status_input + '&species=' + props.species_input + '&gender=' + props.gender_input)
}

onMounted(() => {
  getData(1) // always first page on mounted
})

onErrorCaptured((e) => {
  error.value = e
  return true
})

const showCardsPerPage = computed(() => {
    return data.value // return testValue.value
    // .filter(filterCharacters) would not makes sense because I fetch the API anyway again
})

function handleOutputs(){
    // Store
    ResultsCount.value = response.value.info.count
    PagesCount.value = response.value.info.pages
    DisableNextbutton.value = false
    DisableControlls.value = false

    // OLD WITH EMITS
    // emit('results-count', response.value.info.count)
    // emit('pages-count', response.value.info.pages)
  
    // checking if next page exist and disable the button
  if (response.value.info.next != null) {
  }else {
    DisableNextbutton.value = true // emit('update-parent', true)
  }
}

</script>
<template>
    <div class="All_cards_list">
      <div class="perspective">
        <span v-if="showError === true"><p><strong>{{ search }}</strong> {{ error404 }}</p></span>
        <img v-if="showError === true" src="../../assets/error.png" alt="error image"/>
        <CardVue v-for="card in showCardsPerPage"
          @mouseenter="$emit('pass_id', card.id)"
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
    </div>
</template>

<style scoped>
span {
  text-align: center;
}
p {
  margin: 2vw;
  font-size: 1.6vw;
}
img {
  width: 100%;
}
</style>