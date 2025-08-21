<script setup lang="ts">
import AppMenu from "@/components/menu/AppMenu.vue";
// import { computed } from "vue"
// import { useRoute } from "vue-router"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import ProductItem from "@/components/product/ProductItem.vue";

// const route = useRoute()
// const productId = computed(() => route.params.productId)

const categoryStore = useCategoryStore();
const { categories, loaded } = storeToRefs(categoryStore);
categoryStore.fetchCategories();

const productItem = {
  name: "商品名稱",
  id: "productId",
  content: "商品內容",
  price: 100,
};
</script>

<template>
  <el-row justify="space-around">
    <el-col :span="4" class="hidden-xs-only" :resizable="false">
      <AppMenu :items="categories" mode="vertical" />
      <el-skeleton v-if="!loaded" :rows="4" animated style="margin-top: 8px" />
    </el-col>

    <el-col :span="20">
      <el-row justify="start">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="2"
          v-for="value in 30"
          :key="value"
          style="padding: 5px;"
        >
          <ProductItem :item="productItem"></ProductItem>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
