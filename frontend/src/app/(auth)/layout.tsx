import LoginHeader from "@/components/layout/LoginHeader";
import LoginFooter from "@/components/layout/LoginFooter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LoginHeader />
      <main className="flex-1 bg-[#dfeefe]">
        {children}
      </main>
      <LoginFooter />
    </div>
  );
}
