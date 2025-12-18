// src/components/ui/date/DateRangePicker.tsx
"use client";

import DatePicker from "./DatePicker";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangePicker({
  value,
  onChange,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <DatePicker
        value={value.from}
        onChange={(from) => onChange({ ...value, from })}
      />
      <span className="text-slate-500">to</span>
      <DatePicker
        value={value.to}
        onChange={(to) => onChange({ ...value, to })}
        minDate={
          value.from ? value.from.toISOString().substring(0, 10) : undefined
        }
      />
    </div>
  );
}
