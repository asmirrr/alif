"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return (
      <div className="min-h-dvh bg-background w-full overflow-x-hidden">
        <main className={cn("w-full min-h-dvh", className)}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="md:flex md:min-h-dvh">
        <BottomNav />
        <main
          className={cn(
            "mx-auto w-full max-w-[480px] pb-24 md:ml-56 md:max-w-none md:flex-1 md:pb-8",
            className,
          )}
        >
          <div className="md:mx-auto md:max-w-[480px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
