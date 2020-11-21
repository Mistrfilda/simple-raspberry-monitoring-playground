import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import LogsList from "@/views/LogsList.vue";
import LogRecord from "@/views/LogRecord.vue";
import ServerLogin from "@/views/ServerLogin.vue";

import MenuLayout from "@/layouts/MenuLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: MenuLayout, selectedServer: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: MenuLayout, selectedServer: true }
  },
  {
    path: "/logs-list",
    name: "LogsList",
    component: LogsList,
    meta: { layout: MenuLayout, selectedServer: true }
  },
  {
    path: "/logs/:logId",
    name: "LogRecord",
    component: LogRecord,
    meta: { layout: MenuLayout, selectedServer: true }
  },
  {
    path: "/server-login",
    name: "ServerLogin",
    component: ServerLogin,
    meta: { layout: BlankLayout, selectedServer: false }
  }
];

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (
      to.meta.selectedServer === true &&
      store.state.currentEndpoint === null
    ) {
      return next("/server-login");
    }

    next();
  }
);

export default router;
