"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "/icons/home.svg",
    href: "/dashboard",
  },
  {
    key: "products",
    label: "Products",
    icon: "/icons/cubes.svg",
    href: "/products",
  },
  {
    key: "customers",
    label: "Customers",
    icon: "/icons/users.svg",
    href: "/customers",
  },
  {
    key: "reports",
    label: "Reports",
    icon: "/icons/chart.svg",
    href: "/reports",
  },
];

export default function AppSidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`h-full bg-white border-r border-slate-200
        transition-all duration-200
        ${expanded ? "w-44" : "w-14"}`}
    >
      {/* Toggle */}
      <div className="flex justify-end px-2 py-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-slate-500 hover:text-slate-700"
        >
          {expanded ? "⟨" : "⟩"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              title={!expanded ? item.label : undefined}
              className={`
                flex items-center gap-3 h-10 rounded-md px-2
                text-slate-700 hover:bg-slate-100
                ${active ? "bg-slate-100 font-semibold" : ""}
              `}
            >
              <Image src={item.icon} alt={item.label} width={18} height={18} />

              {expanded && (
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
