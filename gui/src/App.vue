<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  created() {
    document.title = "My monitoring app";
  }
});
</script>
