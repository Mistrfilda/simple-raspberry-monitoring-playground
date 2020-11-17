<template>
  <div class="flex flex-col my-3" v-if="dataLoaded === true">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="bg-gray-50 w-ful mb-3 shadow rounded-lg text-gray-900">
          <div
            class="-ml-4 -mt-2 flex items-center md:justify-between justify-start flex-wrap sm:flex-no-wrap px-3 py-2"
          >
            <div class="ml-4 mt-2">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Level filters
              </h3>
            </div>
            <div class="ml-4 mt-2 flex-shrink-0">
              <span class="inline-flex rounded-md shadow-sm">
                <button
                  @click="resetSelectedLevels()"
                  type="button"
                  class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 active:bg-blue-700"
                >
                  Reset filters
                </button>
              </span>
            </div>
          </div>
          <div class="flex items-center md:justify-between justify-start">
            <span
              class="inline-flex px-3 py-2"
              v-for="logLevel in availableFilterLevels"
              v-bind:key="logLevel"
            >
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150"
                :class="[
                  selectedLevels.includes(logLevel.name)
                    ? logLevel.activeClasses
                    : logLevel.nonActiveClasses
                ]"
                @click="changeSelectedLevels(logLevel.name)"
              >
                {{ logLevel.label }}
              </button>
            </span>
          </div>
        </div>
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200 table-auto">
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
                v-for="(logRecord, index) in logRecords.logRecordFiles"
                v-bind:key="logRecord"
                :class="index % 2 === 0 ? 'bg-white-50' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 truncate"
                >
                  {{ this.$filters.truncateText(logRecord.message, 70) }}
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
          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <!--            <div class="flex-1 flex justify-between sm:hidden">-->
            <!--              <a-->
            <!--                  href="#"-->
            <!--                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"-->
            <!--              >-->
            <!--                Previous-->
            <!--              </a>-->
            <!--              <a-->
            <!--                  href="#"-->
            <!--                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"-->
            <!--              >-->
            <!--                Next-->
            <!--              </a>-->
            <!--            </div>-->
            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm leading-5 text-gray-700">
                  Showing
                  <span class="font-medium"> {{ offset + 1 }} </span>
                  to
                  <span class="font-medium"> {{ offset + limit }} </span>
                  of
                  <span class="font-medium">{{ logRecords.linesCount }}</span>
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
                    v-for="paginationItem in getPaginator()"
                    v-bind:key="paginationItem.id"
                    @click="changePagination(paginationItem.offset)"
                    href="#"
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    :class="[
                      paginationItem.active === true
                        ? 'font-bold bg-gray-200'
                        : ''
                    ]"
                  >
                    {{ paginationItem.label }}
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
import { defineComponent } from "vue";
import Axios, { AxiosRequestConfig } from "axios";
import { LogLevel, LogLevelNumber } from "@/definitions/LogLevel";
import { LogRecordResponse } from "@/definitions/LogRecordResponse";
import { PaginatorItem } from "@/definitions/PaginatorItem";

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
      logRecords: {} as LogRecordResponse,
      availableFilterLevels: [
        {
          name: LogLevel[LogLevel.debug].toLowerCase(),
          label: LogLevel[LogLevel.debug].toUpperCase(),
          activeClasses:
            "bg-gray-600 hover:bg-gray-500 focus:border-gray-700 active:bg-gray-700",
          nonActiveClasses:
            "bg-white-600 border-full border-gray-500 text-gray-500 hover:bg-gray-500 focus:border-gray-700 active:bg-gray-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.info].toLowerCase(),
          label: LogLevel[LogLevel.info].toUpperCase(),
          activeClasses:
            "bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700",
          nonActiveClasses:
            "bg-white-600 border-full border-green-500 text-green-500 hover:bg-green-500 focus:border-green-700 active:bg-green-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.notice].toLowerCase(),
          label: LogLevel[LogLevel.notice].toUpperCase(),
          activeClasses:
            "bg-yellow-600 hover:bg-yellow-500 focus:border-yellow-700 active:bg-yellow-700",
          nonActiveClasses:
            "bg-white-600 border-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 focus:border-yellow-700 active:bg-yellow-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.warning].toLowerCase(),
          label: LogLevel[LogLevel.warning].toUpperCase(),
          activeClasses:
            "bg-orange-600 hover:bg-orange-500 focus:border-orange-700 active:bg-orange-700",
          nonActiveClasses:
            "bg-white-600 border-full border-orange-500 text-orange-500 hover:bg-orange-500 focus:border-orange-700 active:bg-orange-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.error].toLowerCase(),
          label: LogLevel[LogLevel.error].toUpperCase(),
          activeClasses:
            "bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700",
          nonActiveClasses:
            "bg-white-600 border-full border-red-500 text-red-500 hover:bg-red-500 focus:border-red-700 active:bg-red-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.critical].toLowerCase(),
          label: LogLevel[LogLevel.critical].toUpperCase(),
          activeClasses:
            "bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700",
          nonActiveClasses:
            "bg-white-600 border-full border-red-500 text-red-500 hover:bg-red-500 focus:border-red-700 active:bg-red-700 hover:text-white"
        },
        {
          name: LogLevel[LogLevel.alert].toLowerCase(),
          label: LogLevel[LogLevel.alert].toUpperCase(),
          activeClasses:
            "bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700",
          nonActiveClasses:
            "bg-white-600 border-full border-red-500 text-red-500 hover:bg-red-500 focus:border-red-700 active:bg-red-700 hover:text-white"
        },
        {
          name: LogLevel.emergency,
          label: LogLevel[LogLevel.emergency].toUpperCase(),
          activeClasses:
            "bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700",
          nonActiveClasses:
            "bg-white-600 border-full border-red-500 text-red-500 hover:bg-red-500 focus:border-red-700 active:bg-red-700 hover:text-white"
        }
      ],
      selectedLevels: ["all"],
      dataLoaded: false,
      limit: 10,
      offset: 0,
      paginator: [] as PaginatorItem[]
    };
  },
  mounted() {
    this.fetchLogsRecords(this.logId);
  },
  methods: {
    async fetchLogsRecords(logId: number): Promise<void> {
      let levels: string[] = [];
      let url: string = "http://localhost:30300/app1/logs/" + logId;

      if (this.selectedLevels.includes("all") === false) {
        levels = this.selectedLevels;
        url = "http://localhost:30300/app1/logs/" + logId + "/levels";
      }

      const config: AxiosRequestConfig = {
        params: {
          loglevels: levels,
          offset: this.offset,
          limit: this.limit
        }
      };

      const result = await Axios.get(url, config);

      this.logRecords = result.data;
      this.dataLoaded = true;
    },
    getLogLevelBadgeColor(channelNumber: number): string {
      switch (channelNumber) {
        case LogLevelNumber.debug:
          return "text-gray-800 bg-gray-300";
        case LogLevelNumber.info:
          return "text-green-800 bg-green-100";
        case LogLevelNumber.notice:
          return "text-yellow-800 bg-yellow-100";
        case LogLevelNumber.warning:
          return "text-orange-800 bg-orange-100";
        case LogLevelNumber.error:
          return "text-red-800 bg-red-100";
        case LogLevelNumber.critical:
          return "text-red-800 bg-red-100";
        case LogLevelNumber.alert:
          return "text-red-800 bg-red-100";
        case LogLevelNumber.emergency:
          return "text-red-800 bg-red-100";
        default:
          throw new Error("Invalid log level");
      }
    },
    changeSelectedLevels(name: string): void {
      if (this.selectedLevels.includes(name)) {
        this.selectedLevels.splice(this.selectedLevels.indexOf(name), 1);
      } else {
        this.selectedLevels.push(name);
      }

      if (
        this.selectedLevels.length > 1 &&
        this.selectedLevels.includes("all")
      ) {
        this.selectedLevels.splice(this.selectedLevels.indexOf("all"), 1);
      }

      if (this.selectedLevels.length === 0) {
        this.selectedLevels.push("all");
      }

      this.fetchLogsRecords(this.logId);
    },
    resetSelectedLevels(): void {
      this.selectedLevels = ["all"];
      this.fetchLogsRecords(this.logId);
    },
    changePagination(offset: number): void {
      this.offset = offset;
      this.fetchLogsRecords(this.logId);
    },
    getPaginator(): PaginatorItem[] {
      const items: PaginatorItem[] = [];

      const lastItemNumber = Math.ceil(this.logRecords.linesCount / this.limit);
      const currentActive = this.offset / this.limit + 1;

      //FIRST ELEMENT
      items.push({
        id: 1,
        label: "1",
        offset: 0,
        disabled: false,
        isFirst: true,
        isLast: this.logRecords.linesCount < this.limit,
        active: this.offset === 0
      });

      //RETURN IF LESS THEN LIMIT OF LINES
      if (this.logRecords.linesCount < this.limit) {
        return items;
      }

      //CALCULATE IF ITEMS ARE LESS THAN 7 * THIS.LIMIT AND RETURN
      if (lastItemNumber < 9) {
        for (let i = 2; i <= 9; i++) {
          if (lastItemNumber < i) {
            return items;
          }

          items.push({
            id: i,
            label: String(i),
            offset: this.limit * (i - 1),
            disabled: false,
            isFirst: false,
            isLast: this.logRecords.linesCount <= this.limit * i,
            active: this.offset === this.limit * (i - 1)
          });
        }

        return items;
      }

      if (currentActive !== 1 && currentActive !== lastItemNumber) {
        //PUSH CURRENT ACTIVE
        items.push({
          id: currentActive,
          label: String(currentActive),
          offset: this.limit * (currentActive - 1),
          disabled: false,
          isFirst: false,
          isLast: this.logRecords.linesCount <= this.limit * currentActive,
          active: this.offset === this.limit * (currentActive - 1)
        });
      }

      let rightValue = 0;
      let leftValue = 0;
      //PUSH NEIGHBORHOODS
      for (
        let currentActiveHelper = 0;
        currentActiveHelper < 2;
        currentActiveHelper++
      ) {
        //TO THE RIGHT
        rightValue = currentActive + (currentActiveHelper + 1);

        if (rightValue < lastItemNumber) {
          items.push({
            id: rightValue,
            label: String(rightValue),
            offset: this.limit * (rightValue - 1),
            disabled: false,
            isFirst: false,
            isLast: this.logRecords.linesCount <= this.limit * rightValue,
            active: this.offset === this.limit * (rightValue - 1)
          });
        }

        //TO THE LEFT
        leftValue = currentActive + (currentActiveHelper + 1) * -1;
        if (leftValue > 1) {
          items.push({
            id: leftValue,
            label: String(leftValue),
            offset: this.limit * (leftValue - 1),
            disabled: false,
            isFirst: false,
            isLast: this.logRecords.linesCount <= this.limit * leftValue,
            active: this.offset === this.limit * (leftValue - 1)
          });
        }
      }

      //LAST ELEMENT
      items.push({
        id: lastItemNumber,
        label: String(lastItemNumber),
        offset: this.limit * (lastItemNumber - 1),
        disabled: false,
        isFirst: false,
        isLast: this.logRecords.linesCount <= this.limit * lastItemNumber,
        active: this.offset === this.limit * (lastItemNumber - 1)
      });

      //PUSH MIDDLE ELEMENT ON FIRST AND LAST PAGE
      if (items.length < 7) {
        const middleElement = Math.ceil(lastItemNumber / 2);

        items.push({
          id: middleElement,
          label: String(middleElement),
          offset: this.limit * (middleElement - 1),
          disabled: false,
          isFirst: false,
          isLast: this.logRecords.linesCount <= this.limit * middleElement,
          active: false
        });

        //AROUND MIDDLE ELEMENT
        items.push({
          id: middleElement + 1,
          label: "...",
          offset: this.limit * (middleElement - 1 + 1),
          disabled: false,
          isFirst: false,
          isLast:
            this.logRecords.linesCount <= this.limit * (middleElement + 1),
          active: false
        });

        //AROUND MIDDLE ELEMENT
        items.push({
          id: middleElement - 1,
          label: "...",
          offset: this.limit * (middleElement - 1 - 1),
          disabled: false,
          isFirst: false,
          isLast:
            this.logRecords.linesCount <= this.limit * (middleElement - 1),
          active: false
        });
      } else {
        if (leftValue - 1 > 1) {
          items.push({
            id: leftValue - 1,
            label: "...",
            offset: 0,
            disabled: true,
            isFirst: false,
            isLast: false,
            active: false
          });
        }

        if (rightValue + 1 < lastItemNumber) {
          items.push({
            id: rightValue + 1,
            label: "...",
            offset: 0,
            disabled: true,
            isFirst: false,
            isLast: false,
            active: false
          });
        }
      }

      items.sort(function(a: PaginatorItem, b: PaginatorItem) {
        if (a.id < b.id) {
          return -1;
        }

        return 1;
      });

      return items;
    }
  },
  components: {}
});
</script>
