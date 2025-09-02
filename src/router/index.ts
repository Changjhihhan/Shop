import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path:'/product/list/:categoryId?',
      name: 'productList',
      component: () => import('@/views/Product/ProductListView.vue')
    },
    {
      path:'/product/detail/:productId',
      name: 'productDetail',
      component: () => import('@/views/Product/ProductDetailView.vue')
    },
  ],
})

export default router
