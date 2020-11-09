<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Cards</h1>
  </div>

  <div class="row" v-if="dataLoaded === true">
    <DashboardBasicCard
      :text="'CPU manufacturer'"
      :value="values.cpuInfo.manufacturer"
      icon="industry"
    >
    </DashboardBasicCard>

    <DashboardBasicCard
      :text="'CPU type'"
      :value="values.cpuInfo.brand"
      icon="microchip"
    >
    </DashboardBasicCard>

    <DashboardBasicCard
      :text="'Speed'"
      :value="values.cpuInfo.speed"
      icon="microchip"
    >
    </DashboardBasicCard>

    <DashboardBasicCard
      text="Cores"
      :value="values.cpuInfo.cores"
      icon="microchip"
    >
    </DashboardBasicCard>

    <DashboardCurrentCpuLoadCard
      v-bind:cpuLoad="values.cpuLoadInfo"
    ></DashboardCurrentCpuLoadCard>
  </div>

  <div class="row">
    <!-- Pending Requests Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-warning text-uppercase mb-1"
              >
                Pending Requests
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-comments fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DashboardBasicCard from "@/components/DashboardBasicCard.vue";
import DashboardCurrentCpuLoadCard from "@/components/DashboardCurrentCpuLoadCard.vue";
import Axios from "axios";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";

export default defineComponent({
  name: "Dashboard",
  data() {
    return {
      dataLoaded: false,
      values: {
        type: Object as PropType<SystemInformationResultValues.allInformation>,
        required: true
      }
    };
  },
  mounted() {
    this.fetchDashboardValues();
  },
  methods: {
    async fetchDashboardValues(): Promise<void> {
      const result = await Axios.get(
        "http://localhost:30300/app1/system/getAll"
      );
      this.values = result.data;
      this.dataLoaded = true;
    }
  },
  components: {
    DashboardBasicCard,
    DashboardCurrentCpuLoadCard
  }
});
</script>
