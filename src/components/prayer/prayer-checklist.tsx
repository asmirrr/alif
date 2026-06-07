"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { PRAYER_LABELS, TRACKABLE_PRAYERS } from "@/lib/mock-data";
import type { PrayerStatus } from "@/types/prayer";

interface PrayerChecklistProps {
  prayers: PrayerStatus;
  onToggle: (prayer: keyof PrayerStatus) => void;
}

export function PrayerChecklist({ prayers, onToggle }: PrayerChecklistProps) {
  return (
    <div className="flex flex-col gap-1">
      {TRACKABLE_PRAYERS.map((name) => (
        <label
          key={name}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-all active:scale-[0.98]"
        >
          <Checkbox
            checked={prayers[name]}
            onCheckedChange={() => onToggle(name)}
          />
          <span className="font-medium">{PRAYER_LABELS[name]}</span>
        </label>
      ))}
    </div>
  );
}
