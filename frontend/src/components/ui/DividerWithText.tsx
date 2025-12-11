// components/ui/DividerWithText.tsx
interface DividerWithTextProps {
  text: string;
  className?: string;
}

export default function DividerWithText({ text, className = "" }: DividerWithTextProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="flex-1 h-px bg-slate-200" />
      <span className="px-3 text-[11px] text-slate-500">
        {text}
      </span>
      <span className="flex-1 h-px bg-slate-200" />
    </div>
  );
}
