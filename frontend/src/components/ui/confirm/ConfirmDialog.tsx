// src/components/ui/confirm/ConfirmDialog.tsx

import { ConfirmOptions } from "./confirm.types";

export default function ConfirmDialog({
  options,
  onConfirm,
  onCancel,
}: {
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-full max-w-sm p-5 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">
          {options.title}
        </h2>

        <p className="text-sm text-slate-600 mb-4">
          {options.message}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded border border-slate-300 text-sm"
          >
            {options.cancelText ?? "Cancel"}
          </button>

          <button
            onClick={onConfirm}
            className={`px-3 py-1.5 rounded text-sm text-white
              ${options.danger ? "bg-red-600" : "bg-sky-600"}`}
          >
            {options.confirmText ?? "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
