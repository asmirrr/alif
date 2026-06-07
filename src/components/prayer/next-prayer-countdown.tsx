"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PrayerTime } from "@/types/prayer";
import { getCountdownToNext } from "@/lib/prayer-utils";

interface NextPrayerCountdownProps {
  nextPrayer: PrayerTime;
  currentPrayer: PrayerTime;
}

export function NextPrayerCountdown({
  nextPrayer,
  currentPrayer,
}: NextPrayerCountdownProps) {
  const [countdown, setCountdown] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const result = getCountdownToNext(nextPrayer, currentPrayer);
      setCountdown(result.countdown);
      setProgress(result.progress);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextPrayer, currentPrayer]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            Next · {nextPrayer.label}
          </p>
          <p className="font-mono text-sm font-medium">{countdown}</p>
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
