// src/lib/api/apiClient.ts
import { normalizeApiError } from "./normalizeApiError";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

async function request<T>(
  url: string,
  method: HttpMethod,
  body?: unknown,
  options?: RequestOptions
): Promise<T | void> {
  try {
    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      let errorBody: any = null;
      try {
        errorBody = await res.json();
      } catch {
        // ignore JSON parse failure
      }

      throw normalizeApiError({
        response: {
          status: res.status,
          data: errorBody,
        },
      });
    }

    // No content response (DELETE, etc.)
    if (res.status === 204) {
      return;
    }

    return (await res.json()) as T;
  } catch (error) {
    // Network / unexpected errors
    throw normalizeApiError(error);
  }
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, "GET", undefined, options),

  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, "POST", body, options),

  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, "PUT", body, options),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, "DELETE", undefined, options),
};
