// src/components/ui/date/date.utils.ts

/** Convert local Date to UTC ISO string */
export function toUtcIso(date: Date): string {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  ).toISOString();
}

/** Convert UTC ISO string to local Date */
export function fromUtcIso(iso: string): Date {
  return new Date(iso);
}
