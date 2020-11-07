import { createStore } from "vuex";

export default createStore({
  state: {
    availableEndpoints: [
      {
        name: "App 1",
        url: "http://localhost:30300/app1"
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});