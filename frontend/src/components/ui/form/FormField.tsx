// src/components/ui/form/FormField.tsx

"use client";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  required,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-600">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children}

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
