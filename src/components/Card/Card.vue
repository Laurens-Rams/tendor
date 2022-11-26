<script setup>
import { ref, onMounted } from 'vue'
defineProps(['id','name','image','species','origin','status'])

function getBackgroundColor(status) {
if (status == 'Dead'){
    return 'background_color_red'
}else if(status == 'Alive') {
    return 'background_color_green'
} else {
    return 'background_color_grey'
}
}

</script>
<template>
    <li>
        <div class="RickMorty_card">
            <div class="top_bar" :class="getBackgroundColor(status)">{{ status }}</div>
            <div class="picture"><img :src="image" alt="test"/></div>
            <p class="name">{{ name }}</p>
            <p class="species">{{ species }}</p>
            <router-link :to="{name: 'DetailView', params: { id: id }}"><button>Details</button></router-link>
        </div>
    </li>
</template>
