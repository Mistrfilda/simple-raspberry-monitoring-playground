<template>
  <!-- Earnings (Monthly) Card Example -->
  <div class="col-sm-12">
    <div class="card shadow h-100 py-2" :class="getBorderClass()">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-uppercase mb-1" :class="getTextClass()">
              Current ram usage
            </div>

            <div class="row">

            </div>
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
  name: "DashboardCurrentRamUsageCard",
  props: {
    ramUsage: {
      type: Object as PropType<SystemInformationResultValues.ramUsage>,
      required: true
    },
    border: {
      type: String,
      default: "border-left"
    },
  },
  methods: {
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
    },
    getBorderClass(): string {
      return "";
      // return this.border + "-" + this.getContextualClass(this.cpuLoad.currentload);
    },
    getTextClass(): string {
      return "";
      // return "text-" + this.getContextualClass(this.cpuLoad.currentload);
    },
    calculateBytesToMb(bytes: number): number {
      return 100;
    }
  }
});
</script>
