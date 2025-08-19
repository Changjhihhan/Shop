<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  bannerProps: { img: string; url: string; title: string }[]
}>()

const carouselHeight = ref('0px')

function measure(e: Event) {
  const img = e.target as HTMLImageElement
  // 依圖片原始比例 + 目前寬度計算高度（避免 0 高度雞生蛋問題）
  const ratio = img.naturalHeight / img.naturalWidth || 0.5625 // 預設 16:9
  const w = img.parentElement?.clientWidth ?? img.clientWidth
  carouselHeight.value = `${Math.round(w * ratio)}px`
}
</script>

<template>
  <el-carousel
    :height="carouselHeight"
    indicator-position="outside"
    class="banner-carousel"
    :collapse="true"
  >
    <el-carousel-item
      v-for="(banner, index) in bannerProps"
      :key="index"
    >
      <a :href="banner.url" class="banner-wrapper">
        <img :src="banner.img" :alt="banner.title" @load="measure" />
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.banner-wrapper { display:block; width:100%; }
.banner-wrapper img { width:100%; height:100%; object-fit:cover; display:block; }
</style>
