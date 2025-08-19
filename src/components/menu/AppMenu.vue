<script setup lang="ts">
import MenuBranch from "@/components/menu/MenuBranch.vue";
import type { MenuNode } from '@/types'
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activePath = computed(() => route.path);

withDefaults(defineProps<{
  items: MenuNode[]
  mode?: 'horizontal' | 'vertical'
  ellipsis?: boolean
}>(), {
  mode: 'horizontal',
  ellipsis: false
})
</script>

<template>
  <el-scrollbar>
    <el-menu :default-active="activePath" :mode="mode" :ellipsis="ellipsis" router>
      <MenuBranch :items="items" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
