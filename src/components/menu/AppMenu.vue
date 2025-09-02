<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MenuBranch from "@/components/menu/MenuBranch.vue";
import type { MenuNode } from "@/types";

withDefaults(
  defineProps<{
    items: MenuNode[];
    mode?: "horizontal" | "vertical";
    ellipsis?: boolean;
    loaded?: boolean;
  }>(),
  {
    mode: "horizontal",
    ellipsis: false,
  }
);

const route = useRoute();

const activePath = computed(() => route.path);
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="activePath"
      :mode="mode"
      :ellipsis="ellipsis"
      router
    >
      <MenuBranch :items="items" />
      <el-skeleton v-if="loaded" :rows="6" animated style="margin-top: 8px" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
