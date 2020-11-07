<template>
  <div>
    halo tohle funguje?
    <span v-if="values !== null">fadsfas</span>
    <div v-if="dataLoaded === true">
    {{ values }}
    {{ values.cpuInfo }}
    {{ values.cpuInfo.manufacturer }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import DashboardValue from "@/components/DashboardValue.vue";
import Axios from "axios";
import {SystemInformationResultValues} from "@/definitions/SystemInformationResultValues";

export default defineComponent({
  name: "Dashboard",
  data() {
    return {
      dataLoaded: false,
      values: {
        type: Object as PropType<SystemInformationResultValues.allInformation>,
        required: true
      }
    }
  },
  mounted() {
    this.fetchDashboardValues()
  },
  methods: {
    async fetchDashboardValues(): Promise<void> {
      const result = await Axios.get('http://localhost:30300/app1/system/getAll');
      this.values = result.data;
      this.dataLoaded = true;
    }
  },
  components: {
    // DashboardValue
  },
});
</script>