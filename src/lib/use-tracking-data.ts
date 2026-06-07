"use client";

import { useCallback, useState } from "react";

import { mockTrackingSeed } from "@/lib/mock-data";
import {
  loadTrackingData,
  togglePrayer as togglePrayerStorage,
} from "@/lib/tracking-storage";
import type { PrayerStatus } from "@/types/prayer";

export function useTrackingData() {
  const [data, setData] = useState(() => {
    try {
      return loadTrackingData();
    } catch {
      return mockTrackingSeed;
    }
  });

  const togglePrayer = useCallback(
    (prayer: keyof PrayerStatus) => {
      const updated = togglePrayerStorage(data, prayer);
      setData(updated);
    },
    [data]
  );

  return { data, togglePrayer };
}