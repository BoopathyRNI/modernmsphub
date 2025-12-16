// src/app/AppProviders.tsx

"use client";

import ClientOnly from "@/components/ui/ClientOnly";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { ConfirmProvider } from "@/components/ui/confirm/ConfirmProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <ToastProvider>
        <ConfirmProvider>
          {children}
        </ConfirmProvider>
      </ToastProvider>
    </ClientOnly>
  );
}


