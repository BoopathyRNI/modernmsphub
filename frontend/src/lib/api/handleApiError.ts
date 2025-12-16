// src/lib/api/handleApiError.ts
import { ApiError } from "@/types/api-error";

type ToastApi = {
  error: (message: string) => void;
};

export function handleApiError(
  error: unknown,
  toast: ToastApi
) {
  const err = error as ApiError;

  if (!err || typeof err !== "object") {
    toast.error("Unexpected error occurred. Either API server is down or request count not be processed!");
    return;
  }

  switch (err.status) {
    case 400:
      toast.error(err.message || "Invalid request");
      break;

    case 401:
      toast.error("Session expired. Please login again.");
      break;

    case 403:
      toast.error("You don’t have permission to perform this action.");
      break;

    case 404:
      toast.error("Requested resource not found.");
      break;

    case 409:
      toast.error(err.message || "Conflict occurred");
      break;

    default:
      toast.error(err.message || "Something went wrong");
      break;
  }
}
