import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PrayerTime } from "@/types/prayer";

interface CurrentPrayerCardProps {
  prayer: PrayerTime;
}

export function CurrentPrayerCard({ prayer }: CurrentPrayerCardProps) {
  return (
    <Card className="border-primary/20 bg-accent">
      <CardContent className="flex flex-col gap-1 p-0">
        <Badge variant="accent" className="w-fit text-[10px] uppercase tracking-widest">
          Now
        </Badge>
        <p className="text-3xl font-semibold tracking-tight">{prayer.label}</p>
        <p className="text-muted-foreground text-lg">{prayer.time}</p>
      </CardContent>
    </Card>
  );
}
