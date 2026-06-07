import { cn } from "@/lib/utils";
import type { PrayerTime } from "@/types/prayer";

interface PrayerRowProps {
  prayer: PrayerTime;
}

export function PrayerRow({ prayer }: PrayerRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border px-5 py-4 transition-colors",
        prayer.isCurrent
          ? "border-primary/30 bg-accent"
          : "border-border bg-card",
      )}
    >
      <div className="flex items-center gap-2">
        {prayer.isCurrent && (
          <span className="size-2 rounded-full bg-primary" />
        )}
        <span
          className={cn(
            "font-medium",
            prayer.isCurrent && "text-accent-foreground",
          )}
        >
          {prayer.label}
        </span>
      </div>
      <span className="text-muted-foreground tabular-nums">{prayer.time}</span>
    </div>
  );
}
