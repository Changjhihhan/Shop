<script setup lang="ts">
import type { MenuNode } from '@/types'

defineProps<{
  items: MenuNode[];
}>();
</script>

<template>
  <template v-for="item in items" :key="item.route">
    <el-sub-menu v-if="item.child?.length" :index="item.route">
      <template #title>
        <div class="h-full contents" v-html="item.content"></div>
      </template>
      <MenuBranch :items="item.child" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.route" :style="item.style">
      <div class="h-full contents" v-html="item.content"></div>
    </el-menu-item>
  </template>
</template>
