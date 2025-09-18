<script setup lang="ts">
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const userStore = useUserInfoStore();

const email = ref("");
const password = ref("");

// Email 登入
const handleLogin = async () => {
  await userStore.login(email.value, password.value);
};

// 註冊
const handleRegister = async () => {
  await userStore.register(email.value, password.value);
};

// Google 登入
const handleGoogleLogin = async () => {
  const success = await userStore.loginGoogle();
  if (success) {
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  }
};

// 登出
// const handleLogout = async () => {
//   await userStore.signout();
// };
</script>

<template>
  <div class="login-page">
    <h2>登入系統</h2>

    <!-- 如果未登入 -->
    <div>
      <input v-model="email" type="email" placeholder="輸入 Email" />
      <input v-model="password" type="password" placeholder="輸入密碼" />

      <div class="btn-group">
        <button @click="handleLogin">Email 登入</button>
        <button @click="handleRegister">註冊</button>
        <button @click="handleGoogleLogin">Google 登入</button>
      </div>

      <!-- <p v-if="userStore.errorMsg" style="color:red">
        {{ userStore.errorMsg }}
      </p> -->
    </div>

    <!-- 如果已登入 -->
    <!-- <div v-else>
      <p>👤 歡迎：{{ userStore.user?.email }}</p>
      <button @click="handleLogout">登出</button>
    </div> -->
  </div>
</template>

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
input {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  font-size: 14px;
}
button {
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>
