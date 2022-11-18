
<script setup>
import { ref } from 'vue'
const input = ref('')

</script>

<template>
    <div class="search_field">
        <form name="search" @submit.prevent="SearchMovies">
            <input type="text" 
            class="input" 
            placeholder="Search" 
            v-model="input" 
            @input="$emit('update:modelValue', $event.target.value)"
            />
        </form>
    </div> 
</template>