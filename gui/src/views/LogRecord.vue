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
import LogRecordTable from "@/components/LogRecordTable.vue";

export default defineComponent({
  name: "LogRecord",
  data() {
    return {
      logId: this.$route.params.logId
    };
  },
  components: {
    LogRecordTable
  }
});
</script>
