import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

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
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // token 過期 → 重新導向登入
        console.warn("登入已過期，請重新登入");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      } else if (status >= 500) {
        console.error("伺服器異常，請稍後再試");
      }
    } else if (error.request) {
      console.error("網路不穩定，請檢查連線");
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
    const response = await api.request<T>({
      method,
      url,
      ...(method === "get" ? { params: data } : { data }),
      ...config,
    });
    return response as T;
  } catch (err) {
    throw err;
  }
}
