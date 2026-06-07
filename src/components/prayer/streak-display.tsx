import { Card, CardContent } from "@/components/ui/card";
import type { StreakInfo } from "@/types/prayer";

interface StreakDisplayProps {
  streak: StreakInfo;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-0">
        <div>
          <p className="text-muted-foreground text-sm">Streak</p>
          <p className="text-2xl font-semibold">{streak.current} days</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-sm">Best</p>
          <p className="text-2xl font-semibold">{streak.best} days</p>
        </div>
      </CardContent>
    </Card>
  );
}
