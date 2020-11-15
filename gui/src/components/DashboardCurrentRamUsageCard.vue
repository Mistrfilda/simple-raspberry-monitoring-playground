<template>
  <div class="mt-5 w-full bg-white overflow-hidden shadow rounded-lg">
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Current RAM usage
      </h3>
      <p class="mt-1 text-sm leading-5 text-gray-500">
        Usage of ram
      </p>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div class="relative pt-1">
        <div class="flex justify-between mb-3 items-center">
          <div class="text-lg leading-6 font-medium text-gray-900">
            Used
          </div>
          <div class="text-lg leading-6 font-medium text-gray-900">
            Free
          </div>
        </div>
        <div class="flex justify-between mb-3 items-center">
          <div class="text-lg leading-6 font-medium text-gray-900">
            {{ Math.ceil(calculateBytesToMb(ramUsage.used)) }} MB
            <span
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800 mx-3"
            >
              {{ Math.ceil(getRamPercentage(ramUsage.total, ramUsage.used)) }} %
            </span>
          </div>
          <div class="text-lg leading-6 font-medium text-gray-900">
            <span
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-100 text-teal-800 mx-3"
            >
              {{ Math.ceil(getRamPercentage(ramUsage.total, ramUsage.free)) }} %
            </span>
            {{ Math.ceil(calculateBytesToMb(ramUsage.free)) }} MB
          </div>
        </div>
        <div
          class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200"
        >
          <div
            :style="
              'width:' + getRamPercentage(ramUsage.total, ramUsage.used) + '%'
            "
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
          ></div>
          <div
            :style="
              'width:' + getRamPercentage(ramUsage.total, ramUsage.free) + '%'
            "
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5 w-full bg-white overflow-hidden shadow rounded-lg">
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Current swap usage
      </h3>
      <p class="mt-1 text-sm leading-5 text-gray-500">
        Usage of swap
      </p>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div class="relative pt-1">
        <div class="flex justify-between mb-3 items-center">
          <div class="text-lg leading-6 font-medium text-gray-900">
            Used
          </div>
          <div class="text-lg leading-6 font-medium text-gray-900">
            Free
          </div>
        </div>
        <div class="flex justify-between mb-3 items-center">
          <div class="text-lg leading-6 font-medium text-gray-900">
            {{ Math.ceil(calculateBytesToMb(ramUsage.swapUsed)) }} MB
            <span
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-red-100 text-red-800 mx-3"
            >
              {{
                Math.ceil(
                  getRamPercentage(ramUsage.swapTotal, ramUsage.swapUsed)
                )
              }}
              %
            </span>
          </div>
          <div class="text-lg leading-6 font-medium text-gray-900">
            <span
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-100 text-teal-800 mx-3"
            >
              {{
                Math.ceil(
                  getRamPercentage(ramUsage.swapTotal, ramUsage.swapFree)
                )
              }}
              %
            </span>
            {{ Math.ceil(calculateBytesToMb(ramUsage.swapFree)) }} MB
          </div>
        </div>
        <div
          class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200"
        >
          <div
            :style="
              'width:' +
                getRamPercentage(ramUsage.swapTotal, ramUsage.swapUsed) +
                '%'
            "
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
          ></div>
          <div
            :style="
              'width:' +
                getRamPercentage(ramUsage.swapTotal, ramUsage.swapFree) +
                '%'
            "
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";

export default defineComponent({
  name: "DashboardCurrentRamUsageCard",
  props: {
    ramUsage: {
      type: Object as PropType<SystemInformationResultValues.ramUsage>,
      required: true
    },
    border: {
      type: String,
      default: "border-left"
    }
  },
  methods: {
    getRamPercentage(total: number, ramNumber: number): number {
      return (100 * ramNumber) / total;
    },
    calculateBytesToMb(bytes: number): number {
      return bytes / (1024 * 1024);
    }
  }
});
</script>
