<template>
  <div class="mt-5 w-full bg-white overflow-hidden shadow rounded-lg">
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Current CPU usage
      </h3>
      <p class="mt-1 text-sm leading-5 text-gray-500">
        Cores cpu usage
      </p>
    </div>
    <div class="border-b border-gray-200">
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Current CPU load
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5"
                  :class="getContextualClass(cpuLoad.currentload)"
                  >{{ Math.ceil(cpuLoad.currentload) }} %</span
                >
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                CPU load system
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5"
                  :class="getContextualClass(cpuLoad.currentloadSystem)"
                  >{{ Math.ceil(cpuLoad.currentloadSystem) }} %</span
                >
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6 text-center">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                CPU load user
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-xl font-medium leading-5"
                  :class="getContextualClass(cpuLoad.currentloadUser)"
                  >{{ Math.ceil(cpuLoad.currentloadUser) }} %</span
                >
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4">
      <div
        class="flex justify-between my-3 items-center"
        v-for="(core, index) in cpuLoad.cpuCoresLoads"
        v-bind:key="core"
      >
        <div class="text-lg w-1/6">Core {{ index + 1 }}</div>
        <div class="w-1/6">
          <span
            class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5"
            :class="getContextualClass(core.load)"
            >{{ Math.ceil(core.load) }}%</span
          >
        </div>
        <div class="w-4/6">
          <div class="overflow-hidden h-2 text-xs flex rounded bg-yellow-200">
            <div
              :style="'width:' + core.load + '%'"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
            ></div>
            <div
              :style="'width:' + (100 - core.load) + '%'"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";

export default defineComponent({
  name: "DashboardCurrentCpuLoadCard",
  props: {
    cpuSpeed: {
      type: Object as PropType<SystemInformationResultValues.cpuSpeedInfo>,
      required: true
    },
    cpuLoad: {
      type: Object as PropType<SystemInformationResultValues.currentCpuLoad>,
      required: true
    },
    border: {
      type: String,
      default: "border-left"
    },
    loadPercentage: Number
  },
  methods: {
    getContextualClass(load: number): string {
      if (load < 25) {
        return "bg-green-100 text-green-800";
      }

      if (load < 50) {
        return "bg-teal-100 text-teal-800";
      }

      if (load < 75) {
        return "bg-orange-100 text-orange-800";
      }

      return "bg-red-100 text-red-800";
    }
  }
});
</script>
