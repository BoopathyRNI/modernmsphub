// app/(auth)/login/page.tsx
import LoginHeroSection from "@/components/auth/LoginHeroSection";
import LoginHeader from "@/components/layout/LoginHeader";
import LoginFooter from "@/components/layout/LoginFooter";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <LoginHeader />
      <main className="flex-1 bg-[#dfeefe]">
        <LoginHeroSection />
      </main>
      <LoginFooter />
    </div>
  );
}
