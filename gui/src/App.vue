<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <transition enter-active-class="delay-300" leave-active-class="delay-300">
      <div v-show="menuOpen">
        <div class="fixed inset-0 flex z-40">
          <transition
            enter-active-class="transition-opacity ease-linear duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div class="fixed inset-0" v-show="menuOpen" @click="menuOpen = false">
              <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
          </transition>

          <transition
            enter-active-class="transition ease-in-out duration-300 transform"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <div
              class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-600"
              v-show="menuOpen"
            >
              <div class="absolute top-0 right-0 -mr-14 p-1">
                <button
                  class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                  @click="menuOpen = false"
                  v-show="menuOpen"
                >
                  <svg
                    class="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-shrink-0 flex items-center px-4">
                <div
                  class="text-2xl font-bold leading-7 text-white w-full text-center rounded-2xl bg-blue-500 px-2 py-3"
                >
                  Monitoring
                </div>
              </div>

              <div class="mt-5 flex-1 h-0 overflow-y-auto">
                <nav class="px-2 space-y-1">
                  <router-link
                    v-for="menuItem in menuItems"
                    v-bind:key="menuItem.id"
                    :to="menuItem.link"
                    :class="getMobileMenuItemClass(menuItem.name)"
                  >
                    <i
                      class="mr-4 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 fa fa-2x"
                      :class="'fa-' + menuItem.icon"
                    ></i>
                    {{ menuItem.label }}
                  </router-link>
                </nav>
              </div>
            </div>
          </transition>
          <div class="flex-shrink-0 w-14">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>
    </transition>

    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-blue-600">
            <div
              class="text-2xl font-bold leading-7 text-white w-full text-center rounded-2xl bg-blue-500 px-2 py-3"
            >
              Monitoring
            </div>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-blue-600 space-y-1">
              <router-link
                v-for="menuItem in menuItems"
                v-bind:key="menuItem.id"
                :to="menuItem.link"
                :class="getMenuItemClass(menuItem.name)"
              >
                <i
                  class="mr-3 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 fa fa-2x"
                  :class="'fa-' + menuItem.icon"
                ></i>
                {{ menuItem.label }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
          aria-label="Open sidebar"
          @click="menuOpen = !menuOpen"
        >
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex"></div>
          <div class="ml-4 flex items-center md:ml-6">
            <div class="rounded-2xl bg-orange-500 p-2 text-white">
              Current server: 192.168.1.183
            </div>
          </div>
        </div>
      </div>

      <main
        class="flex-1 relative overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      menuItems: [
        { id: 1, name: "Home", label: "Home", link: "/", icon: "home" },
        {
          id: 2,
          name: "Dashboard",
          label: "Dashboard",
          link: "/dashboard",
          icon: "server"
        },
        {
          id: 3,
          name: "LogsList",
          label: "Logs",
          link: "/logs-list",
          icon: "database"
        }
      ],
      menuOpen: false
    };
  },
  methods: {
    getMenuItemClass(name: string): string {
      if (name === this.$route.name) {
        return "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-blue-900 focus:outline-none transition ease-in-out duration-150";
      }

      return "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white transition ease-in-out duration-150";
    },
    getMobileMenuItemClass(name: string): string {
      if (name === this.$route.name) {
        return "group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-blue-700 transition ease-in-out duration-150";
      }

      return "group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-blue-700 transition ease-in-out duration-150";
    }
  },
  components: {}
});
</script>
