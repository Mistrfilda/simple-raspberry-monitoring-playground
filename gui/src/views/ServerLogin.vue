<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-start py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Select server
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        v-if="serverSelectError"
        class="bg-red-100 border-l-4 border-red-400 p-4 mb-5"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              Selected server is offline
            </p>
          </div>
        </div>
      </div>

      <div>
        <fieldset>
          <legend class="sr-only">
            Pricing plans
          </legend>
          <ul class="relative bg-white rounded-md -space-y-px">
            <li v-for="endpoint in availableEndpoints" v-bind:key="endpoint.id">
              <div
                class="relative border rounded-tl-md rounded-tr-md p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                :class="
                  currentApiEndpoint !== null &&
                  currentApiEndpoint.id === endpoint.id
                    ? 'bg-blue-50 border-blue-200 z-10'
                    : 'border-gray-200'
                "
              >
                <label class="flex items-center text-sm cursor-pointer">
                  <input
                    name="endpoint_select"
                    type="radio"
                    class="focus:ring-blue-500 h-4 w-4 text-blue-600 cursor-pointer border-gray-300"
                    aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                    :value="endpoint.id"
                    v-model="currentlySelectedServerId"
                  />
                  <span class="ml-3 font-medium text-gray-900">{{
                    endpoint.name
                  }}</span>
                </label>
                <p
                  id="plan-option-pricing-0"
                  class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                >
                  <span
                    class="font-medium"
                    :class="
                      currentApiEndpoint !== null &&
                      currentApiEndpoint.id === endpoint.id
                        ? 'text-blue-900'
                        : 'text-gray-900'
                    "
                  >
                    {{ endpoint.ipAddress }}
                  </span>
                </p>
                <p
                  v-if="apiEndpointStatusesLoaded === true"
                  id="plan-option-limit-0"
                  class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                  :class="
                    currentApiEndpoint !== null &&
                    currentApiEndpoint.id === endpoint.id
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  "
                >
                  <span
                    v-if="getEndpointStatus(endpoint.id)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                  >
                    <svg
                      class="-ml-0.5 mr-1.5 h-2 w-2 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Online
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                  >
                    <svg
                      class="-ml-0.5 mr-1.5 h-2 w-2 text-red-800"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Offline
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-2xl flex justify-center mt-8">
      <router-link
        type="submit"
        class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        to="/"
      >
        Go to dashboard
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { State } from "@/definitions/State";
import { ApiEndpoint } from "@/definitions/ApiEndpoint";
import { getAxiosInstance } from "@/api/AxiosService";
import { ApiEndpointStatus } from "@/definitions/ApiEndpointStatus";

// noinspection PointlessBooleanExpressionJS
export default defineComponent({
  name: "ServerLogin",
  data() {
    return {
      currentlySelectedServerId: null as number | null,
      dataLoaded: false,
      apiEndpointStatuses: [] as ApiEndpointStatus[],
      apiEndpointStatusesLoaded: false,
      serverSelectError: false
    };
  },
  computed: mapState({
    currentApiEndpoint(state: State): ApiEndpoint | null {
      const endpoint = state.currentEndpoint;
      if (endpoint !== null) {
        this.currentlySelectedServerId = endpoint.id;
      }

      return endpoint;
    },
    availableEndpoints(state: State): ApiEndpoint[] {
      return state.availableEndpoints;
    }
  }),
  mounted() {
    this.fetchEndpointStatuses();
    setInterval(() => this.fetchEndpointStatuses(), 5000);
  },
  methods: {
    async fetchEndpointStatuses(): Promise<void> {
      const results = [];
      for (let i = 0; i < this.availableEndpoints.length; i++) {
        const result = await this.getInstanceStatus(this.availableEndpoints[i]);
        results.push({
          id: this.availableEndpoints[i].id,
          online: result
        });
      }

      this.apiEndpointStatuses = results;
      this.apiEndpointStatusesLoaded = true;
    },
    async getInstanceStatus(apiEndpoint: ApiEndpoint): Promise<boolean> {
      try {
        await getAxiosInstance(apiEndpoint).get("status");
        return true;
      } catch (error) {
        return false;
      }
    },
    getEndpointStatus(id: number): boolean {
      console.log(id);
      console.log(this.apiEndpointStatuses);
      const result:
        | ApiEndpointStatus[]
        | undefined = this.apiEndpointStatuses.filter(function(
        status: ApiEndpointStatus
      ): status is ApiEndpointStatus {
        return status.id === id;
      });

      if (result === undefined || result.length !== 1) {
        throw new Error("Endpoint status not found!");
      }

      return result[0].online;
    }
  },
  watch: {
    currentlySelectedServerId: function() {
      if (this.currentlySelectedServerId === null) {
        return;
      }

      if (
        this.apiEndpointStatusesLoaded !== false &&
        this.getEndpointStatus(this.currentlySelectedServerId) === false
      ) {
        this.serverSelectError = true;
        return;
      }

      this.$store.commit("setCurrentEndpoint", this.currentlySelectedServerId);
    }
  },
  components: {}
});
</script>
