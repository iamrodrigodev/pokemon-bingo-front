import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, storeKey } from './store';
import './assets/styles/main.scss';

const app = createApp(App);

app.use(router);

app.provide(storeKey, store);

app.mount('#app');
