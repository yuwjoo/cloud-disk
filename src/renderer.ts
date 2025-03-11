import App from "@/App.vue";
import { createApp } from "vue";
import { useRouter } from "./router";
import { createPinia } from "pinia";
import "normalize.css";
import "element-plus/theme-chalk/el-overlay.css";
import "element-plus/theme-chalk/el-message-box.css";
import "@/assets/styles/theme/default.scss";
import "@/assets/styles/theme/dark.scss";
import "@/assets/styles/base.scss";

const app = createApp(App);

app.use(createPinia());
app.use(useRouter());

app.mount("#app");
