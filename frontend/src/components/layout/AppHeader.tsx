"use client";

import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="h-16 bg-[#1E73B8] flex items-center justify-between px-6">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-md px-3 py-1">
          <Image
            src="/logo.png"
            alt="MSPHub"
            width={150}
            height={40}
            priority
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="h-9 w-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-100">
          <Image src="/icons/bell.svg" alt="Notifications" width={18} height={18} />
        </button>

        {/* Cart */}
        <button className="h-9 w-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-100">
          <Image src="/icons/cart.svg" alt="Cart" width={18} height={18} />
        </button>

        {/* User Avatar */}
        <div className="h-9 w-9 rounded-full overflow-hidden border border-white">
          <Image
            src="/Dashboard01.jpg"
            alt="User"
            width={36}
            height={36}
          />
        </div>
      </div>
    </header>
  );
}
