"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    group: "Navigate",
    items: [
      { href: "/", label: "Home" },
      { href: "/explore", label: "Explore" },
      { href: "/library", label: "Library" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    group: "Library",
    items: [
      { href: "/passage/genesis/1", label: "Genesis" },
      { href: "/passage/psalms/1", label: "Psalms" },
      { href: "/passage/isaiah/1", label: "Isaiah" },
      { href: "/passage/matthew/1", label: "Matthew" },
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
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ease-out",
                      pathname === item.href
                        ? "bg-accent-subtle font-medium text-heading"
                        : "text-secondary hover:bg-tag-bg hover:text-heading"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
