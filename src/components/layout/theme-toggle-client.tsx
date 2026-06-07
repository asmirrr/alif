"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useIsClient } from "@/lib/use-client-storage";

export function ThemeToggleClient() {
  const isClient = useIsClient();

  if (!isClient) {
    return <div className="size-9" />;
  }

  return <ThemeToggle />;
}
