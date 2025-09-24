<script setup lang="ts">
import { useUserInfoStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userStore = useUserInfoStore();

const handleLogout = async () => {
  await userStore.signout();
  const nowPath = route.fullPath;
  router.push(nowPath);
};
</script>

<template>
  <button @click="handleLogout">logout</button>
</template>
