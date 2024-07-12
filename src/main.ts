import 'normalize.css';
import '@/assets/styles/theme/default/style.scss';
import '@/assets/styles/theme/dark/style.scss';
import '@/assets/styles/element.scss';
import '@/assets/styles/base.scss';

import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
