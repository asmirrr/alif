"use client";

import { Flame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/layout/top-bar";
import { PrayerChecklist } from "@/components/prayer/prayer-checklist";
import { WeeklyOverview } from "@/components/prayer/weekly-overview";
import { StreakDisplay } from "@/components/prayer/streak-display";
import { getTodayRecord } from "@/lib/tracking-storage";
import { countCompletedPrayers } from "@/lib/prayer-utils";
import { useTrackingData } from "@/lib/use-tracking-data";
import { Separator } from "@/components/ui/separator";

export default function PrayerTrackingPage() {
  const { data, togglePrayer } = useTrackingData();
  const todayRecord = getTodayRecord(data);
  const completed = countCompletedPrayers(todayRecord.prayers);

  return (
    <>
      <TopBar
        title="Tracking"
        right={
          <Badge variant="accent" className="gap-1">
            <Flame className="size-3" />
            {data.streak.current} days
          </Badge>
        }
      />

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <p className="text-muted-foreground mb-3 text-sm">Today</p>
          <PrayerChecklist
            prayers={todayRecord.prayers}
            onToggle={togglePrayer}
          />
          <p className="text-muted-foreground mt-3 text-sm">
            {completed} of 5 completed
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-muted-foreground mb-3 text-sm">This week</p>
          <WeeklyOverview data={data} />
        </div>

        <StreakDisplay streak={data.streak} />
      </div>
    </>
  );
}
