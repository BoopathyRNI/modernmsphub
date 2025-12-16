// src/types/api-error.ts
export interface ApiError {
  status: number;
  code?: string;
  message: string;
  details?: string[];
}
