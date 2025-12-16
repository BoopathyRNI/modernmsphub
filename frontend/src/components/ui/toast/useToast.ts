// src/components/ui/toast/useToast.ts
import { useToastContext } from "./ToastProvider";
import { ToastType } from "./toast.types";

export function useToast() {
  const { showToast } = useToastContext();

  return {
    success: (message: string, title?: string) =>
      showToast({ type: "success", message, title }),

    error: (message: string, title?: string) =>
      showToast({ type: "error", message, title }),

    warning: (message: string, title?: string) =>
      showToast({ type: "warning", message, title }),

    info: (message: string, title?: string) =>
      showToast({ type: "info", message, title }),
  };
}
