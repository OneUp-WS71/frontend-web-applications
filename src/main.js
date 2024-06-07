import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './views/login.vue'
import Products from './views/products.vue'
import InfoProducts from './views/info-products.vue'
import Register from './views/register.vue'
import Payment_methods from './views/payment-methods.vue'
import Payment_confirm from './views/payment-confirm.vue'
import User_profile from './views/user-profile.vue'
import Page_not_found from './views/page-not-found.vue'



import PrimeVue from 'primevue/config';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dropdown from 'primevue/dropdown';

import axios from 'axios';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: '', component:Products},
        {path: '/login', name: 'Login', component:Login},
        {path: '/products', name: 'Products', component:Products},
        {path: '/infoproducts', name: 'InfoProducts', component:InfoProducts},
        {path: '/register', name: 'Register', component:Register},
        {path: '/payment-methods', name: 'Payment-methods', component:Payment_methods},
        {path: '/payment-confirm', name: 'Payment-confirm', component:Payment_confirm},
        {path: '/user-profile', name: 'User-profile', component:User_profile},
        {path: '/:pathMatch(.*)*', name: 'NotFound', component: Page_not_found}
        
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
.component('Dropdown',Dropdown)
.mount('#app')
