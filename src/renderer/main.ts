import 'normalize.css';
import '@/assets/styles/theme/default/style.scss';
import '@/assets/styles/theme/dark/style.scss';
import '@/assets/styles/element.scss';
import '@/assets/styles/base.scss';
import 'element-plus/theme-chalk/el-overlay.css';
import 'element-plus/theme-chalk/el-message-box.css';
import App from '@/App.vue';
import { createApp } from 'vue';
import { usePinia } from './hooks/pinia';
import { useRouter } from './hooks/vueRouter';

const app = createApp(App);

app.use(usePinia());
app.use(useRouter());

app.mount('#app');
