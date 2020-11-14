<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-server"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Raspberry pi monitoring</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Nav Item - Dashboard -->
      <li
        class="nav-item"
        v-for="menuItem in menuItems"
        v-bind:key="menuItem.id"
      >
        <router-link class="nav-link" :to="menuItem.link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>{{ menuItem.label }}</span>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav
          class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        >
          <!-- Sidebar Toggle (Topbar) -->
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - Messages -->
            <div class="topbar-divider d-none d-sm-block"></div>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
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
        { id: 1, label: "Home", link: "/" },
        { id: 2, label: "Dashboard", link: "/dashboard" },
        { id: 3, label: "Logs", link: "/logs-list" }
      ]
    };
  },
  methods: {},
  components: {}
});
</script>
