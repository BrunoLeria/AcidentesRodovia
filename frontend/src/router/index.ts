// Composables
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/About.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
