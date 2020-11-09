<template>
  <!-- Earnings (Monthly) Card Example -->
  <div class="col-sm-12">
    <div class="card border-left-info shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
              Current CPU load
            </div>

            <div
              class="row no-gutters align-items-center"
              v-for="(core, index) in cpuLoad.cores"
              v-bind:key="core"
            >
              <div class="col-sm-3">
                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                  Core {{ index + 1 }}
                </div>
              </div>
              <div class="col-sm-9">
                <span class="badge" :class="`badge-` + getContextualClass()">
                  {{ calculateLoadPercentage(cpuLoad.max, core) }} %
                </span>
                <div class="progress progress-sm mr-2">
                  <div
                    class="progress-bar"
                    :class="'bg-' + getContextualClass()"
                    role="progressbar"
                    :style="
                      'width:' +
                        calculateLoadPercentage(cpuLoad.max, core) +
                        '%'
                    "
                    :aria-valuenow="calculateLoadPercentage(cpuLoad.max, core)"
                    aria-valuemin="0"
                    :aria-valuemax="calculateLoadPercentage(cpuLoad.max, core)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
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
    cpuLoad: {
      type: Object as PropType<SystemInformationResultValues.cpuLoadInfo>,
      required: true
    },
    loadPercentage: Number
  },
  methods: {
    calculateLoadPercentage(max: number, current: number): number {
      return (100 * current) / max;
    },
    getContextualClass(load: number): string {
      if (load < 25) {
        return "info";
      }

      if (load < 50) {
        return "primary";
      }

      if (load < 75) {
        return "warning";
      }

      return "danger";
    }
  }
});
</script>
