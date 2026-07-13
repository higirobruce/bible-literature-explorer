import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <NavBar />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-20 md:pb-6 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
