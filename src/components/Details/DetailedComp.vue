<script setup>
import { stringifyStyle } from '@vue/shared';
import { ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
const response_details = ref({})
const error = ref('')
const props = defineProps(['id'])
let API_BASE_URL = `https://rickandmortyapi.com/api`

// THIS COMPPNENT IS ONLY FOR THE DETAILS IN THE CARD VIEW. NOT THE DETAILS VIEW.

function getfilteredCharactersbyName(){
return fetch(API_BASE_URL + '/character' + '/' + props.id) 
}

async function getData() {
    const res = await getfilteredCharactersbyName()
    if (!res.ok) {
      throw new Error()
  } else {
    response_details.value = await res.json()
    console.log(response_details.value)
  }
}

onMounted(() => {
getData()
})

watch(props, () => {
  getData()
});

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})

</script>
<template>
        <div>
            <div class="picture_details"><img :src="response_details.image" alt="test"/></div>
            <div class="detail_basics_comp">
                <p class="name_details">{{ response_details.name }}</p>
                <p class="species">{{ response_details.species }}</p>
                <p>{{ response_details.type }}</p>
                <p>Gender: {{ response_details.gender }}</p>
            </div>
        </div>
</template>