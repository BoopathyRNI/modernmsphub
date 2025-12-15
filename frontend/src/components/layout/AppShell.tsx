import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
