// components/auth/LoginHeroSection.tsx
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginHeroSection() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12 flex gap-16 items-start">
      {/* LEFT: Sign in card */}
      <section className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-1">Sign In to your Account</h2>
        <p className="text-xs text-slate-600 mb-6">
          Welcome back! please enter your detail
        </p>

        <LoginForm />
      </section>

      {/* RIGHT: Hero image */}
      <section className="flex-1 flex justify-end">
        <div className="relative w-full max-w-md">
          <Image
            src="/login-illustration.png"
            alt="MSP Hub collaboration illustration"
            width={700}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>
    </div>
  );
}
