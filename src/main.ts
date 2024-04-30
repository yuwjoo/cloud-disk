import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

import 'normalize.css';
import '@/assets/css/base.css';
import '@/assets/css/dark.scss';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
