import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp-2GJ11jDMTKbly2lnVhzyS69e6jnVQg",
  authDomain: "shop-bb95d.firebaseapp.com",
  projectId: "shop-bb95d",
  storageBucket: "shop-bb95d.appspot.com",
  messagingSenderId: "91294007698",
  appId: "1:91294007698:web:48b96fff961415e165c14b",
  measurementId: "G-3NVJMS3WXD",
};

const customConfig = {
  storageDomain: "shop-bb95d.firebasestorage.app"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app, customConfig };
export const storage = getStorage(app);
export const auth = getAuth(app);
