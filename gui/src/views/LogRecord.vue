<template>
  <div class="pt-2 pb-6 md:py-6" v-if="dataLoaded === true">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            {{ logFile.name }}
          </h2>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <div
              class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6"
            >
              <svg
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              Last updated at
              {{
                $filters.convertMillisecondsTimestampToDateString(
                  logFile.lastUpdatedAtTimestamp
                )
              }}
            </div>
            <div
              class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6"
            >
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
              >
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  ></path>
                </svg>
                {{ $filters.calculateBytesToMbString(logFile.fileSize) }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
          <!-- BUTTONS PLACE -->
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <LogRecordTable :log-id="logId"></LogRecordTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogRecordTable from "@/components/LogRecord/LogRecordTable.vue";
import { LogRecordFile } from "@/definitions/LogRecordFile";

export default defineComponent({
  name: "LogRecord",
  data() {
    return {
      logId: this.$route.params.logId,
      logFile: {} as LogRecordFile,
      dataLoaded: false
    };
  },
  mounted() {
    this.fetchFileInfo();
  },
  methods: {
    async fetchFileInfo(): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.get(
        "logs/" + this.logId + "/info"
      );
      this.logFile = result.data;
      this.dataLoaded = true;
    }
  },
  components: {
    LogRecordTable
  }
});
</script>
