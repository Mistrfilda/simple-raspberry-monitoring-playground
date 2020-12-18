<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
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
        <div class="fixed inset-0 transition-opacity" @click="hideModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
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
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-3xl sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="flex justify-between items-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Detail of supervisor process - {{ supervisorProcess.name }}
              </h3>
              <button
                @click="hideModal()"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500"></p>
          </div>

          <div class="px-4 py-5 sm:p-0">
            <dl>
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  Description
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{ supervisorProcess.description }}
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  Group
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{ supervisorProcess.group }}
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  State
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                    :class="getProcessStatenameColor(supervisorProcess.state)"
                  >
                    {{ supervisorProcess.statename }}
                  </span>
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  Started at
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{
                    $filters.convertSecondsTimestampToDateString(
                      supervisorProcess.start
                    )
                  }}
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  PID
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{ supervisorProcess.pid }}
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  stderr_logfile
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{ supervisorProcess.stderr_logfile }}
                </dd>
              </div>

              <div
                class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5"
              >
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  stdout_logfile
                </dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {{ supervisorProcess.stdout_logfile }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProcessInfo } from "@/definitions/Supervisor/ProcessInfo";
import { getProcessStatenameColor as getBadgeColor } from "@/helpers/Supervisor/SupervisorBadgeHelper";

export default defineComponent({
  name: "SupervisorJobModal",
  props: {
    supervisorProcess: {
      type: Object as PropType<ProcessInfo>,
      required: true
    }
  },
  methods: {
    hideModal(): void {
      this.$emit("hide-modal");
    },
    getProcessStatenameColor(statecode: number): string {
      return getBadgeColor(statecode);
    }
  },
  components: {}
});
</script>
