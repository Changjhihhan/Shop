<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import AppMenu from "./components/menu/AppMenu.vue";
import { storeToRefs } from "pinia";
// import { useUserInfoStore } from "@/stores/user";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/products";
import { computed } from "vue";

const route = useRoute();

// const userInfoStore = useUserInfoStore();
const productsStore = useProductsStore();
const categoryStore = useCategoryStore();
// const { loginState } = storeToRefs(userInfoStore);
const { categories, loaded } = storeToRefs(categoryStore);

const menuList = computed(() => {
  return loaded
    ? [
        {
          route: "/",
          content:
            '<img style="height: 100%" src="/logo.svg" alt="logo" /> 首頁',
          style: "margin-right: auto",
        },
        { route: "/about", content: "品牌介紹" },
        {
          route: "/product/list",
          content: "商品分類",
          child: categories.value,
        },
        { route: "/news", content: "最新消息" },
      ]
    : [];
});
const showHeader = computed(() => {
  if(route.name == "login") return false;
  return true;
})

const initApp = function () {
  categoryStore.fetchCategories();
  productsStore.fetchProducts();
};

initApp();
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="hidden-xs-only header" v-show="showHeader">
        <AppMenu :items="menuList" mode="horizontal"></AppMenu>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <!-- <el-footer>一些說明</el-footer> -->
    </el-container>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  z-index: var(--header-z-index);
}
</style>
