<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const goLogin = () => {
  router.push({ name: 'login', query: { redirect: route.fullPath } })
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="goLogin">login</button>
  </div>
</template>

<style>
</style>
