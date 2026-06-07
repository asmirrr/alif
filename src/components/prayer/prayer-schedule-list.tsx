import type { PrayerTime } from "@/types/prayer";
import { PrayerRow } from "@/components/prayer/prayer-row";

interface PrayerScheduleListProps {
  prayers: PrayerTime[];
}

export function PrayerScheduleList({ prayers }: PrayerScheduleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {prayers.map((prayer) => (
        <PrayerRow key={prayer.name} prayer={prayer} />
      ))}
    </div>
  );
}
