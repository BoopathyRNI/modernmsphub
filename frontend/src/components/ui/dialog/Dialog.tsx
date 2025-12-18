"use client";

interface DialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({
  open,
  title,
  onClose,
  children,
}: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop (NO auto-close) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Dialog panel */}
      <div className="relative w-full max-w-md bg-white rounded-md shadow-lg">
        {/* Header */}
        {title && (
          <div className="border-b border-slate-200 px-4 py-3 font-semibold">
            {title}
          </div>
        )}

        {/* Body */}
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
