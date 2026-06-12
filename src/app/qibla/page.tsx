"use client";

import { useEffect } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { ThemeToggleClient } from "@/components/layout/theme-toggle-client";
import { QiblaCompass } from "@/components/prayer/qibla-compass";
import { QiblaDirectionCard } from "@/components/prayer/qibla-direction-card";
import { useLocation } from "@/lib/location-context";
import { LocationFallbackScreen, LoadingScreen } from "@/components/prayer/location-fallback-screen";
import { Info } from "lucide-react";

export default function QiblaPage() {
  const {
    status,
    errorMsg,
    qibla,
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

  if (status === "error" || !qibla) {
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
      <TopBar title="Qibla" right={<ThemeToggleClient />} />

      <div className="flex flex-col gap-8 px-4 py-6 md:px-6">
        <QiblaCompass direction={qibla} />
        <QiblaDirectionCard direction={qibla} />
        <div className="flex items-start gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3">
          <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Qibla distance and orientation dynamically computed based on your coordinates.
          </p>
        </div>
      </div>
    </>
  );
}
