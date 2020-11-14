<template>
  <div class="col-sm-12 bg-white py-4">
    <div class="table-responsive border border-dark rounded">
      <table class="table table-hover mw-100 mb-0" v-if="dataLoaded === true">
        <thead class="bg-primary text-white text-capitalize">
        <tr>
          <th scope="col">Message</th>
          <th scope="col">Level</th>
          <th scope="col">Date</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="logRecord in logRecords" v-bind:key="logRecord">
          <td>
            {{ logRecord.message }}
          </td>
          <td>
            {{ logRecord.level_name }}
          </td>
          <td>
            {{ $filters.convertIsoDateStringToFormat(logRecord.datetime) }}
          </td>
          <td class="text-right">
            <a href="#" class="btn btn-primary mr-2">Show context</a>
            <a href="#" class="btn btn-danger">Show extra info</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {LogRecord} from "@/definitions/LogRecord";
import Axios from "axios";

export default defineComponent({
  name: "LogRecordTable",
  props: {
    logId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      logRecords: {
        type: Array as PropType<LogRecord[]>
      },
      dataLoaded: false
    }
  },
  mounted() {
    this.fetchLogsRecords(this.logId);
  },
  methods: {
    async fetchLogsRecords(logId: number): Promise<void> {
      const result = await Axios.get(
          "http://localhost:30300/app1/logs/" + logId
      );

      this.logRecords = result.data;
      this.dataLoaded = true;
    }
  },
  components: {}
});
</script>