import { TopBar } from "@/components/layout/top-bar";
import { VerseCard } from "@/components/daily/verse-card";
import { ReminderCard } from "@/components/daily/reminder-card";
import { ReflectionSection } from "@/components/daily/reflection-section";
import { Separator } from "@/components/ui/separator";
import { mockDailyContent } from "@/lib/mock-data";
import { formatShortDate } from "@/lib/prayer-utils";

export default function DailyPage() {
  return (
    <>
      <TopBar
        title="Daily"
        right={
          <span className="text-muted-foreground text-sm">
            {formatShortDate()}
          </span>
        }
      />

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <p className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-widest">
            Verse of the day
          </p>
          <VerseCard verse={mockDailyContent.verse} />
        </div>

        <Separator />

        <ReminderCard reminder={mockDailyContent.reminder} />

        <Separator />

        <ReflectionSection prompt={mockDailyContent.reflectionPrompt} />
      </div>
    </>
  );
}
