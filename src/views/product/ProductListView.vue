<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import AppMenu from "@/components/menu/AppMenu.vue";
import ProductItem from "@/components/product/ProductItem.vue";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/products";

import type { productType } from "@/types";

const route = useRoute();
const router = useRouter();

const categoryStore = useCategoryStore();
const { categories, loaded: catLoaded } = storeToRefs(categoryStore);
const categoryId = computed(() => route.params.categoryId as string);

const productsStore = useProductsStore();
const { loaded: proLoaded } = storeToRefs(productsStore);
const productByCategory = computed(() =>
  productsStore.byCategory(categoryId.value)
);

function goDetailProduct(item: productType) {
  router.push(`/product/detail/${item.id}`)
}
</script>

<template>
  <el-row justify="space-around">
    <el-col :span="5" class="hidden-xs-only" :resizable="false">
      <AppMenu :items="categories" :loaded="catLoaded" mode="vertical" />
    </el-col>

    <el-col :span="19">
      <el-row justify="start">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="2"
          v-for="product in productByCategory"
          :key="product.id"
          style="padding: 5px"
        >
          <ProductItem :item="product" :loaded="proLoaded" @click.self="goDetailProduct"></ProductItem>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
