"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Compass, Library, Search, BookOpen, BookText, BookDashed, BookMarked } from "lucide-react";

const sidebarItems = [
  {
    group: "Navigate",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/explore", label: "Explore", icon: Compass },
      { href: "/library", label: "Library", icon: Library },
      { href: "/search", label: "Search", icon: Search },
    ],
  },
  {
    group: "Library",
    items: [
      { href: "/passage/genesis/1", label: "Genesis", icon: BookOpen },
      { href: "/passage/psalms/1", label: "Psalms", icon: BookText },
      { href: "/passage/isaiah/1", label: "Isaiah", icon: BookDashed },
      { href: "/passage/matthew/1", label: "Matthew", icon: BookMarked },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 flex-shrink-0 border-r border-border bg-surface p-4 lg:block">
      <nav className="space-y-6">
        {sidebarItems.map((group) => (
          <div key={group.group}>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {group.group}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ease-out",
                        pathname === item.href
                          ? "bg-accent-subtle font-medium text-heading"
                          : "text-secondary hover:bg-tag-bg hover:text-heading"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
