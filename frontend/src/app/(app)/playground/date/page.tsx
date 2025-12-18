// src/app/(app)/playground/date/page.tsx
"use client";

import { useState } from "react";
import {
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  toUtcIso,
} from "@/components/ui/date";
import { formatDateMDY } from "@/lib/format/dateFormat";

export default function DatePlaygroundPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [range, setRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-2xl font-semibold">Date Components</h1>

      {/* ---------------- Date Picker ---------------- */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium">Date Picker</h3>

        <DatePicker value={date} onChange={setDate} />

        {date && (
          <div className="text-xs text-slate-600 space-y-1">
            <div>
              <strong>Display (M/d/YYYY):</strong> {formatDateMDY(date)}
            </div>
            <div>
              <strong>Local Date:</strong> {formatDateMDY(date)}
            </div>
            <div>
              <strong>UTC ISO (DB):</strong> {formatDateMDY(toUtcIso(date))}
            </div>
          </div>
        )}
      </section>

      {/* ---------------- Date Range Picker ---------------- */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium">Date Range Picker</h3>

        <DateRangePicker value={range} onChange={setRange} />

        {range.from && range.to && (
          <div className="text-xs text-slate-600 space-y-1">
            <div>
              <strong>Display:</strong> {formatDateMDY(range.from)} →{" "}
              {formatDateMDY(range.to)}
            </div>
            <div>
              <strong>From (UTC):</strong> {formatDateMDY(toUtcIso(range.from))}
            </div>
            <div>
              <strong>To (UTC):</strong> {formatDateMDY(toUtcIso(range.to))}
            </div>
          </div>
        )}
      </section>

      {/* ---------------- Date Time Picker ---------------- */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium">DateTime Picker</h3>

        <DateTimePicker value={dateTime} onChange={setDateTime} />

        {dateTime && (
          <div className="text-xs text-slate-600 space-y-1">
            <div>
              <strong>Display (M/d/YYYY):</strong> {formatDateMDY(dateTime)}
            </div>
            <div>
              <strong>Local DateTime:</strong> {formatDateMDY(dateTime)}
            </div>
            <div>
              <strong>UTC ISO (DB):</strong> {formatDateMDY(toUtcIso(dateTime))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
