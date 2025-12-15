"use client";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "products", label: "Products", icon: "📦" },
  { key: "customers", label: "Customers", icon: "👤" },
  { key: "reports", label: "Reports", icon: "📊" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

export default function AppSidebar() {
  return (
    <aside className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4">
      {navItems.map(item => (
        <button
          key={item.key}
          title={item.label}
          className="h-9 w-9 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
}
