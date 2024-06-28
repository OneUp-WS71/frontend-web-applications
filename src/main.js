// Importación de estilos CSS
import './assets/main.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; 

// Importación de librerías y componentes
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
import PrimeVue from 'primevue/config';
import axios from 'axios';

// Componentes de PrimeVue
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import Row from 'primevue/row';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';



// Componentes de Vuetify
import { VCard, VIcon, VBtn, VSheet, VSparkline } from 'vuetify/lib/components/index.mjs';

// Componentes de Chart.js y vue-chartjs
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Line, Bar } from 'vue-chartjs';

// Componentes de la aplicación
import App from './App.vue';
import Login from './views/login.vue';
import Products from './views/products.vue';
import InfoProducts from './views/info-products.vue';
import Register from './views/register.vue';
import Payment_methods from './views/payment-methods.vue';
import Payment_confirm from './views/payment-confirm.vue';
import User_profile from './views/user-profile.vue';
import Patients from './views/patients.vue';
import Patient_info from './views/patient-info.vue';
import Location from './views/location.vue';
import Dashboard from './views/dashboard.vue';
import Page_not_found from './views/page-not-found.vue';


//confi  del idioma
import i18n from './config/i18n';

import mapboxGl from 'mapbox-gl';
//import MapboxDirections from '@mapbox/mapbox-gl-directions/src/directions';

// Configuración de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

// Configuración de Vuetify
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    // Configuración adicional del tema si es necesario
  }
});

// Configuración de Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: '', component: Login },
    { path: '/login', name: 'Login', component: Login },
    { path: '/products', name: 'Products', component: Products },
    { path: '/infoproducts', name: 'InfoProducts', component: InfoProducts },
    { path: '/register', name: 'Register', component: Register },
    { path: '/payment-methods', name: 'Payment-methods', component: Payment_methods },
    { path: '/payment-confirm', name: 'Payment-confirm', component: Payment_confirm },
    { path: '/user-profile', name: 'User-profile', component: User_profile },
    { path: '/patients', name: 'Patients', component: Patients },
    { path: '/patient-info', name: 'Patient-info', component: Patient_info },
    { path: '/location', name: 'Location', component: Location },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page_not_found }
  ]
});

// Creación de la aplicación Vue
createApp(App)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(PrimeVue)

  // Registro de componentes globales
  //.component('MapboxDirections',MapboxDirections)
  .component('Toast',Toast)
  .component('mapboxgl',mapboxGl)
  .component('BarChart', Bar)
  .component('v-chart', Line)
  .component('v-card', VCard)
  .component('v-icon', VIcon)
  .component('v-btn', VBtn)
  .component('v-sheet', VSheet)
  .component('v-sparkline', VSparkline)
  .component('Row', Row)
  .component('Calendar', Calendar)
  .component('Column', Column)
  .component('DataTable', DataTable)
  .component('Message', Message)
  .component('SelectButton', SelectButton)
  .component('Button', Button)
  .component('Card', Card)
  .component('InputText', InputText)
  .component('FloatLabel', FloatLabel)
  .component('Dropdown', Dropdown)
  // Montaje de la aplicación en el elemento con id 'app'
  .mount('#app');
