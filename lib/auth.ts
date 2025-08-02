// lib/auth.ts
import api from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await api.post("/user", data);
};
