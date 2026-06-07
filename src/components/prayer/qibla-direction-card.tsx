import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QiblaDirection } from "@/types/qibla";

interface QiblaDirectionCardProps {
  direction: QiblaDirection;
}

export function QiblaDirectionCard({ direction }: QiblaDirectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Qibla direction</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-0 pt-0">
        <p className="text-2xl font-semibold tracking-tight">
          {direction.degrees}° · {direction.cardinal}
        </p>
        <p className="text-muted-foreground text-sm">
          ~{direction.distanceKm.toLocaleString()} km to Makkah
        </p>
      </CardContent>
    </Card>
  );
}
