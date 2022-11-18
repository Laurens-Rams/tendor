import { createRouter, createWebHistory } from 'vue-router' 
import Homepage from '../views/Homepage.vue'
import About from '../views/About.vue'
import CardsPage from '../views/CardsPage.vue'
import DetailedComponent from '../views/DetailedPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homepage
    },
    {
        path: '/Cards',
        name: 'Cards',
        component: CardsPage, 
    },
    {
        path: '/About',
        name: 'About',
        component: About
    }, 
    {
        path: '/Detailes/:id',
        name: 'DetailView',
        component: DetailedComponent,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router