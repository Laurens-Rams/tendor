<script setup>
import RickMortyFacts from './components/Cards/RickMortyFacts.vue';

</script>

<template>
  <Suspense>
    <template #fallback>loading..</template>
    <RickMortyFacts />
  </Suspense>

</template>

<style scoped>

</style>
