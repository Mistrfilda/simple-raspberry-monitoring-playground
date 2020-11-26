<template>
  <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
    <DashboardBasicCard
      text="Total ram installed"
      :value="Math.ceil(calculateBytesToMb(ramUsage.total)) + ' MB'"
      contextual-class="bg-blue-500"
      icon="microchip"
    ></DashboardBasicCard>

    <DashboardBasicCard
      text="Available swap"
      :value="calculateBytesToMb(ramUsage.swapTotal) + ' MB'"
      contextual-class="bg-blue-500"
      icon="microchip"
    ></DashboardBasicCard>
  </div>

  <DashboardCurrentRamUsageCard
    :ram-usage="ramUsage"
  ></DashboardCurrentRamUsageCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";
import DashboardCurrentRamUsageCard from "@/components/DashboardCurrentRamUsageCard.vue";
import DashboardBasicCard from "@/components/DashboardBasicCard.vue";

export default defineComponent({
  name: "DashboardRamCards",
  props: {
    ramUsage: {
      type: Object as PropType<SystemInformationResultValues.RamUsage>,
      required: true
    },
    border: {
      type: String,
      default: "border-left"
    }
  },
  methods: {
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
