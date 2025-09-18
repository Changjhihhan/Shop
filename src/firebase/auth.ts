import { auth } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth"

// Email + 密碼註冊
export async function registerWithEmail(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Email + 密碼登入
export async function loginWithEmail(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Google 登入
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

// 登出
export async function logout() {
  return await signOut(auth);
}

// 取得目前使用者
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
