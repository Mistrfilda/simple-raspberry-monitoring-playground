import { createStore } from "vuex";
import { ApiEndpoint } from "@/definitions/ApiEndpoint";
import createPersistedState from "vuex-persistedstate";
import { getAxiosInstance } from "@/api/AxiosService";

export default createStore({
  state: {
    availableEndpoints: [
      {
        id: 1,
        name: "Localhost",
        ipAddress: "128.0.0.1",
        baseUrl: "http://localhost:303000/app1/",
        online: false
      },
      {
        id: 2,
        name: "Raspbberry 1",
        ipAddress: "192.168.1.192",
        baseUrl: "http://192.168.1.192:30300/app1/",
        online: false
      },
    ] as ApiEndpoint[],
    currentEndpoint: null as ApiEndpoint | null
  },
  mutations: {
    setCurrentEndpoint(state, endpointId: number) {
      for (const endpoint of state.availableEndpoints) {
        if (endpoint.id === endpointId) {
          state.currentEndpoint = endpoint;
        }
      }
    }
  },
  getters: {
    getAxiosInstance: state => {
      if (state.currentEndpoint === null) {
        throw new Error("Current endpoint must be set");
      }
      return getAxiosInstance(state.currentEndpoint);
    }
  },
  actions: {},
  modules: {},
  // plugins: [createPersistedState()]
});
