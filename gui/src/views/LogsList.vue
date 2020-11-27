<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            Logs list
          </h2>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <div
              class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6"
            >
              <!-- Heroicon name: briefcase -->
              <svg
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              List of all available logs
            </div>
          </div>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
          <!--          <span class="sm:ml-3 shadow-sm rounded-md">-->
          <!--            <button-->
          <!--              type="button"-->
          <!--              class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"-->
          <!--            >-->
          <!--              &lt;!&ndash; Heroicon name: check &ndash;&gt;-->
          <!--              <svg-->
          <!--                class="-ml-1 mr-2 h-5 w-5"-->
          <!--                xmlns="http://www.w3.org/2000/svg"-->
          <!--                viewBox="0 0 20 20"-->
          <!--                fill="currentColor"-->
          <!--              >-->
          <!--                <path-->
          <!--                  fill-rule="evenodd"-->
          <!--                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"-->
          <!--                  clip-rule="evenodd"-->
          <!--                />-->
          <!--              </svg>-->
          <!--              Publish-->
          <!--            </button>-->
          <!--          </span>-->
        </div>
      </div>
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      v-if="dataLoaded === true"
    >
      <LogsListTable :log-records-files="logRecordsFiles"></LogsListTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import LogsListTable from "@/components/LogList/LogsListTable.vue";
import { LogRecordFile } from "@/definitions/LogRecordFile";

export default defineComponent({
  name: "LogsList",
  data() {
    return {
      logRecordsFiles: {
        type: Array as PropType<LogRecordFile[]>
      },
      dataLoaded: false
    };
  },
  mounted() {
    this.fetchLogslist();
  },
  methods: {
    async fetchLogslist(): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.get("logs");
      this.logRecordsFiles = result.data;
      this.dataLoaded = true;
    }
  },
  components: {
    LogsListTable
  }
});
</script>
