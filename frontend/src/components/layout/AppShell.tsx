import { NavBar } from "./NavBar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <NavBar />
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-20 sm:px-6 md:pb-6 lg:px-8">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
