// src/app/(auth)/signup/page.tsx
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left – Hero */}
      <div className="hidden lg:flex flex-col justify-center bg-slate-50 px-12">
        <h1 className="text-3xl font-semibold mb-4">
          Create your MSPHub account
        </h1>
        <p className="text-slate-600 max-w-md">
          One platform to manage licenses, customers, billing,
          and profitability for your MSP business.
        </p>
      </div>

      {/* Right – Form */}
      <div className="flex items-center justify-center px-6">
        <SignupForm />
      </div>
    </div>
  );
}
