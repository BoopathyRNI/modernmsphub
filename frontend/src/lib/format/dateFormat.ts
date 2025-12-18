// src/lib/format/dateFormat.ts

export function formatDateMDY(date: Date | string | null): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  const month = d.getMonth() + 1; // 1–12
  const day = d.getDate();        // 1–31
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}
