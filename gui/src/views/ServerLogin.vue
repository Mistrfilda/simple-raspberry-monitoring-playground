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
                    {{ endpoint.baseUrl }}
                  </span>
                </p>
                <p
                  id="plan-option-limit-0"
                  class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                  :class="
                    currentApiEndpoint !== null &&
                    currentApiEndpoint.id === endpoint.id
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  "
                >
                  {{ endpoint.ipAddress }}
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

export default defineComponent({
  name: "ServerLogin",
  data() {
    return {
      currentlySelectedServerId: null as number | null
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
  watch: {
    currentlySelectedServerId: function() {
      this.$store.commit("setCurrentEndpoint", this.currentlySelectedServerId);
    }
  },
  components: {}
});
</script>
