
<script setup>
import { ref, onErrorCaptured, computed } from 'vue'
import List_comp from './../components/Card/List_comp.vue';
import SearchVue from '../components/Filter/Search.vue';
import DetailedCompVue from '../components/Details/DetailedComp.vue';
import LoaderVue from '../components/Loader.vue';
// STORE
import { storeToRefs } from 'pinia'
import { useCardStore } from '../stores/CardStore' // @ = src folder

const CardStore = useCardStore();
const { DisableNextbutton, ResultsCount, PagesCount, DisableControlls } = storeToRefs(CardStore);

const { id } = defineProps(['id']);
const showFilters = ref(false)
const error = ref('')

const search_passed = ref('')
const pageNumber = ref(1)
const id_passed = ref('1')

// Buttons
const input_status = ref('')
const input_specie = ref('')
const input_gender = ref('')

const species = [
    "Human", "Alien", "Humanoid",
    "Poopybutthole", "Mythological", "Unknown",
    "Animal", "Disease","Robot","Cronenberg",
];

const status = [
    "Dead", "Alive", "Unknown"
];

const genders = [
    "Female", "Male", "Genderless",
    "Unknown"
];

onErrorCaptured((e) => {
  error.value = e
  return true
})

function handleBtn(status) {
    input_status.value = status
}
function handleBtnSpecie(specie) {
    input_specie.value = specie
}
function handleBtnGender(gender) {
    input_gender.value = gender
}

function ClearFilters() {
    input_specie.value = ''
    input_status.value = ''
    input_gender.value = ''
}

function ScaleHand(){
    document.getElementById("scale_card").style.transform = "scale(1.1)";
    document.getElementById("scale_filter_image").style.transform = "scale(0.9)";
}
function DownScaleHand() {
    document.getElementById("scale_card").style.transform = "scale(1.0)";
    document.getElementById("scale_filter_image").style.transform = "scale(1.0)";
}

</script>
<template>
<main class="card_view_main" id="scale_card">
<div class="fingers"></div>
    <SearchVue v-model="search_passed" />
    <Suspense>
        <div class="hand_phone" @mouseenter="ScaleHand()" @mouseleave="DownScaleHand()">
            <div class="controlls" v-show="DisableControlls == false"><p>{{ ResultsCount }} results ({{ PagesCount }} pages)</p></div>
            <List_comp 
            :search="search_passed" 
            :page="pageNumber" 
            :status_input="input_status" 
            :species_input="input_specie" 
            :gender_input="input_gender" 
            @pass_id="id_passed = $event"
            />
            <div class="LoadMore">
                <button class="Load" v-show="DisableNextbutton == false" @click="pageNumber+= 1">LOAD MORE..</button>
            </div>
        </div>
        <template #fallback>
            <LoaderVue />
        </template>
    </Suspense>
</main>
<img class="background_img" alt="background" src="../assets/background.png" />
<div class="sidebar_right">
    <Suspense>
        <DetailedCompVue :id="id_passed"/>
        <template #fallback>
            <LoaderVue />
        </template>
    </Suspense>
    <div class="controll_panel_filters" v-if="showFilters == true">
        <button class="Exit_filters" @click="showFilters = false">X</button>

        <div class="status_filter filters">
              <button :class="{ active : input_status === state }" v-for="state in status" @click="handleBtn(state)">
                {{ state }}
              </button>
        </div>

        <div class="species_filter filters">
              <button :class="{ active : input_specie === specie }" v-for="specie in species" @click="handleBtnSpecie(specie)">
                {{ specie }}
              </button>
        </div>

        <div class="gender_filter filters">
              <button :class="{ active : input_gender === gender }" v-for="gender in genders" @click="handleBtnGender(gender)">
                {{ gender }}
              </button>
        </div>
        <button class="Clear_filters" @click="ClearFilters()">clear all filters..</button>
        </div>
        <button v-show="showFilters == false" class="click_here" @click="showFilters = true">Click to FILTER</button>
    <img class="filters_background" id="scale_filter_image" src="../assets/filter_background.png" alt="filters" @click="showFilters = true"/>
</div>
<div class="flicker_cards"><img class="animation" src="../assets/lights.gif" alt="gif" /></div>
</template>