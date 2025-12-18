// src/components/ui/dialog/DialogFooter.tsx

"use client";

interface DialogFooterProps {
  onCancel: () => void;
  onSave: () => void;
  saving?: boolean;
}

export default function DialogFooter({
  onCancel,
  onSave,
  saving,
}: DialogFooterProps) {
  return (
    <div className="flex justify-end gap-2 border-t border-slate-200 px-4 py-3">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 px-4 rounded border border-slate-300 text-sm hover:bg-slate-100"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="h-9 px-4 rounded bg-sky-600 text-white text-sm hover:bg-sky-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
