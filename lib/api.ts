// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // example: http://localhost:5000/api
  withCredentials: true, // if you plan to use cookies (optional for now)
});

export default api;
