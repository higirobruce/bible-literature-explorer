"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/library", label: "Library" },
  { href: "/research", label: "Research" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-lg font-medium text-heading"
        >
          BLE
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

        <button className="text-secondary hover:text-heading transition-colors duration-150 ease-out text-lg">
          &#128269;
        </button>

        <Link
          href="/profile"
          className="text-sm font-medium text-secondary hover:text-heading transition-colors duration-150 ease-out"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
