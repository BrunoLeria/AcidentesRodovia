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
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (
    localStorage.getItem("token") !== "" &&
    to.name !== "Home" &&
    to.name !== "About" &&
    to.name !== "Profile"
  ) {
    return { name: "Home" };
  }

  if (to.name === "Profile" && localStorage.getItem("token") === "") {
    return { name: "Home" };
  }
});
export default router;
