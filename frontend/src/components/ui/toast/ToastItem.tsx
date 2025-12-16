// src/components/ui/toast/ToastItem.tsx
import { useEffect } from "react";
import { Toast } from "./toast.types";

const styles = {
  success: "bg-green-50 border-green-400 text-green-800",
  error: "bg-red-50 border-red-400 text-red-800",
  warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  info: "bg-blue-50 border-blue-400 text-blue-800",
};

export default function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration ?? 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`border-l-4 rounded shadow px-4 py-3 bg-white ${
        styles[toast.type]
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          {toast.title && (
            <p className="font-semibold text-sm mb-1">
              {toast.title}
            </p>
          )}
          <p className="text-sm">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
