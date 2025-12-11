// components/ui/PrimaryButton.tsx
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type PrimaryButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function PrimaryButton({
  children,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className={
        "h-9 rounded bg-[#0066c5] text-xs font-semibold text-white hover:bg-[#0053a1] " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
