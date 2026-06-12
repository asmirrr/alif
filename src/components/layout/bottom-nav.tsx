"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Home,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/prayer-times", label: "Times", icon: Clock },
  { href: "/qibla", label: "Qibla", icon: Compass },
  { href: "/prayer-tracking", label: "Track", icon: CheckCircle2 },
  { href: "/daily", label: "Daily", icon: BookOpen },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/90 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", isActive && "stroke-[2.5]")} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:w-56 md:flex-col md:border-r md:border-border/60 md:bg-background md:px-3 md:py-6">
        <div className="mb-8 px-3">
          <span className="text-xl font-semibold tracking-tight text-primary">
            Alif
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
