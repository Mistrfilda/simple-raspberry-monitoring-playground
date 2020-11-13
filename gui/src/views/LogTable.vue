<template>
  <div>
    {{ logId }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogTable",
  data() {
    return {
      logId: this.$route.params.logId
    }
  },
  components: {}
});
</script>
