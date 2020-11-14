<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Logs</h1>
  </div>

  <div>
    <LogRecordTable :log-id="logId"></LogRecordTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogRecordTable from "@/components/LogRecordTable.vue";

export default defineComponent({
  name: "LogRecord",
  data() {
    return {
      logId: this.$route.params.logId
    }
  },
  components: {
    LogRecordTable
  }
});
</script>
