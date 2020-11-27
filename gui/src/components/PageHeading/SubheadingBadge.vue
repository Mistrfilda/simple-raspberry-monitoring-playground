<template>
  <span
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
    :class="['text-' + color + '-800', 'bg-' + color + '-100']"
  >
    Badge
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  name: "SubheadingBadge",
  components: {}
});
</script>
