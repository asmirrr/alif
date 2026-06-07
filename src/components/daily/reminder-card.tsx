import { Card, CardContent } from "@/components/ui/card";
import type { Reminder } from "@/types/daily";
import { cn } from "@/lib/utils";

interface ReminderCardProps {
  reminder: Reminder;
  compact?: boolean;
  className?: string;
}

export function ReminderCard({
  reminder,
  compact = false,
  className,
}: ReminderCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
        {reminder.title}
      </p>
      <Card>
        <CardContent className="p-0">
          <p className="text-sm leading-relaxed">
            {compact ? reminder.teaser : reminder.body}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
