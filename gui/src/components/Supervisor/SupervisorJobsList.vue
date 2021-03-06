<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <SupervisorJobModal
      v-if="supervisorDetailProcess !== null"
      v-on:hide-modal="hideModal"
      :supervisor-process="supervisorDetailProcess"
    ></SupervisorJobModal>
  </transition>
  <ul
    class="grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
    v-if="dataLoaded === true"
  >
    <li
      v-for="supervisorProcess in supervisorProcesses"
      v-bind:key="supervisorProcess.name"
      class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div class="w-full flex items-center justify-between p-6 space-x-6">
        <div class="flex-1">
          <div class="flex items-center space-x-3 justify-between">
            <h3 class="text-gray-900 text-sm font-medium">
              {{ supervisorProcess.name }}
            </h3>
            <span
              class="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full"
              :class="getProcessStatenameColor(supervisorProcess.state)"
            >
              {{ supervisorProcess.statename }}
            </span>
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">
            {{ supervisorProcess.description }}
          </p>
        </div>
      </div>
      <div>
        <div class="-mt-px flex">
          <div class="w-0 flex-1 flex mx-6">
            <div
              class="relative -mr-px w-0 flex-1 inline-flex items-center justify-start py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <button
                v-if="isProcessRunning(supervisorProcess.state)"
                @click="stopProcess(supervisorProcess.name)"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
              >
                Stop
              </button>
              <button
                v-else
                @click="startProcess(supervisorProcess.name)"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
              >
                Start
              </button>
              <button
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Restart
              </button>
            </div>
          </div>
          <div class="-ml-px w-0 flex-1 flex mx-6">
            <div
              class="relative -mr-px w-0 flex-1 inline-flex items-center justify-end py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <button
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="showModal(supervisorProcess)"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProcessInfo } from "@/definitions/Supervisor/ProcessInfo";
import {
  SupervisorProcessState,
  SupervisorProcessStateColor
} from "@/definitions/Supervisor/SupervisorProcessState";
import SupervisorJobModal from "@/components/Supervisor/SupervisorJobModal.vue";
import { getProcessStatenameColor as getBadgeColor } from "@/helpers/Supervisor/SupervisorBadgeHelper";

export default defineComponent({
  name: "SupervisorJobsList",
  data() {
    return {
      supervisorProcesses: {
        type: Array as PropType<ProcessInfo[]>
      },
      supervisorDetailProcess: null as ProcessInfo | null,
      dataLoaded: false
    };
  },
  mounted() {
    this.fetchSupervisorProcesses();
    setInterval(() => this.fetchSupervisorProcesses(), 5000);
  },
  methods: {
    async fetchSupervisorProcesses(): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.get(
        "supervisor/all-processes"
      );
      this.supervisorProcesses = result.data;
      this.dataLoaded = true;
    },
    isProcessRunning(statecode: number): boolean {
      return [
        SupervisorProcessState.RUNNING,
        SupervisorProcessState.STARTING
      ].includes(statecode);
    },
    async stopProcess(process: string): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.post(
        "supervisor/stop-process",
        {
          process: process
        }
      );

      console.log(result.data);
      await this.fetchSupervisorProcesses();
    },
    async startProcess(process: string): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.post(
        "supervisor/start-process",
        {
          process: process
        }
      );

      console.log(result.data);
      await this.fetchSupervisorProcesses();
    },
    getProcessStatenameColor(statecode: number): string {
      return getBadgeColor(statecode);
    },
    showModal(supervisorProcess: ProcessInfo) {
      this.supervisorDetailProcess = supervisorProcess;
    },
    hideModal() {
      this.supervisorDetailProcess = null;
    }
  },
  components: {
    SupervisorJobModal
  }
});
</script>
