import axios from "axios"

export const api = axios.create({
  baseURL: "https://my.api",
  timeout: 5000
})

// 攔截錯誤
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "伺服器錯誤"
    return Promise.reject({ message, status: err.response?.status })
  }
)