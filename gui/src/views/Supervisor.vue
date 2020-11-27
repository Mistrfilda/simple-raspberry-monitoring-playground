<template>
  <div class="pt-2 pb-6 md:py-6" v-if="dataLoaded === true">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            Supervisor
          </h2>
          <div
            class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap"
          ></div>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4"></div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="py-4">
        <div class="pb-5 border-b border-gray-200">
          <h2
            class="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:leading-9 sm:truncate"
          >
            Basic info
          </h2>
        </div>

        <supervisorInfoCard
          :supervisor-info="supervisorInfo"
        ></supervisorInfoCard>

        <div class="mt-3">
          <!-- This example requires Tailwind CSS v2.0+ -->
          <div class="pb-5 border-b border-gray-200">
            <h2
              class="text-xl font-bold leading-7 text-gray-900 sm:text-xl sm:leading-9 sm:truncate"
            >
              Configured processes
            </h2>
          </div>

          <div class="mt-5">
            <supervisorJobsList></supervisorJobsList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AllSupervisorInfo } from "@/definitions/Supervisor/AllSupervisorInfo";
import SupervisorInfoCard from "@/components/Supervisor/SupervisorInfoCard.vue";
import SupervisorJobsList from "@/components/Supervisor/SupervisorJobsList.vue";

export default defineComponent({
  name: "Supervisor",
  data() {
    return {
      supervisorInfo: {} as AllSupervisorInfo,
      dataLoaded: false
    };
  },
  mounted() {
    this.fetchSupervisorInfo();
  },
  methods: {
    async fetchSupervisorInfo(): Promise<void> {
      const result = await this.$store.getters.getAxiosInstance.get(
        "supervisor/all-info"
      );
      this.supervisorInfo = result.data;
      this.dataLoaded = true;
    }
  },
  components: {
    SupervisorInfoCard,
    SupervisorJobsList
  }
});
</script>
