import { useRouter, useRoute } from "vue-router";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from 'element-plus'

// 建立 axios instance
const api = axios.create({
  baseURL: "https://us-central1-shop-bb95d.cloudfunctions.net",
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});


// response interceptor: 統一處理 error
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // 直接回傳 JSON
  },
  async (error: AxiosError) => {
    const route = useRoute();
    const router = useRouter();
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        ElMessage({
          message: '登入已過期，請重新登入',
          type: 'warning',
        })
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        if (route.meta.requiresAuth) {
          router.push({
            name: "login",
            query: { redirect: route.fullPath }, // 登錄後回到原頁
          });
        }
      } else if (status >= 500) {
        console.error("伺服器異常，請稍後再試");
      }
    // } else if (error.request) {
    //   console.error("網路不穩定，請檢查連線");
    } else {
      console.error("未知錯誤", error.message);
    }

    return Promise.reject(error);
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchFirebase<T = any>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const token = localStorage.getItem("token");
    const response = await api.request<T>({
      method,
      url,
      ...(method === "get" ? { params: data } : { data }),
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        ...config?.headers,
      },
      // headers: {
      //   Authorization: token ? `Bearer ${token}` : "",
      //   ...config?.headers,
      // },
    });
    return response as T;
  } catch (err) {
    throw err;
  }
}
