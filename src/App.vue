<script setup>
import { ref, onErrorCaptured } from 'vue'
import List_comp from './components/Card/List_comp.vue';
import article_com from './components/Card/Article.vue/article_com.vue';

const error = ref('')

const reload = () => {
  window.location.reload()
}

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})

</script>

<template>
  <Suspense>
    <template #fallback>loading..</template>
    <List_comp />
  </Suspense>
</template>
<style scoped>

</style>
