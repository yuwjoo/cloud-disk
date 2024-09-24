import 'normalize.css';
import '@/assets/styles/theme/default/style.scss';
import '@/assets/styles/theme/dark/style.scss';
import '@/assets/styles/element.scss';
import '@/assets/styles/base.scss';
import App from '@/App.vue';
import { createApp } from 'vue';
import { usePinia } from './library/pinia';
import { useRouter } from './library/vue-router';

const app = createApp(App);

app.use(usePinia());
app.use(useRouter());

app.mount('#app');
