import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GlobalFilters from "@/global/GlobalFilters";

import "./assets/index.scss";

const application = createApp(App);

application.use(store);
application.use(router);
application.mount("#app");

application.config.globalProperties.$filters = GlobalFilters;
