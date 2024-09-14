import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router';

// Import layouts
import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";

// Import views

const routes = [
  // Main site routes under the MainLayout
  {
    path: '/',
    component: Home,
   
  },
  {
    path: '/login',
    component: Login,
   
  },
  {
    path: '/register',
    component: Register,
   
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
