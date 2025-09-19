import { createRouter, createWebHistory } from "vue-router";
import { useUserInfoStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/product/list/:categoryId?",
      name: "productList",
      component: () => import("@/views/product/ProductListView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/product/detail/:productId",
      name: "productDetail",
      component: () => import("@/views/product/ProductDetailView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/vip/member",
      name: "vipMember",
      component: () => import("@/views/VipMember.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: () => import("@/views/ShoppingCart.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserInfoStore();
  const isLoggedIn = !!userStore.loginState;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
