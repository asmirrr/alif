import { TopBar } from "@/components/layout/top-bar";
import { ThemeToggleClient } from "@/components/layout/theme-toggle-client";
import { CurrentPrayerCard } from "@/components/prayer/current-prayer-card";
import { NextPrayerCountdown } from "@/components/prayer/next-prayer-countdown";
import { VerseCard } from "@/components/daily/verse-card";
import { ReminderCard } from "@/components/daily/reminder-card";
import { mockDailyContent, mockSchedule } from "@/lib/mock-data";
import { getCurrentAndNextPrayer, getGreeting } from "@/lib/prayer-utils";

export default function HomePage() {
  const { current, next } = getCurrentAndNextPrayer(mockSchedule.prayers);

  return (
    <>
      <TopBar
        left={
          <div>
            <p className="text-lg font-semibold tracking-tight">
              As-salamu alaykum
            </p>
            <p className="text-muted-foreground text-sm">
              {getGreeting()} · {mockSchedule.hijriDate}
            </p>
          </div>
        }
        right={<ThemeToggleClient />}
      />

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <CurrentPrayerCard prayer={current} />
        <NextPrayerCountdown nextPrayer={next} currentPrayer={current} />
        <VerseCard verse={mockDailyContent.verse} compact />
        <ReminderCard reminder={mockDailyContent.reminder} compact />
      </div>
    </>
  );
}
