import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

import '@unocss/reset/tailwind.css';
import '@/assets/styles/common.scss';
import 'uno.css';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
