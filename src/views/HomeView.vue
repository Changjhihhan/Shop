<script setup lang="ts">
  import CarouselBanner from '../components/CarouselBanner.vue'
  const banners = [
    {title: '夏日特賣1', img: '/banner/banner_1.png', url: '/activity?1'},
    {title: '夏日特賣2', img: '/banner/banner_2.png', url: '/activity?2'},
  ]
</script>

<template>
  <div>
    <Carousel-Banner :banner-props="banners"></Carousel-Banner>
  </div>
</template>
