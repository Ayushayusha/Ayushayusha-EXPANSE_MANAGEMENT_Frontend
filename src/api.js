

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://expanse-management-backend.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
