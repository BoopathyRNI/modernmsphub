// components/ui/TextFieldWithIcon.tsx
import { ReactNode } from "react";

interface TextFieldWithIconProps {
  label: string;
  type?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function TextFieldWithIcon({
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
}: TextFieldWithIconProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-10 rounded border border-slate-300 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-sky-500
                     focus:border-sky-500
                     ${leftIcon ? "pl-10" : "pl-3"} 
                     ${rightIcon ? "pr-10" : "pr-3"}`}
        />

        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 cursor-pointer">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}
