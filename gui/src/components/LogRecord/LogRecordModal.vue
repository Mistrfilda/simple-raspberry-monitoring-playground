<template>
  <transition enter-active-class="delay-300" leave-active-class="delay-300">
    <div class="fixed z-10 inset-0 overflow-y-auto" v-show="logRecord !== null">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="fixed inset-0 transition-opacity"
            @click="hideModal"
            v-show="logRecord !== null"
          >
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="logRecord !== null"
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-3xl sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div v-if="logRecord !== null">
              <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Detail of log record
                </h3>
                <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500"></p>
              </div>
              <div class="px-4 py-5 sm:p-0">
                <dl>
                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Message
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{ logRecord.message }}
                    </dd>
                  </div>
                  <div
                    class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
                  >
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Date
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{
                        $filters.convertIsoDateStringToFormat(
                          logRecord.datetime
                        )
                      }}
                    </dd>
                  </div>
                  <div
                    class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
                  >
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Level
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getLogLevelBadgeColor(logRecord.level)"
                      >
                        {{ logRecord.level_name }}
                      </span>
                    </dd>
                  </div>
                  <div
                    class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
                  >
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Channel
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{ logRecord.channel }}
                    </dd>
                  </div>
                  <div
                    class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
                  >
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Context
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 overflow-x-auto"
                    >
                      <pre>
                        <div v-html="jsonSyntaxHighlight(JSON.stringify(logRecord.context, null, 2))"></div>
                      </pre>
                    </dd>
                  </div>
                  <div
                    class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
                  >
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                      Extra
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 overflow-x-auto"
                    >
                      <pre>
                        <div v-html="jsonSyntaxHighlight(JSON.stringify(logRecord.extra, null, 2))"></div>
                      </pre>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LogRecord } from "@/definitions/LogRecord";
import { getLogLevelBadgeColor as badgeLevelColor } from "@/helpers/LogRecord/LogLevelHelper";

export default defineComponent({
  name: "LogRecordModal",
  props: {
    logRecord: {
      type: Object as PropType<LogRecord> | null
    }
  },
  methods: {
    hideModal(): void {
      this.$emit("hide-modal");
    },
    getLogLevelBadgeColor(levelNumber: number): string {
      return badgeLevelColor(levelNumber);
    },
    jsonSyntaxHighlight(json: string) {
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        function(match) {
          let cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }

          let cssClass = "";
          switch (cls) {
            case "number":
              cssClass = "text-blue-900 font-bold";
              break;
            case "key":
              cssClass = "text-red-500";
              break;
            case "string":
              cssClass = "text-black-500 font-bold";
              break;
            case "boolean":
              cssClass = "text-yellow-800 font-bold";
              break;
            case "null":
              cssClass = "text-orange-500 font-bold";
              break;
            default:
              cssClass = "text-black-500 font-bold";
              break;
          }

          return '<span class="' + cssClass + '">' + match + "</span>";
        }
      );
    }
  }
});
</script>
