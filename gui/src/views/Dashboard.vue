<template>
  <div class="pt-2 pb-6 md:py-6">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      v-if="dataLoaded === true"
    >
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            Dashboard
          </h2>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4"></div>
      </div>
      <div>
        <div class="sm:hidden">
          <select
            aria-label="Selected tab"
            class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
            v-model="currentTab"
          >
            <option v-for="availableTab in availableTabs"
                    v-bind:key="availableTab.name"
                    :selected="currentTab === availableTab.name"
                    :value="availableTab.name"
            >{{ availableTab.label }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex">
              <a
                v-for="(availableTab, index) in availableTabs"
                v-bind:key="availableTab.name"
                @click="switchTab(availableTab.name)"
                href="#"
                class="whitespace-no-wrap py-4 px-1 border-b-2 font-medium text-sm leading-5 hover:text-gray-700 hover:border-gray-300 focus:outline-none"
                v-bind:class="[
                  currentTab === availableTab.name
                    ? 'border-blue-500 text-blue-500 focus:text-blue-500 focus:border-blue-500'
                    : 'border-transparent text-gray-500 focus:text-gray-700 focus:border-gray-300',
                  index !== 0 ? 'ml-8' : ''
                ]"
              >
                {{ availableTab.label }}
                <span
                  v-if="availableTab.badge !== false"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5"
                  :class="getBadgeForMenu(availableTab.name, values).class"
                >
                  {{ getBadgeForMenu(availableTab.name, values).value }}
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      v-if="dataLoaded === true"
    >
      <div class="py-4">
        <div v-if="currentTab === availableTabs[0].name">
          <DashboardCurrentCpuLoadCard
            v-bind:cpuLoad="values.currentCpuLoadInfo"
            v-bind:cpu-speed="values.cpuSpeedInfo"
          ></DashboardCurrentCpuLoadCard>

          <DashboardCurrentRamUsageCard
            :ram-usage="values.ramUsage"
          ></DashboardCurrentRamUsageCard>
        </div>

        <div v-if="currentTab === availableTabs[1].name">
          <div
            class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2"
          >
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

        <div v-if="currentTab === availableTabs[2].name">
          <div
            class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2"
          >
            <DashboardBasicCard
              text="Cpu load"
              :value="
                ceilCpuLoadValue(values.currentCpuLoadInfo.currentload) + ' %'
              "
              :contextual-class="
                getContextualCpuLoadClass(values.currentCpuLoadInfo.currentload)
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
                ceilCpuLoadValue(values.currentCpuLoadInfo.currentloadSystem) +
                  ' %'
              "
              :contextual-class="
                getContextualCpuLoadClass(values.currentCpuLoadInfo.currentload)
              "
              icon="microchip"
            >
            </DashboardBasicCard>

            <DashboardBasicCard
              text="Cpu load user"
              :value="
                ceilCpuLoadValue(values.currentCpuLoadInfo.currentloadUser) +
                  ' %'
              "
              :contextual-class="
                getContextualCpuLoadClass(values.currentCpuLoadInfo.currentload)
              "
              icon="microchip"
            >
            </DashboardBasicCard>
          </div>

          <DashboardCurrentCpuLoadCard
            v-bind:cpuLoad="values.currentCpuLoadInfo"
            v-bind:cpu-speed="values.cpuSpeedInfo"
          ></DashboardCurrentCpuLoadCard>
        </div>

        <div v-if="currentTab === availableTabs[3].name">
          <DashboardRamCards :ram-usage="values.ramUsage"></DashboardRamCards>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DashboardBasicCard from "@/components/DashboardBasicCard.vue";
import DashboardCurrentCpuLoadCard from "@/components/DashboardCurrentCpuLoadCard.vue";
import DashboardRamCards from "@/components/DashboardRamCards.vue";
import Axios from "axios";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";
import DashboardCurrentRamUsageCard from "@/components/DashboardCurrentRamUsageCard.vue";
import DashboardMenuTabBadge from "@/definitions/DashboardMenuTabBadge";

export default defineComponent({
  name: "Dashboard",
  data() {
    return {
      dataLoaded: false,
      values: {
        type: Object as PropType<SystemInformationResultValues.allInformation>,
        required: true
      },
      availableTabs: [
        {
          name: "loadInfo",
          label: "Load info",
          target: "loadInfo",
          badge: false
        },
        { name: "cpuInfo", label: "CPU info", target: "cpuInfo", badge: false },
        {
          name: "cpuUsage",
          label: "CPU usage",
          target: "cpuUsage",
          badge: true
        },
        {
          name: "ramUsage",
          label: "Ram usage",
          target: "ramUsage",
          badge: true
        }
      ],
      currentTab: "loadInfo"
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
    switchTab(tabName: string) {
      this.currentTab = tabName;
    },
    getBadgeForMenu(
      name: string,
      values: SystemInformationResultValues.allInformation
    ): DashboardMenuTabBadge {
      if (name === this.availableTabs[2].name) {
        return {
          value: Math.ceil(values.currentCpuLoadInfo.currentload) + "%",
          class: this.getContextualBadgeCpuLoadClass(
            values.currentCpuLoadInfo.currentload
          )
        };
      }

      if (name === this.availableTabs[3].name) {
        return {
          value:
            Math.ceil(
              this.getRamPercentage(values.ramUsage.total, values.ramUsage.used)
            ) + "%",
          class: this.getRamBadgeContextualClass(
            values.ramUsage.total,
            values.ramUsage.used
          )
        };
      }

      throw new Error("Specify new badge");
    },
    getContextualBadgeCpuLoadClass(load: number): string {
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
    },
    getContextualCpuLoadClass(load: number): string {
      if (load < 25) {
        return "bg-green-500";
      }

      if (load < 50) {
        return "bg-teal-500";
      }

      if (load < 75) {
        return "bg-orange-500";
      }

      return "bg-red-500";
    },
    getContextualBadgeLoadClass(load: number): string {
      if (load < 50) {
        return "bg-gray-100 text-gray-800";
      }

      if (load < 75) {
        return "bg-orange-100 text-orange-800";
      }

      return "bg-red-100 text-red-800";
    },
    ceilCpuLoadValue(load: number): number {
      return Math.ceil(load);
    },
    getTemperatureContextualClass(temperature: number): string {
      if (temperature < 30) {
        return "bg-blue-500";
      }

      if (temperature < 60) {
        return "bg-orange-500";
      }

      return "bg-red-500";
    },
    getRamPercentage(total: number, ramUsed: number): number {
      return (100 * ramUsed) / total;
    },
    getRamContextualClass(total: number, ramUsed: number): string {
      const percentage = this.getRamPercentage(total, ramUsed);
      if (percentage < 30) {
        return "bg-green-100 text-green-800";
      }

      if (percentage < 60) {
        return "bg-orange-100 text-orange-800";
      }

      return "bg-red-100 text-red-800";
    },
    getRamBadgeContextualClass(total: number, ramUsed: number): string {
      const percentage = this.getRamPercentage(total, ramUsed);
      if (percentage < 30) {
        return "bg-green-100 text-green-800";
      }

      if (percentage < 60) {
        return "bg-orange-100 text-orange-800";
      }

      return "bg-red-100 text-red-800";
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
