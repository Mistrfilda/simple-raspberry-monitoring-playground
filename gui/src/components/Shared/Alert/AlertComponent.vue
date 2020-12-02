<template>
  <div
    class="border-l-4 p-4 mb-5"
    :class="'bg-' + color + '-100 border-' + color + '-400'"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <span class="h-5 w-5 text-red-700">
          <i class="fas" :class="'fa-' + icon"></i>
        </span>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium" :class="'text-' + color + '-700'">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Alert",
  props: {
    message: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "exclamation-circle"
    }
  },
  components: {}
});
</script>
