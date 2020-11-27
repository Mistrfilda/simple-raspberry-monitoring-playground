<template>
  <div class="mt-5 w-full bg-white overflow-hidden shadow rounded-lg">
    <div class="border-b border-gray-200">
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Supervisor version
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5 bg-blue-100 text-blue-800"
                >
                  {{ supervisorInfo.supervisorVersion.version }}</span
                >
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Supervisor API version
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5 bg-blue-100 text-blue-800"
                >
                  {{ supervisorInfo.apiVersion.apiVersion }}
                </span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                State
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5"
                  :class="
                    getStatenameColorClass(supervisorInfo.state.statecode)
                  "
                >
                  {{ supervisorInfo.state.statename }}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AllSupervisorInfo } from "@/definitions/Supervisor/AllSupervisorInfo";
import {
  SupervisorState,
  SupervisorStateColor
} from "@/definitions/Supervisor/SupervisorState";

export default defineComponent({
  name: "SupervisorInfoCard",
  props: {
    supervisorInfo: {
      type: Object as PropType<AllSupervisorInfo>,
      required: true
    }
  },
  methods: {
    getStatenameColorClass(statecode: number): string {
      switch (statecode) {
        case SupervisorState.FATAL:
          return (
            "bg-" +
            SupervisorStateColor.FATAL +
            "-100 text-" +
            SupervisorStateColor.FATAL +
            "-800"
          );
        case SupervisorState.RESTARTING:
          return (
            "bg-" +
            SupervisorStateColor.RESTARTING +
            "-100 text-" +
            SupervisorStateColor.RESTARTING +
            "-800"
          );
        case SupervisorState.RUNNING:
          return (
            "bg-" +
            SupervisorStateColor.RUNNING +
            "-100 text-" +
            SupervisorStateColor.RUNNING +
            "-800"
          );
        case SupervisorState.SHUTDOWN:
          return (
            "bg-" +
            SupervisorStateColor.SHUTDOWN +
            "-100 text-" +
            SupervisorStateColor.SHUTDOWN +
            "-800"
          );
        default:
          throw new Error("Invalid state");
      }
    }
  }
});
</script>
