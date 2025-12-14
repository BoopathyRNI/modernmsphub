export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}
