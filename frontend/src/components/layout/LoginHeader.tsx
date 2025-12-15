// components/layout/AppHeader.tsx
import Image from "next/image";

export default function LoginHeader() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-8 pt-10 pb-8">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="MSP Hub"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Welcome text */}
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold mb-3">Welcome to MSP Hub</h1>
          <p className="text-sm leading-relaxed text-slate-700 mb-4">
            Introducing MSP Hub™, your next-level platform to unlock business potential and
            redefine how clients experience managed services. Streamline operations, boost
            productivity, and deliver exceptional value—all in one place. Work smarter, not
            harder, with tools designed to empower your MSP journey.
          </p>
          <p className="text-xs font-semibold text-slate-800">
            Stay ahead of the competition with intelligent automation and real-time insights.
            <br />
            Transform your service delivery into a seamless, scalable experience that drives growth.
          </p>
        </div>
      </div>
    </header>
  );
}
