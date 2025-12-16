// src/components/ui/toast/ToastContainer.tsx

import { Toast } from "./toast.types";
import ToastItem from "./ToastItem";

interface Props {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: Props) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-80">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
