"use client";

import { ReactNode, useState } from "react";

interface TextFieldWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function TextFieldWithIcon({
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  className,
  ...inputProps
}: TextFieldWithIconProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          {...inputProps}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`w-full h-10 rounded border border-slate-300 text-sm
            focus:outline-none focus:ring-2 focus:ring-sky-500
            focus:border-sky-500
            ${leftIcon ? "pl-10" : "pl-3"}
            ${rightIcon || isPassword ? "pr-10" : "pr-3"}
            ${className ?? ""}`}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-[11px] text-slate-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}

        {/* Optional right icon (used in LoginForm) */}
        {!isPassword && rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 cursor-pointer">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}
