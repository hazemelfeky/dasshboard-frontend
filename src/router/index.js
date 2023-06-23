import { createRouter, createWebHistory } from "vue-router";
import SplashView from "@/views/SplashView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import TerminalView from "@/views/TerminalView.vue";
import DockerView from "@/views/DockerView.vue";
import ExplorerView from "@/views/ExplorerView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "splash",
    component: SplashView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    props: true,
    children: [
      {
        path: "/dashboard",
        component: DashboardView,
      },
      {
        path: "/explorer",
        component: ExplorerView,
      },
      {
        path: "/terminal",
        component: TerminalView,
      },
      {
        path: "/docker",
        component: DockerView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("host");
  console.log("authRequired", authRequired);
  console.log("loggedIn", loggedIn);

  if (authRequired && !loggedIn) {
    next("/login");
  } else if (!authRequired && loggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
