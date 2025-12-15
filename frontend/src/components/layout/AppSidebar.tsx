"use client";

import { useState } from "react";
import Image from "next/image";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "/icons/home.svg" },
  { key: "products", label: "Products", icon: "/icons/cubes.svg" },
  { key: "customers", label: "Customers", icon: "/icons/users.svg" },
  { key: "reports", label: "Reports", icon: "/icons/chart.svg" },
];

export default function AppSidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`h-full bg-white border-r border-slate-200
        transition-all duration-200
        ${expanded ? "w-42" : "w-14"}`}
    >
      {/* Toggle button */}
      <div className="flex justify-end px-2 py-2">
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-slate-500 hover:text-slate-700"
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? "⟨" : "⟩"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map(item => (
          <button
            key={item.key}
            title={!expanded ? item.label : undefined}
            className={`
              flex items-center gap-3 h-10 rounded-md
              text-slate-700 hover:bg-slate-100
              px-2
            `}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={18}
              height={18}
            />

            {expanded && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
