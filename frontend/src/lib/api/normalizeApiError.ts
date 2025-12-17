// src/lib/api/normalizeApiError.ts
import { ApiError } from "@/types/api-error";

export function normalizeApiError(error: any): ApiError {
  // Already normalized (IMPORTANT)
  if (error?.status && typeof error.status === "number") {
    return error as ApiError;
  }

  // API responded with error status
  if (error?.response) {
    return {
      status: error.response.status,
      code: error.response.data?.code,
      message:
        error.response.data?.message ||
        "Something went wrong",
      details: error.response.data?.details,
    };
  }

  // Native JS / network error
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message || "Unexpected error occurred",
    };
  }

  // Absolute fallback
  return {
    status: 500,
    message: "Unexpected error occurred",
  };
}

