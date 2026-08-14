import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '../store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserDoctor, faFaceSmile, faHeartPulse, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './styles/globals.css';
import './config/axiosConfig';

library.add(faUserDoctor, faFaceSmile, faHeartPulse, faHandshake);
 // Importar configuración de Axios con interceptor
 // Asegúrate de que esta URL coincida con tu backend
// Manejo de errores globales
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

const app = createApp(App);

// Manejo de errores de Vue
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err, info);
};

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
   .use(store)
   .mount('#app');


