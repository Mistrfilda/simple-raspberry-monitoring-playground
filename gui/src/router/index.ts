import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import LogsList from "@/views/LogsList.vue";
import LogTable from "@/views/LogTable.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/logs-list",
    name: "LogsList",
    component: LogsList
  },
  {
    path: "/logs/:logId",
    name: "LogTable",
    component: LogTable
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
