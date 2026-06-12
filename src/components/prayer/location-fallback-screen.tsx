"use client";

import React from "react";
import { Compass, MapPin, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_CITIES, type CityOption } from "@/lib/location-context";

interface LocationFallbackScreenProps {
  errorMsg: string | null;
  onSelectCity: (city: CityOption) => void;
  onRetry: () => void;
}

export function LocationFallbackScreen({
  errorMsg,
  onSelectCity,
  onRetry,
}: LocationFallbackScreenProps) {
  const isPermissionDenied = errorMsg === "location_permission_denied";

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md border-border bg-card shadow-lg">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-accent text-primary">
            <Compass className="size-8 animate-pulse" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Prayer Times Location
          </h2>
          
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {isPermissionDenied
              ? "Location access was denied. Please select your city manually below or adjust your browser permissions."
              : "We couldn't detect your location automatically. Select a major city below or retry detection."}
          </p>

          <Button
            onClick={onRetry}
            className="mt-6 w-full gap-2 font-medium"
            variant="default"
          >
            <Navigation className="size-4" />
            Retry Auto-Detection
          </Button>

          <div className="mt-8 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Or select a city
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
              {DEFAULT_CITIES.map((city) => (
                <button
                  key={city.city}
                  onClick={() => onSelectCity(city)}
                  className="flex items-center justify-start gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-left text-xs font-medium transition-all hover:bg-accent hover:text-accent-foreground hover:border-primary/20"
                >
                  <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                  <div className="truncate">
                    <p className="font-semibold text-foreground">{city.city}</p>
                    <p className="text-[10px] text-muted-foreground">{city.country}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex min-h-[85dvh] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
