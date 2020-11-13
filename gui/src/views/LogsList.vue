<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">List of available logs</h1>
  </div>

  <div class="row">
    <LogsListTable :log-records-files="logRecordsFiles" v-if="dataLoaded === true"></LogsListTable>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import LogsListTable from "@/components/LogsListTable.vue";
import Axios from "axios";
import {LogRecordFile} from "@/definitions/LogRecordFile";

export default defineComponent({
  name: "LogsList",
  data() {
    return {
      logRecordsFiles: {
        type: Array as PropType<LogRecordFile[]>
      },
      dataLoaded: false
    }
  },
  mounted() {
    this.fetchLogslist();
  },
  methods: {
    async fetchLogslist(): Promise<void> {
      const result = await Axios.get(
          "http://localhost:30300/app1/logs"
      );
      this.logRecordsFiles = result.data;
      this.dataLoaded = true;
    },
  },
  components: {
    LogsListTable
  }
});
</script>
