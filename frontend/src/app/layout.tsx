import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "MSP Hub",
    template: "%s | MSP Hub",
  },
  description: "Modern MSP management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}
        </ToastProvider>
        </body>
    </html>
  );
}
