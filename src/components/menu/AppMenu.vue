<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { UserFilled } from "@element-plus/icons-vue";
import { ShoppingCart } from "@element-plus/icons-vue";

import MenuBranch from "@/components/menu/MenuBranch.vue";
import type { MenuNode } from "@/types";

import { useUserInfoStore } from "@/stores/user";

withDefaults(
  defineProps<{
    items: MenuNode[];
    mode?: "horizontal" | "vertical";
    ellipsis?: boolean;
    loaded?: boolean;
  }>(),
  {
    mode: "horizontal",
    ellipsis: false,
  }
);

const route = useRoute();
const router = useRouter();

const userStore = useUserInfoStore();
const { loginState } = storeToRefs(userStore);

const activePath = computed(() => route.path);

const gotoVipmember = () => {
  router.push("/vip/member");
};
const gotoLogin = () => {
  router.push("/login");
};
const gotoShoppingCart = () => {
  router.push("/shoppingCart");
};
const handleLogout = async () => {
  await userStore.signout();
  const nowPath = route.fullPath;
  router.push(nowPath);
};
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="activePath"
      :mode="mode"
      :ellipsis="ellipsis"
      router
    >
      <MenuBranch :items="items" />
      <template v-if="mode === 'horizontal'">
        <div class="icon">
          <el-popover class="box-item" placement="bottom">
            <template #reference>
              <el-icon
                :size="20"
                :class="{
                  'primary-color active-icon': [
                    '/vip/member',
                    '/login',
                  ].includes(activePath),
                }"
                ><UserFilled
              /></el-icon>
            </template>
            <div class="icon-menu-item">
              <el-button type="info" link bg @click="gotoVipmember"
                >會員中心</el-button
              >
            </div>
            <div class="icon-menu-item" v-show="!loginState">
              <el-button type="info" link bg @click="gotoLogin"
                >登錄/註冊</el-button
              >
            </div>
            <div class="icon-menu-item" v-show="loginState">
              <el-button type="info" link bg @click="handleLogout"
                >登出</el-button
              >
            </div>
          </el-popover>
        </div>
        <div class="icon" @click="gotoShoppingCart">
          <el-icon
            :size="20"
            :class="{ 'primary-color active-icon': activePath === '/shoppingCart' }"
            ><ShoppingCart
          /></el-icon>
        </div>
      </template>
      <el-skeleton v-if="loaded" :rows="6" animated style="margin-top: 8px" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.icon {
  display: flex;
  align-items: center;
  margin: 5px;
  .el-icon {
    width: 100%;
  }
}
.icon-menu-item {
  padding: 5px;
}
.active-icon svg {
  transform: scale(1.2);
}
</style>
