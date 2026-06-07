import type { QiblaDirection } from "@/types/qibla";

interface QiblaCompassProps {
  direction: QiblaDirection;
}

export function QiblaCompass({ direction }: QiblaCompassProps) {
  const needleRotation = direction.degrees - 90;

  return (
    <div className="relative mx-auto flex size-64 items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-border bg-secondary/50" />
      <div className="absolute inset-4 rounded-full border border-border/60" />

      {(["N", "E", "S", "W"] as const).map((label, i) => {
        const positions = [
          "top-3 left-1/2 -translate-x-1/2",
          "right-3 top-1/2 -translate-y-1/2",
          "bottom-3 left-1/2 -translate-x-1/2",
          "left-3 top-1/2 -translate-y-1/2",
        ];
        return (
          <span
            key={label}
            className={`absolute text-xs font-medium text-muted-foreground ${positions[i]}`}
          >
            {label}
          </span>
        );
      })}

      <div
        className="relative flex size-32 items-center justify-center transition-transform duration-500"
        style={{ transform: `rotate(${needleRotation}deg)` }}
      >
        <div className="absolute h-24 w-1 rounded-full bg-primary/20" />
        <div className="absolute top-2 h-12 w-1.5 rounded-full bg-primary" />
        <div className="absolute bottom-2 h-8 w-1 rounded-full bg-muted-foreground/30" />
        <div className="absolute size-3 rounded-full bg-primary" />
      </div>
    </div>
  );
}
