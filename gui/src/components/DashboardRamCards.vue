<template>
  <div class="row">
    <DashboardBasicCard
        text="Total ram installed"
        :value="calculateBytesToMb(ramUsage.total) + ' MB'"
        contextual-class="primary"
        icon="microchip"
    ></DashboardBasicCard>


    <DashboardBasicCard
        text="Available swap"
        :value="calculateBytesToMb(ramUsage.swapTotal) + ' MB'"
        contextual-class="primary"
        icon="microchip"
    ></DashboardBasicCard>
  </div>

  <div class="row">
    <DashboardCurrentRamUsageCard
        :ram-usage="ramUsage"
    ></DashboardCurrentRamUsageCard>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {SystemInformationResultValues} from "@/definitions/SystemInformationResultValues";
import DashboardCurrentRamUsageCard from "@/components/DashboardCurrentRamUsageCard.vue";
import DashboardBasicCard from "@/components/DashboardBasicCard.vue";

export default defineComponent({
  name: "DashboardRamCards",
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
      return bytes / (1024 * 1024);
    }
  },
  components: {
    DashboardCurrentRamUsageCard,
    DashboardBasicCard
  }
});
</script>
