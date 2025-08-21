<script setup lang="ts">
import type { productType } from "@/types";

defineProps<{
  item: productType;
}>();
</script>

<template>
  <el-card class="w-full">
    <template #header>Yummy hamburger</template>
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="w-full"
    />
    <template #footer>Footer content</template>
  </el-card>
</template>
