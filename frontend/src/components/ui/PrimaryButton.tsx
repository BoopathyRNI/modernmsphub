"use client";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
    >
      {children}
    </button>
  );
}
