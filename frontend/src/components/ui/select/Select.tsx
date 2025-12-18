//src/components/ui/select/Select.tsx

"use client";

import { SelectProps } from "./select.types";

export default function Select<T extends string | number>({
  value,
  options,
  placeholder = "Select",
  disabled,
  onChange,
}: SelectProps<T>) {
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
      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value === "" ? undefined : (e.target.value as T))
        }
        className="
          w-full bg-transparent text-sm text-slate-700
          focus:outline-none
          disabled:cursor-not-allowed
        "
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option
            key={String(opt.value)}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Dropdown icon */}
      <span className="ml-2 text-slate-400 pointer-events-none">▾</span>
    </div>
  );
}
