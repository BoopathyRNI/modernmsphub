"use client";

import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="h-14 bg-[#1E73B8] flex items-center justify-between px-4">
      {/* Left: MSPHub Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="MSPHub"
          width={110}
          height={28}
          priority
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button
          title="Notifications"
          className="text-white opacity-80 hover:opacity-100"
        >
          🔔
        </button>

        <button
          title="Cart"
          className="text-white opacity-80 hover:opacity-100"
        >
          🛒
        </button>

        {/* User avatar */}
        <div
          title="Account"
          className="h-8 w-8 rounded-full bg-white text-[#1E73B8] flex items-center justify-center text-sm font-semibold"
        >
          U
        </div>
      </div>
    </header>
  );
}
