<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md my-3">
    <ul>
      <li
        v-for="(logRecordFile, index) in logRecordsFiles"
        v-bind:key="logRecordFile.id"
        :class="index !== 0 ? 'border-t border-gray-200' : ''"
      >
        <router-link
          :to="{ name: 'LogRecord', params: { logId: logRecordFile.id } }"
          class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div
                class="text-sm leading-5 font-medium text-indigo-600 truncate"
              >
                {{ logRecordFile.name }}
              </div>
              <div class="ml-2 flex-shrink-0 flex">
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
                  {{
                    $filters.calculateBytesToMbString(logRecordFile.fileSize)
                  }}
                </span>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <div
                  class="mr-6 flex items-center text-sm leading-5 text-gray-500"
                >
                  <!-- Heroicon name: users -->
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
                  {{
                    $filters.convertMillisecondsTimestampToDateString(
                      logRecordFile.lastUpdatedAtTimestamp
                    )
                  }}
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
                ></div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LogRecordFile } from "@/definitions/LogRecordFile";

export default defineComponent({
  name: "LogsListTable",
  props: {
    logRecordsFiles: {
      type: Array as PropType<LogRecordFile[]>,
      default: []
    }
  },
  methods: {},
  components: {}
});
</script>
