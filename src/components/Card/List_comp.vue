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
const error404 = 'There are no results for your search.'

// BEFORE USING STORE EMITS
// const emit = defineEmits(['results-count', 'update-parent','pages-count', 'no-results'])

watch(() => props.page, (newValue) => getData(newValue));

// TODO: Watch all together to clean it up
watch(() => props.status_input, () => {
  data.value = [] // clear array
  showError.value = false
  // Store
  DisableControlls.value = false  // Old with Emits // emit('no-results', false)
  DisableNextbutton.value = false


  getData(1) // always when we change a filter, go to first page
});

watch(() => props.species_input, () => {
  data.value = [] 
  showError.value = false
  DisableControlls.value = false   // old with emits: emit('no-results', false)
  DisableNextbutton.value = false

  getData(1) 
});

watch(() => props.gender_input, () => {
  data.value = [] 
  showError.value = false
  DisableControlls.value = false
  DisableNextbutton.value = false
  // emit('no-results', false)
  getData(1) 
});

watch(() => props.search, () => {
  data.value = [] 
  showError.value = false
  DisableControlls.value = false
  DisableNextbutton.value = false 
  getData(1) 
});


function getfilteredCharactersbyName(page_current){
      return fetch(API_BASE_URL + '/character' + '?page=' + props.page + '&name='+ props.search + '&status=' + props.status_input + '&species=' + props.species_input + '&gender=' + props.gender_input)
}

//const myTimeout = setTimeout(getData, 1000);
await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
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

onMounted(() => {
  getData(1) // always first page on mounted
})

onErrorCaptured((e) => {
  console.log('Error: ', e)
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
        <span v-if="showError === true"><p>{{ error404 }}</p></span>
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
  font-size: 2vw;
}
</style>