import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './views/Login.vue'
import Header from './components/Header.vue'
import Products from './views/Products.vue'
import InfoProducts from './views/InfoProducts.vue'
import Register from './views/Register.vue'

import PrimeVue from 'primevue/config';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: '', component:Products},
        {path: '/login', name: 'Login', component:Login},
        {path: '/header', name: 'Header', component:Header},
        {path: '/products', name: 'Products', component:Products},
        {path: '/infoproducts', name: 'InfoProducts', component:InfoProducts},
        {path: '/register', name: 'Register', component:Register}
    ]
})
createApp(App)
.use(router)
.use(PrimeVue)

.component('SelectButton',SelectButton)
.component('Button',Button)
.component('Card',Card)
.component('InputText',InputText)
.component('FloatLabel',FloatLabel)
.mount('#app')
