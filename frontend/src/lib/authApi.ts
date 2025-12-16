// src/lib/authApi.ts
import { api } from "@/lib/api/apiClient";

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  password: string;
};

export type SignUpResponse = {
  success: boolean;
  message: string;
};

export function signup(
  data: SignUpRequest
): Promise<SignUpResponse | void> {
  return api.post<SignUpResponse>("/auth/signup", data);
}
