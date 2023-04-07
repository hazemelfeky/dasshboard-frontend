import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TerminalView from '@/views/TerminalView.vue'
import ExplorerView from '@/views/ExplorerView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    props: true,
    children: [
      {
        path: '/dashboard',
        component: DashboardView,
      },
      {
        path: '/explorer',
        component: ExplorerView,
      },
      {
        path: '/terminal',
        component: TerminalView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
