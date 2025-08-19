<script setup lang="ts">
import { RouterView } from "vue-router";
import AppMenu from "./components/menu/AppMenu.vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { computed } from "vue";

const categoryStore = useCategoryStore();
const { categories, loaded } = storeToRefs(categoryStore);
categoryStore.fetchCategories();

const menuList = computed(() => {
  return loaded
    ? [
        {
          route: "/",
          content: '<img style="height: 100%" src="/logo.svg" alt="logo" /> 首頁',
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
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <AppMenu :items="menuList" mode="horizontal"></AppMenu>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>一些說明</el-footer>
    </el-container>
  </div>
</template>
<!-- <template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template> -->
