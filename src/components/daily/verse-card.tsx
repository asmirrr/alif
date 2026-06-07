import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Verse } from "@/types/daily";
import { cn } from "@/lib/utils";

interface VerseCardProps {
  verse: Verse;
  compact?: boolean;
  className?: string;
}

export function VerseCard({ verse, compact = false, className }: VerseCardProps) {
  if (compact) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
          Verse
        </p>
        <Card>
          <CardContent className="flex flex-col gap-3 p-0">
            <p className="text-sm leading-relaxed">&ldquo;{verse.teaser}&rdquo;</p>
            <p className="text-muted-foreground text-xs">— {verse.reference}</p>
            <Button variant="link" className="h-auto justify-end p-0" asChild>
              <Link href="/daily">
                Read more
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-4 p-0">
        <p className="font-arabic text-right text-2xl leading-loose" dir="rtl" lang="ar">
          {verse.arabic}
        </p>
        <p className="text-sm leading-relaxed">&ldquo;{verse.translation}&rdquo;</p>
        <p className="text-muted-foreground text-sm">— {verse.reference}</p>
      </CardContent>
    </Card>
  );
}
