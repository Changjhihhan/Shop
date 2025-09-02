<script setup lang="ts">
import type { productType } from "@/types";
import { Picture as IconPicture } from "@element-plus/icons-vue";

defineProps<{
  item: productType;
}>();
</script>

<template>
  <el-card
    :class="['w-full', { new: item.isNew }]"
    shadow="hover"
    :body-style="{ padding: 0 }"
    @click="$emit('click', item)"
  >
    <el-image
      class="product-img"
      src="../../../public/product/product_1.png"
      fit="contain"
      lazy
    >
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <template #footer>
      <div>{{ item.name }}</div>
      <div :class="[{'primary-color': item.activityPrice}]">
        <span v-show="(item.activityPrice ?? 0) > 0">$ {{ item.activityPrice }}</span>
        <span :class="[{'del-line': item.activityPrice}]">$ {{ item.price }}</span>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.product-img {
  display: block;
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: contain;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
  .el-icon {
    font-size: 30px;
  }
}
.del-line {
  text-decoration: line-through;
  font-size: 0.8rem;
  margin-left: 5px;
  color: var(--vt-c-text-dark-2);
}
.new {
  position: relative;
  &::before {
    content: "NEW";
    position: absolute;
    left: 5px;
    top: 5px;
    background-color: var(--color-background);
    color: var(--el-color-primary);
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 3px;
    z-index: 1;
    font-size: 0.6rem;
    font-weight: bold;
  }
}
</style>
