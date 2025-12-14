import { apiPost } from "./api";

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

export async function signup(data: SignUpRequest): Promise<SignUpResponse> {
  return apiPost<SignUpRequest, SignUpResponse>(
    "/auth/signup",
    data
  );
}
