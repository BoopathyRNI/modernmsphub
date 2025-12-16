// src/components/ui/confirm/useConfirm.ts

import { useConfirmContext } from "./ConfirmProvider";

export function useConfirm() {
  return useConfirmContext().confirm;
}
