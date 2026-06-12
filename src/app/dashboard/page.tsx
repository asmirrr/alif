"use client";

import { useEffect } from "react";
import { useLocation } from "@/lib/location-context";
import { TopBar } from "@/components/layout/top-bar";
import { ThemeToggleClient } from "@/components/layout/theme-toggle-client";
import { CurrentPrayerCard } from "@/components/prayer/current-prayer-card";
import { NextPrayerCountdown } from "@/components/prayer/next-prayer-countdown";
import { VerseCard } from "@/components/daily/verse-card";
import { ReminderCard } from "@/components/daily/reminder-card";
import { LocationFallbackScreen, LoadingScreen } from "@/components/prayer/location-fallback-screen";
import { SuggestionsForm } from "@/components/suggestions-form";
import { mockDailyContent } from "@/lib/mock-data";
import { getCurrentAndNextPrayer, getGreeting } from "@/lib/prayer-utils";

export default function DashboardPage() {
  const {
    status,
    errorMsg,
    prayerSchedule,
    detectLocation,
    selectCity,
  } = useLocation();

  // If status is idle, trigger auto detection
  useEffect(() => {
    if (status === "idle") {
      detectLocation();
    }
  }, [status, detectLocation]);

  if (status === "loading_location") {
    return <LoadingScreen message="Detecting location..." />;
  }

  if (status === "fetching_api") {
    return <LoadingScreen message="Loading prayer times..." />;
  }

  if (status === "error" || !prayerSchedule) {
    return (
      <LocationFallbackScreen
        errorMsg={errorMsg}
        onSelectCity={selectCity}
        onRetry={detectLocation}
      />
    );
  }

  const { current, next } = getCurrentAndNextPrayer(prayerSchedule.prayers);

  return (
    <>
      <TopBar
        left={
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground leading-tight">
              As-salamu alaykum
            </h1>
            <p className="text-muted-foreground text-xs">
              {getGreeting()} · {prayerSchedule.hijriDate}
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
        <SuggestionsForm />
      </div>
    </>
  );
}
