
<script setup>
import { ref, onErrorCaptured, computed, getTransitionRawChildren } from 'vue'
import List_comp from './../components/Card/List_comp.vue';
import article_comp from './../components/Card/Article.vue/article_com.vue';
import SearchVue from '../components/Filter/Search.vue';
import DetailedCompVue from '../components/Details/DetailedComp.vue';

const { id } = defineProps(['id']);

const error = ref('')
const search_passed = ref('')
const id_passed = ref('1')

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})


const showCardsPerPage = computed(() => {
return pass_id
})

</script>
<template>
<main class="card_view_main">
<div class="fingers"></div>
    <div class="middle_box">
    <Suspense>
        <SearchVue v-model="search_passed" />
    </Suspense>

    <Suspense>
        <div class="hand_phone">
            <List_comp :search="search_passed" @pass_id="id_passed = $event"/>
        </div>
        <template #fallback>
        </template>
    </Suspense>
    </div>
</main>
<div class="sidebar_right">
    <Suspense>
        <DetailedCompVue :id="id_passed"/>
        <template #fallback>
        </template>
    </Suspense>
</div>
</template>