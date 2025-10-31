<script setup lang="ts">
// import { useRouter, useRoute } from 'vue-router';
// const router = useRouter()
// const route = useRoute()
// const goLogin = () => {
//   router.push({ name: 'login', query: { redirect: route.fullPath } })
// }
</script>

<template>
  <section class="default-example">
    <div class="example-container">
      <div class="left">Left</div>
      <div class="right">Right</div>
    </div>
  </section>
</template>

<style>
section {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.example-container {
  border: 1px solid #c5c5c5;
  padding: 0.75em;
  text-align: left;
  line-height: normal;
}
.left {
  border: solid 10px #ffc129;
  background-color: rgba(81, 81, 81, 0.6);
  padding: 1em;
  float: left;
}
.right {
  border: solid 10px #ffc129;
  background-color: rgba(81, 81, 81, 0.6);
  padding: 1em;
  float: right;
  height: 150px;
}
</style>
