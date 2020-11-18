import { createStore } from "vuex";

export default createStore({
  state: {
    availableEndpoints: [
      {
        name: "Localhost",
        url: "http://localhost:30300/app1"
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
