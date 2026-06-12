"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/layout/top-bar";
import { PrayerScheduleList } from "@/components/prayer/prayer-schedule-list";
import { useLocation } from "@/lib/location-context";
import { LocationFallbackScreen, LoadingScreen } from "@/components/prayer/location-fallback-screen";

export default function PrayerTimesPage() {
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

  return (
    <>
      <TopBar
        title="Prayer Times"
        right={
          <Badge variant="secondary">
            {prayerSchedule.location.city}
          </Badge>
        }
      />

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <p className="text-muted-foreground text-sm">{prayerSchedule.date}</p>
        <PrayerScheduleList prayers={prayerSchedule.prayers} />
      </div>
    </>
  );
}
