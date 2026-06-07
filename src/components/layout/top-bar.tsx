import { cn } from "@/lib/utils";

interface TopBarProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
  className?: string;
}

export function TopBar({ left, title, right, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md md:px-6",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        {left ?? (
          title && (
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          )
        )}
      </div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  );
}
