import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router/index.ts";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(router).use(createPinia()).use(ElementPlus).mount("#app");
