
<script setup>
import { ref, onErrorCaptured } from 'vue'
import List_comp from './../components/Card/List_comp.vue';

const error = ref('')

onErrorCaptured((e) => {
  console.log('error', e)
  error.value = e
  return true
})
</script>

<template>
<div class="middle_box">
  <Suspense>
    <template #fallback>loading..</template>
    <List_comp />
  </Suspense>
</div>
</template>