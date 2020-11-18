import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import LogsList from "@/views/LogsList.vue";
import LogRecord from "@/views/LogRecord.vue";
import ServerLogin from "@/views/ServerLogin.vue";

import MenuLayout from "@/layouts/MenuLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: MenuLayout }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: MenuLayout }
  },
  {
    path: "/logs-list",
    name: "LogsList",
    component: LogsList,
    meta: { layout: MenuLayout }
  },
  {
    path: "/logs/:logId",
    name: "LogRecord",
    component: LogRecord,
    meta: { layout: MenuLayout }
  },
  {
    path: "/server-login",
    name: "ServerLogin",
    component: ServerLogin,
    meta: { layout: BlankLayout }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
