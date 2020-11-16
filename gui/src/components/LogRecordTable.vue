<template>
  <div class="flex flex-col my-3" v-if="dataLoaded === true">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Message
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Level
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Channel
                </th>
                <th class="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              <!-- Odd row -->
              <tr
                v-for="(logRecord, index) in logRecords"
                v-bind:key="logRecord"
                :class="index % 2 === 0 ? 'bg-white-50' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                >
                  {{ logRecord.message }}
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{
                    $filters.convertIsoDateStringToFormat(logRecord.datetime)
                  }}
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getLogLevelBadgeColor(logRecord.level)"
                  >
                    {{ logRecord.level_name }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ logRecord.channel }}
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Previous
              </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Next
              </a>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm leading-5 text-gray-700">
                  Showing
                  <span class="font-medium">1</span>
                  to
                  <span class="font-medium">10</span>
                  of
                  <span class="font-medium">97</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                  <a
                    href="#"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Previous"
                  >
                    <!-- Heroicon name: chevron-left -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    3
                  </a>
                  <span
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
                  >
                    ...
                  </span>
                  <a
                    href="#"
                    class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Next"
                  >
                    <!-- Heroicon name: chevron-right -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LogRecord } from "@/definitions/LogRecord";
import Axios from "axios";
import { logLevelNumber } from "@/definitions/LogLevel";

export default defineComponent({
  name: "LogRecordTable",
  props: {
    logId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      logRecords: {
        type: Array as PropType<LogRecord[]>
      },
      dataLoaded: false
    };
  },
  mounted() {
    this.fetchLogsRecords(this.logId);
  },
  methods: {
    async fetchLogsRecords(logId: number): Promise<void> {
      const result = await Axios.get(
        "http://localhost:30300/app1/logs/" + logId
      );

      this.logRecords = result.data;
      this.dataLoaded = true;
    },
    getLogLevelBadgeColor(channelNumber: number): string {
      console.log(channelNumber);
      switch (channelNumber) {
        case logLevelNumber.debug:
          return "text-gray-800 bg-gray-300";
        case logLevelNumber.info:
          return "text-green-800 bg-green-100";
        case logLevelNumber.notice:
          return "text-yellow-800 bg-yellow-100";
        case logLevelNumber.warning:
          return "text-orange-800 bg-orange-100";
        case logLevelNumber.error:
          return "text-red-800 bg-red-100";
        case logLevelNumber.critical:
          return "text-red-800 bg-red-100";
        case logLevelNumber.alert:
          return "text-red-800 bg-red-100";
        case logLevelNumber.emergency:
          return "text-red-800 bg-red-100";
        default:
          throw new Error("Invalid log level");
      }
    }
  },
  components: {}
});
</script>
