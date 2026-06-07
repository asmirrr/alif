import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/layout/top-bar";
import { PrayerScheduleList } from "@/components/prayer/prayer-schedule-list";
import { mockSchedule } from "@/lib/mock-data";

export default function PrayerTimesPage() {
  return (
    <>
      <TopBar
        title="Prayer Times"
        right={
          <Badge variant="secondary">
            {mockSchedule.location.city}
          </Badge>
        }
      />

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <p className="text-muted-foreground text-sm">{mockSchedule.date}</p>
        <PrayerScheduleList prayers={mockSchedule.prayers} />
      </div>
    </>
  );
}
