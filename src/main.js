import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/global.scss";
import { createPinia } from "pinia";
import vuetify from "./vuetify";

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(vuetify).use(pinia).mount("#app");
