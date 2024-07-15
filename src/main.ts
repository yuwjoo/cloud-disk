import 'normalize.css';
import '@/assets/styles/theme/default/style.scss';
import '@/assets/styles/theme/dark/style.scss';
import '@/assets/styles/element.scss';
import '@/assets/styles/base.scss';

import { createApp } from 'vue';
import App from '@/App.vue';

import pinia from '@/utils/pinia';
import router from '@/utils//router';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
