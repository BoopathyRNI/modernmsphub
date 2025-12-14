export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}
