<script setup>
import { stringifyStyle } from '@vue/shared';
import { ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
const response_details = ref({})
const error = ref('')
const props = defineProps(['id'])
let API_BASE_URL = `https://rickandmortyapi.com/api`

// DONT NEED ANOTHER COMPONENT HERE. IT'S THE WHOLE PAGE. 

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
        <div class="Details_view_main">
          <div class="details_view_beamer">
            <div class="picture_details_view_round"><img :src="response_details.image" alt="test"/></div>
            <div class="information">
              <p class="name">{{ response_details.name }}</p>
              <p>{{ response_details.status }}</p>
              <p>{{ response_details.species }}</p>
              <p>{{ response_details.type }}</p>
              <p>Gender: {{ response_details.gender }}</p>
              <p>Character created {{ response_details.created }}</p>
            </div>
          </div>
            <div class="picture_details_view"><img :src="response_details.image" alt="test"/></div>
        </div>
        <div class="background_details"></div>
</template>

<style scoped>
.background_details {
  position: fixed;
  width: 86vw;
  height: 100vh;
  background-image: url('../assets/background_details.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 14%;
  z-index: -1000;
}

.information {
  margin-left: 40%;
  margin-top: -17%;
}
.name {
  font-size: 2.5vw;
  color: #8b4e79;
}

.picture_details_view{
  width: 15.5%;
  height: 10vw;
  margin-left: 63%;
  margin-top: 17.2%;
  overflow: hidden;
  align-content: center;
}
.picture_details_view_round img{
border-radius: 50%;
width: 20%;
margin-top: 10%;
margin-left: 10%;
}

.picture_details_view img{
  width: 100%;
}

.details_view_beamer {
  width: 30%;
  height: 18vw;
  margin-top: 11%;
  margin-left: 9%;
  transform: perspective(900px) rotateY(10deg);
  position: absolute;
}
</style>