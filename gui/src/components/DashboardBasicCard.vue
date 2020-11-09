<template>
  <div :class="size" class="py-3">
    <div class="card shadow h-100 py-2" :class="getBorderClass()">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div
              class="text-xs font-weight-bold text-uppercase mb-1"
              :class="getTextClass"
            >
              {{ text }}
            </div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">
              {{ value }}
            </div>
          </div>
          <div class="col-auto">
            <i class="fas fa-2x text-gray-300" :class="getIconClas()"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardValue",
  props: {
    size: {
      type: String,
      default: "col-md-6 col-sm-12"
    },
    border: {
      type: String,
      default: "border-left"
    },
    contextualClass: {
      type: String,
      default: "primary"
    },
    icon: String,
    value: String,
    text: String
  },
  methods: {
    getBorderClass(): string {
      return this.border + "-" + this.contextualClass;
    },
    getTextClass(): string {
      return "text-" + this.contextualClass;
    },
    getIconClas(): string {
      return "fa-" + this.icon;
    }
  }
});
</script>
