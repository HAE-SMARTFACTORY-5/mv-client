import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
