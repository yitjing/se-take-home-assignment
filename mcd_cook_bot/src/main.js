import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SelectMember from './components/SelectMember.vue'
import OrderForm from './components/OrderForm.vue'
import BotController from './components/BotController.vue'

// create routes that maps URL paths to components
const routes = [
    {path: '/', component: SelectMember},
    {path: '/orderForm', component: OrderForm},
    {path: '/botController', component: BotController},
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')

