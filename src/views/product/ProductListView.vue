<script setup lang="ts">
import AppMenu from "@/components/menu/AppMenu.vue"
import { computed } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useCategoryStore } from "@/stores/category"

const route = useRoute()
const productId = computed(() => route.params.productId)

const categoryStore = useCategoryStore()
const { categories, loaded } = storeToRefs(categoryStore)
categoryStore.fetchCategories()
</script>

<template>
  <el-splitter>
    <el-splitter-panel size="30%">
      <AppMenu :items="categories" mode="vertical" />
      <el-skeleton v-if="!loaded" :rows="4" animated style="margin-top: 8px" />
    </el-splitter-panel>

    <el-splitter-panel :min="200">
      <div>{{ productId }}</div>
    </el-splitter-panel>
  </el-splitter>
</template>
