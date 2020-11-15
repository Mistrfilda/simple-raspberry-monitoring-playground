<template>
  <div class="col-sm-12 bg-white py-4">
    <div class="table-responsive border border-dark rounded">
      <table class="table table-hover mw-100 mb-0">
        <thead class="bg-primary text-white text-capitalize">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last updated</th>
            <th scope="col">Filesize</th>
            <th scope="col" class="text-right"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="logRecordFile in logRecordsFiles"
            v-bind:key="logRecordFile.id"
          >
            <td>{{ logRecordFile.name }}</td>
            <td>
              {{
                $filters.convertMillisecondsTimestampToDateString(
                  logRecordFile.lastUpdatedAtTimestamp
                )
              }}
            </td>
            <td>
              {{ $filters.calculateBytesToMbString(logRecordFile.fileSize) }}
            </td>
            <td class="text-right">
              <router-link
                class="btn btn-primary"
                :to="{ name: 'LogRecord', params: { logId: logRecordFile.id } }"
                >Detail</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LogRecordFile } from "@/definitions/LogRecordFile";

export default defineComponent({
  name: "LogsListTable",
  props: {
    logRecordsFiles: {
      type: Array as PropType<LogRecordFile[]>,
      default: []
    }
  },
  methods: {},
  components: {}
});
</script>
