"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: "&#8962;" },
  { href: "/explore", label: "Explore", icon: "&#127758;" },
  { href: "/search", label: "Search", icon: "&#128269;" },
  { href: "/library", label: "Library", icon: "&#128218;" },
  { href: "/profile", label: "Profile", icon: "&#128100;" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors duration-150 ease-out",
              pathname === item.href
                ? "text-accent"
                : "text-muted hover:text-secondary"
            )}
          >
            <span
              className="text-lg leading-none"
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
