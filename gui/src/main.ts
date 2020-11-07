import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import './assets/index.scss';

createApp(App)
    .use(store)
    .use(router)
    .use(BootstrapVue)
    .use(BootstrapVueIcons)
    .mount("#app");