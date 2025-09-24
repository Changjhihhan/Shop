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
  const loginState = ref(false); // 是否已登入
  const user = ref<User | null>(null); // 使用者資訊
  const errorMsg = ref(""); // 錯誤訊息

  async function login(email: string, password: string) {
    try {
      const res = await loginWithEmail(email, password);
      user.value = res.user;
      loginState.value = true;
      errorMsg.value = "";

      const token = await res.user.getIdToken();

      const profile: userInfoType = {
        uid: user.value.uid,
        email: user.value.email,
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(profile));

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMsg.value = err.message;
      loginState.value = false;
      return false;
    }
  }

  async function register(email: string, password: string) {
    try {
      const res = await registerWithEmail(email, password);
      user.value = res.user;
      loginState.value = true;
      errorMsg.value = "";

      const token = await res.user.getIdToken();

      const profile: userInfoType = {
        uid: user.value.uid,
        email: user.value.email,
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(profile));

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMsg.value = err.message;
      loginState.value = false;
      return false;
    }
  }

  async function loginGoogle() {
    try {
      const res = await loginWithGoogle();
      user.value = res.user;
      loginState.value = true;
      errorMsg.value = "";

      const token = await res.user.getIdToken();
      const profile: userInfoType = {
        uid: user.value.uid,
        email: user.value.email,
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(profile));
      return true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMsg.value = err.message;
      loginState.value = false;
      return false;
    }
  }

  async function signout() {
    await logout();
    user.value = null;
    loginState.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }

  async function restoreFromLocalStorage() {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");
    if (token && profile) {
      loginState.value = true;
      await getUserInfo()
    }
  }

  return {
    loginState,
    user,
    errorMsg,
    login,
    register,
    loginGoogle,
    signout,
    restoreFromLocalStorage,
  };
});
