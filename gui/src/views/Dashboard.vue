<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
  </div>

  <div class="row" v-if="dataLoaded === true">
    <div class="col-sm-12">
      <div class="accordion" id="dashboardAccordion">

        <!-- LOAD INFO -->
        <div class="card border-primary">
          <div class="card-header bg-gradient-primary" id="loadHeading">
            <h2 class="mb-0">
              <button
                  class="btn btn-block text-left text-white btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#loadCollapse"
                  aria-expanded="true"
                  aria-controls="collapseOne"
              >
                Load info
              </button>
            </h2>
          </div>

          <div id="loadCollapse" class="collapse" aria-labelledby="loadHeading">
            <div class="card-body">
              <div class="row">
                <DashboardCurrentCpuLoadCard
                    v-bind:cpuLoad="values.currentCpuLoadInfo"
                    v-bind:cpu-speed="values.cpuSpeedInfo"
                ></DashboardCurrentCpuLoadCard>

                <DashboardCurrentRamUsageCard
                    :ram-usage="values.ramUsage"
                ></DashboardCurrentRamUsageCard>
              </div>
            </div>
          </div>
        </div>
        <!-- END OF LOAD INFO -->

        <!-- CPU-->
        <div class="card border-primary">
          <div class="card-header bg-gradient-primary" id="cpuHeading">
            <h2 class="mb-0">
              <button
                class="btn btn-block text-left text-white btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#cpuCollapse"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                CPU information
              </button>
            </h2>
          </div>

          <div id="cpuCollapse" class="collapse" aria-labelledby="cpuHeading">
            <div class="card-body">
              <div class="row">
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
              </div>
            </div>
          </div>
        </div>
        <!-- END OF CPU -->

        <!-- CPU LOAD-->
        <div class="card border-primary">
          <div class="card-header bg-gradient-primary" id="cpuLoadHeading">
            <h2 class="mb-0">
              <button
                class="btn btn-link btn-block text-left text-white"
                type="button"
                data-toggle="collapse"
                data-target="#cpuLoadCollapse"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                CPU load
                <span
                  class="badge badge-pill"
                  :class="
                    'badge-' +
                      getContextualBadgeLoadClass(
                        values.currentCpuLoadInfo.currentload
                      )
                  "
                >
                  {{ ceilCpuLoadValue(values.currentCpuLoadInfo.currentload) }}
                  %</span
                >
              </button>
            </h2>
          </div>

          <div
            id="cpuLoadCollapse"
            class="collapse"
            aria-labelledby="cpuLoadHeading"
          >
            <div class="card-body">
              <div class="row">
                <DashboardBasicCard
                  text="Cpu load"
                  :value="
                    ceilCpuLoadValue(values.currentCpuLoadInfo.currentload) +
                      ' %'
                  "
                  :contextual-class="
                    getContextualCpuLoadClass(
                      values.currentCpuLoadInfo.currentload
                    )
                  "
                  icon="microchip"
                >
                </DashboardBasicCard>

                <DashboardBasicCard
                  text="CPU temperature"
                  :value="values.temperatureInfo.temperature + ' °C'"
                  :contextual-class="
                    getTemperatureContextualClass(
                      values.temperatureInfo.temperature
                    )
                  "
                  icon="microchip"
                >
                </DashboardBasicCard>

                <DashboardBasicCard
                  text="Cpu load system"
                  :value="
                    ceilCpuLoadValue(
                      values.currentCpuLoadInfo.currentloadSystem
                    ) + ' %'
                  "
                  :contextual-class="
                    getContextualCpuLoadClass(
                      values.currentCpuLoadInfo.currentload
                    )
                  "
                  icon="microchip"
                >
                </DashboardBasicCard>

                <DashboardBasicCard
                  text="Cpu load user"
                  :value="
                    ceilCpuLoadValue(
                      values.currentCpuLoadInfo.currentloadUser
                    ) + ' %'
                  "
                  :contextual-class="
                    getContextualCpuLoadClass(
                      values.currentCpuLoadInfo.currentload
                    )
                  "
                  icon="microchip"
                >
                </DashboardBasicCard>

                <DashboardCurrentCpuLoadCard
                  v-bind:cpuLoad="values.currentCpuLoadInfo"
                  v-bind:cpu-speed="values.cpuSpeedInfo"
                ></DashboardCurrentCpuLoadCard>
              </div>
            </div>
          </div>
        </div>
        <!-- END OF CPU LOAD -->

        <!-- RAM USAGE-->
        <div class="card border-primary">
          <div class="card-header bg-gradient-primary" id="ramUsageHeading">
            <h2 class="mb-0">
              <button
                class="btn btn-link btn-block text-left text-white"
                type="button"
                data-toggle="collapse"
                data-target="#ramUsageCollapse"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                RAM usage
                <span
                  class="badge badge-pill"
                  :class="
                    'badge-' +
                      getRamContextualClass(
                        values.ramUsage.total,
                        values.ramUsage.used
                      )
                  "
                >
                  {{
                    Math.ceil(
                      getRamPercentage(
                        values.ramUsage.total,
                        values.ramUsage.used
                      )
                    )
                  }}
                  %</span
                >
              </button>
            </h2>
          </div>

          <div
            id="ramUsageCollapse"
            class="collapse"
            aria-labelledby="ramUsageHeading"
          >
            <div class="card-body">
              <DashboardRamCards
                :ram-usage="values.ramUsage"
              ></DashboardRamCards>
            </div>
          </div>
        </div>
        <!-- END OF RAM USAGE -->
      </div>
    </div>
  </div>

  <div class="row" v-if="dataLoaded === true"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DashboardBasicCard from "@/components/DashboardBasicCard.vue";
import DashboardCurrentCpuLoadCard from "@/components/DashboardCurrentCpuLoadCard.vue";
import DashboardRamCards from "@/components/DashboardRamCards.vue";
import Axios from "axios";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";
import DashboardCurrentRamUsageCard from "@/components/DashboardCurrentRamUsageCard.vue";

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
    setInterval(() => this.fetchDashboardValues(), 5000);
  },
  methods: {
    async fetchDashboardValues(): Promise<void> {
      const result = await Axios.get(
        "http://localhost:30300/app1/system/getAll"
      );
      this.values = result.data;
      this.dataLoaded = true;
    },
    getContextualCpuLoadClass(load: number): string {
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
    getContextualBadgeLoadClass(load: number): string {
      if (load < 50) {
        return "dark";
      }

      if (load < 75) {
        return "warning";
      }

      return "danger";
    },
    ceilCpuLoadValue(load: number): number {
      return Math.ceil(load);
    },
    getTemperatureContextualClass(temperature: number): string {
      if (temperature < 30) {
        return "primary";
      }

      if (temperature < 60) {
        return "warning";
      }

      return "danger";
    },
    getRamPercentage(total: number, ramUsed: number): number {
      return (100 * ramUsed) / total;
    },
    getRamContextualClass(total: number, ramUsed: number): string {
      const percentage = this.getRamPercentage(total, ramUsed);
      if (percentage < 30) {
        return "secondary";
      }

      if (percentage < 60) {
        return "warning";
      }

      return "danger";
    }
  },
  components: {
    DashboardBasicCard,
    DashboardCurrentCpuLoadCard,
    DashboardRamCards,
    DashboardCurrentRamUsageCard
  }
});
</script>
