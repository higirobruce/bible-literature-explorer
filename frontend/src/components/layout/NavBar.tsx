"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Search, User, BookOpen, LogOut } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/library", label: "Library" },
  { href: "/research", label: "Research" },
];

export function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-medium text-heading"
        >
          <BookOpen className="h-5 w-5 text-accent" />
          <span>BLE</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-150 ease-out",
                pathname === item.href
                  ? "text-heading border-b-2 border-accent pb-0.5"
                  : "text-secondary hover:text-heading"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <Link
          href="/search"
          className="text-secondary hover:text-heading transition-colors duration-150 ease-out"
        >
          <Search className="h-4 w-4" />
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-heading transition-colors duration-150 ease-out"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{session.user.name ?? "Profile"}</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="text-muted hover:text-heading transition-colors duration-150 ease-out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-heading transition-colors duration-150 ease-out"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
}
