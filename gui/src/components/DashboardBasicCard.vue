<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0 rounded-md p-3" :class="contextualClass">
          <i class="text-white fas fa-2x text-white" :class="getIconClas()"></i>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
              {{ text }}
            </dt>
            <dd class="flex items-baseline">
              <div class="text-2xl leading-8 font-semibold text-gray-900">
                {{ value }}
              </div>
              <div
                class="ml-2 flex items-baseline text-sm leading-5 font-semibold text-green-600"
              >
                <!--                <svg class="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor"-->
                <!--                     viewBox="0 0 20 20">-->
                <!--                  <path fill-rule="evenodd"-->
                <!--                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"-->
                <!--                        clip-rule="evenodd"/>-->
                <!--                </svg>-->
                <!--                <span class="sr-only">-->
                <!--                    Increased by-->
                <!--                  </span>-->
                <!--                122-->
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!--    <div class="bg-blue-500 px-4 py-4 sm:px-6">-->
    <!--      <div class="text-sm leading-5">-->
    <!--      </div>-->
    <!--    </div>-->
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
      default: "bg-blue-500"
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
