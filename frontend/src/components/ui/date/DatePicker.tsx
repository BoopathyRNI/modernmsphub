// src/components/ui/date/DatePicker.tsx
"use client";

interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  disabled,
}: DatePickerProps) {
  return (
    <div
      className={`
        relative inline-flex items-center
        h-9 rounded-md border border-slate-300 bg-white
        px-3
        focus-within:ring-1 focus-within:ring-sky-500
        ${disabled ? "bg-slate-100 opacity-70" : ""}
      `}
    >
      <input
        type="date"
        value={value ? value.toISOString().substring(0, 10) : ""}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        className="
          w-full bg-transparent text-sm text-slate-700
          focus:outline-none
          disabled:cursor-not-allowed
        "
      />

      {/* Optional calendar icon (visual only) */}
      {/* <span className="ml-2 text-slate-400 pointer-events-none">📅</span>*/}
    </div>
  );
}
