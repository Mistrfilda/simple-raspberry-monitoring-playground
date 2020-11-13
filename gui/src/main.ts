import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GlobalFilters from "@/global/GlobalFilters";

import "./assets/index.scss";

import "./assets/js/bootstrap-js";

const application = createApp(App);

application.use(store);
application.use(router);
application.mount("#app");

application.config.globalProperties.$filters = GlobalFilters;
