// axiosInstance.ts
import axios from "axios";
import common from "../utils/common"; // where you already set/get blog_user cookie

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const savedAuth = common.getCookie("blog_user");
    const token = savedAuth ? JSON.parse(savedAuth)?.accessToken : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Logging out...");
      // redirect to login if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
