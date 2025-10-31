import { defineStore } from "pinia";
import { ref } from "vue";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
} from "@/firebase/auth";
import type { User } from "firebase/auth";
import type { userInfoType } from "@/types";
import { getUserInfo } from "@/api/userInfo";

export const useUserInfoStore = defineStore("userInfo", () => {
  const loginState = ref(false);
  const user = ref<userInfoType | null>(null);
  const errorMsg = ref("");

  /** 
   * 共用的登入後流程：儲存 token、拉取使用者資料、同步購物車
   */
  async function handleLoginSuccess(userAuth: User) {
    const token = await userAuth.getIdToken();
    localStorage.setItem("token", token);

    await getUserData();

    errorMsg.value = "";
    loginState.value = true;
  }

  /**
   * 共用的登入流程（封裝 error 處理）
   */
  async function handleAuthAction(action: () => Promise<{ user: User }>) {
    try {
      const res = await action();
      await handleLoginSuccess(res.user);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMsg.value = err.message || "登入失敗";
      loginState.value = false;
      return false;
    }
  }

  async function login(email: string, password: string) {
    return await handleAuthAction(() => loginWithEmail(email, password));
  }

  async function register(email: string, password: string) {
    return await handleAuthAction(() => registerWithEmail(email, password));
  }

  async function loginGoogle() {
    return await handleAuthAction(loginWithGoogle);
  }

  async function signout() {
    await logout();
    user.value = null;
    loginState.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }

  async function getUserData() {
    const token = localStorage.getItem("token");
    if (!token) return;

    loginState.value = true;
    const res = await getUserInfo();
    if (res) user.value = res;
  }

  return {
    loginState,
    user,
    errorMsg,
    login,
    register,
    loginGoogle,
    signout,
    getUserData,
  };
});
