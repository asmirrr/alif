"use client";

import { useSyncExternalStore } from "react";

export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useLocalStorageValue(key: string, fallback = ""): string {
  return useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem(key) ?? fallback,
    () => fallback,
  );
}
