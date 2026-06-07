import { TopBar } from "@/components/layout/top-bar";
import { ThemeToggleClient } from "@/components/layout/theme-toggle-client";
import { QiblaCompass } from "@/components/prayer/qibla-compass";
import { QiblaDirectionCard } from "@/components/prayer/qibla-direction-card";
import { mockQibla } from "@/lib/mock-data";
import { Info } from "lucide-react";

export default function QiblaPage() {
  return (
    <>
      <TopBar title="Qibla" right={<ThemeToggleClient />} />

      <div className="flex flex-col gap-8 px-4 py-6 md:px-6">
        <QiblaCompass direction={mockQibla} />
        <QiblaDirectionCard direction={mockQibla} />
        <div className="flex items-start gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3">
          <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Compass uses device sensors in a future update.
          </p>
        </div>
      </div>
    </>
  );
}
