// app/(auth)/login/page.tsx
import LoginHeroSection from "@/components/auth/LoginHeroSection";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <AppHeader />
      <main className="flex-1 bg-[#dfeefe]">
        <LoginHeroSection />
      </main>
      <AppFooter />
    </div>
  );
}
