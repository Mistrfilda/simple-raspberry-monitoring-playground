<template>
  <div>
    <span>
      {{ value }}
    </span>
    <span>
      {{ name }}
    </span>
    <span>
      {{ icon }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardValue",
  props: {
    value: String,
    name: String,
    icon: String
  }
});
</script>
