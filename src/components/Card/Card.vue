<script setup>
import { ref, onMounted } from 'vue'
defineProps(['name','image','species','origin','status'])

</script>
<template>
    <li>
        <div class="RickMorty_card">
            <div class="top_bar">Card</div>
            <div class="picture"><img :src="image" alt="test"/></div>
            <p class="name">{{ name }}</p>
            <p class="species">{{ species }}</p>
            <p class="origin">{{ origin }}</p>
            <p class="status">{{ status }}</p>
        </div>
    </li>
</template>
