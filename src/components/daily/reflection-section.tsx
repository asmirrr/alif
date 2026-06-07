"use client";

import { Textarea } from "@/components/ui/textarea";
import { saveReflection } from "@/lib/tracking-storage";
import { useIsClient, useLocalStorageValue } from "@/lib/use-client-storage";

interface ReflectionSectionProps {
  prompt: string;
}

export function ReflectionSection({ prompt }: ReflectionSectionProps) {
  const isClient = useIsClient();
  const storedText = useLocalStorageValue("alif-reflection");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
        Reflection
      </p>
      <p className="text-sm font-medium">{prompt}</p>
      <Textarea
        key={isClient ? "client" : "server"}
        defaultValue={storedText}
        onChange={(e) => saveReflection(e.target.value)}
        placeholder="Write your thoughts..."
      />
    </div>
  );
}
