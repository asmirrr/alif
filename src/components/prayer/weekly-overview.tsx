"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { TrackingData } from "@/types/prayer";
import {
  countCompletedPrayers,
  getWeekDates,
  getWeekDayLabels,
} from "@/lib/prayer-utils";
import { getRecordForDate } from "@/lib/tracking-storage";
import { cn } from "@/lib/utils";

interface WeeklyOverviewProps {
  data: TrackingData;
}

export function WeeklyOverview({ data }: WeeklyOverviewProps) {
  const weekDates = getWeekDates();
  const dayLabels = getWeekDayLabels();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="mb-4 flex justify-between">
          {dayLabels.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex-1 text-center text-xs font-medium text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mb-3 flex justify-between">
          {weekDates.map((date) => {
            const record = getRecordForDate(data, date);
            const completed = record
              ? countCompletedPrayers(record.prayers)
              : 0;
            const isToday = date === today;
            const isFuture = date > today;

            return (
              <div key={date} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={cn(
                    "size-3 rounded-full",
                    isFuture && "bg-secondary",
                    !isFuture && completed === 5 && "bg-primary",
                    !isFuture && completed > 0 && completed < 5 && "bg-primary/40",
                    !isFuture && completed === 0 && "bg-border",
                    isToday && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                  )}
                />
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {isFuture ? "–" : completed}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
