import '@/assets/styles/base.scss';
import 'uno.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/assets/styles/variable.scss';

import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
