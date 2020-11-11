<template>
  <!-- Earnings (Monthly) Card Example -->
  <div class="col-sm-12 py-3">
    <div
      class="card shadow h-100 py-2"
      :class="getBorderClass(ramUsage.total, ramUsage.used)"
    >
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div
              class="text-xs font-weight-bold text-uppercase mb-1"
              :class="getTextClass(ramUsage.total, ramUsage.used)"
            >
              Current memory usage
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="d-flex justify-content-between align-items-center">
                  <div
                    class="mb-0 mr-3 font-weight-bold text-gray-800 d-flex align-items-center"
                  >
                    <span class="badge badge-success mr-2"
                      >{{
                        Math.ceil(
                          getRamPercentage(ramUsage.total, ramUsage.free)
                        )
                      }}
                      %</span
                    >
                    {{ Math.ceil(calculateBytesToMb(ramUsage.free)) }} MB
                  </div>
                  <div
                    class="mb-0 font-weight-bold text-gray-800 d-flex align-items-center"
                  >
                    {{ Math.ceil(calculateBytesToMb(ramUsage.used)) }} MB
                    <span class="badge badge-danger ml-2"
                      >{{
                        Math.floor(
                          getRamPercentage(ramUsage.total, ramUsage.used)
                        )
                      }}
                      %</span
                    >
                  </div>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :style="
                      'width:' +
                        getRamPercentage(ramUsage.total, ramUsage.free) +
                        '%'
                    "
                    :aria-valuenow="
                      getRamPercentage(ramUsage.total, ramUsage.free)
                    "
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    :style="
                      'width:' +
                        getRamPercentage(ramUsage.total, ramUsage.used) +
                        '%'
                    "
                    :aria-valuenow="
                      getRamPercentage(ramUsage.total, ramUsage.used)
                    "
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-12 py-3">
    <div
      class="card shadow h-100 py-2"
      :class="getBorderClass(ramUsage.swapTotal, ramUsage.swapUsed)"
    >
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div
              class="text-xs font-weight-bold text-uppercase mb-1"
              :class="getTextClass(ramUsage.swapTotal, ramUsage.swapUsed)"
            >
              Current swap usage
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="d-flex justify-content-between align-items-center">
                  <div
                    class="mb-0 mr-3 font-weight-bold text-gray-800 d-flex align-items-center"
                  >
                    <span class="badge badge-success mr-2"
                      >{{
                        Math.ceil(
                          getRamPercentage(
                            ramUsage.swapTotal,
                            ramUsage.swapFree
                          )
                        )
                      }}
                      %</span
                    >
                    {{ calculateBytesToMb(ramUsage.swapFree) }} MB
                  </div>
                  <div
                    class="mb-0 font-weight-bold text-gray-800 d-flex align-items-center"
                  >
                    {{ calculateBytesToMb(ramUsage.swapUsed) }} MB
                    <span class="badge badge-danger ml-2"
                      >{{
                        Math.floor(
                          getRamPercentage(
                            ramUsage.swapTotal,
                            ramUsage.swapUsed
                          )
                        )
                      }}
                      %</span
                    >
                  </div>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :style="
                      'width:' +
                        getRamPercentage(
                          ramUsage.swapTotal,
                          ramUsage.swapFree
                        ) +
                        '%'
                    "
                    :aria-valuenow="
                      getRamPercentage(ramUsage.swapTotal, ramUsage.swapFree)
                    "
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    :style="
                      'width:' +
                        getRamPercentage(
                          ramUsage.swapTotal,
                          ramUsage.swapUsed
                        ) +
                        '%'
                    "
                    :aria-valuenow="
                      getRamPercentage(ramUsage.swapTotal, ramUsage.swapUsed)
                    "
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SystemInformationResultValues } from "@/definitions/SystemInformationResultValues";

export default defineComponent({
  name: "DashboardCurrentRamUsageCard",
  props: {
    ramUsage: {
      type: Object as PropType<SystemInformationResultValues.ramUsage>,
      required: true
    },
    border: {
      type: String,
      default: "border-left"
    }
  },
  methods: {
    getBorderClass(total: number, used: number): string {
      const usedPercentage = this.getRamPercentage(total, used);
      return this.border + "-" + this.getContextualClass(usedPercentage);
    },
    getTextClass(total: number, used: number): string {
      const usedPercentage = this.getRamPercentage(total, used);
      return "text-" + this.getContextualClass(usedPercentage);
    },
    getRamPercentage(total: number, ramNumber: number): number {
      return (100 * ramNumber) / total;
    },
    getContextualClass(percentage: number): string {
      if (percentage < 30) {
        return "secondary";
      }

      if (percentage < 60) {
        return "warning";
      }

      return "danger";
    },
    calculateBytesToMb(bytes: number): number {
      return bytes / (1024 * 1024);
    }
  }
});
</script>
