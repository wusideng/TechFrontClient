// src/api/apiClient.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axios_config = {
  baseURL: process.env.apiUrl,
  timeout: 20000,
};

// if (isDev) {
//   axios_config.headers = {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//   };
// }
const apiClient = axios.create(axios_config);
// 请求拦截器
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// apiClient.interceptors.response.use(
//   <T>(response: AxiosResponse<T>): T => response.data,
//   (error: any) => Promise.reject(error)
// );
apiClient.interceptors.response.use(
  async <T>(response: AxiosResponse<T>): Promise<T> => {
    return response.data;
  },
  (error: any) => Promise.reject(error)
);
export default {
  // 使用泛型提供类型安全
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.get<T, T>(url, config);
  },

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.post<T, T>(url, data, config);
  },

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.put<T, T>(url, data, config);
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.delete<T, T>(url, config);
  },

  // 如果需要原始apiClient
  client: apiClient,
};
