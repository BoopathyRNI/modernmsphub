// src/components/ui/date/DateTimePicker.tsx
"use client";

interface DateTimePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DateTimePicker({
  value,
  onChange,
}: DateTimePickerProps) {
  return (
    <input
      type="datetime-local"
      value={
        value
          ? new Date(value.getTime() - value.getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 16)
          : ""
      }
      onChange={(e) =>
        onChange(e.target.value ? new Date(e.target.value) : null)
      }
      className="h-9 rounded border border-slate-300 px-3 text-sm
                 focus:outline-none focus:ring-1 focus:ring-sky-500"
    />
  );
}
