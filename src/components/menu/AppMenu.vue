<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { UserFilled } from "@element-plus/icons-vue";
import { ShoppingCart } from "@element-plus/icons-vue";

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
const router = useRouter();

const activePath = computed(() => route.path);

const gotoVipmember = () => {
  router.push("/vip/member")
}
const gotoShoppingCart = () => {
  router.push("/shoppingCart")
}
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
    <div class="icon" @click="gotoVipmember"><el-icon :size="20"><UserFilled /></el-icon></div>
    <div class="icon" @click="gotoShoppingCart"><el-icon :size="20"><ShoppingCart /></el-icon></div>
      <el-skeleton v-if="loaded" :rows="6" animated style="margin-top: 8px" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.icon {
  display: flex;
  align-items: center;
  margin: 5px;
  .el-icon {
    width: 100%;
  }
}
</style>
