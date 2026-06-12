"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { PrayerSchedule, PrayerTime } from "@/types/prayer";
import type { QiblaDirection } from "@/types/qibla";
import {
  convert24to12,
  getHaversineDistanceKm,
  getCardinalDirection,
  getPrayerTimesWithCurrentNext
} from "@/lib/prayer-utils";

export interface LocationState {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  type: "gps" | "manual";
}

export interface CityOption {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const DEFAULT_CITIES: CityOption[] = [
  { city: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { city: "Makkah", country: "Saudi Arabia", latitude: 21.4225, longitude: 39.8262 },
  { city: "Medina", country: "Saudi Arabia", latitude: 24.4672, longitude: 39.6111 },
  { city: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357 },
  { city: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784 },
  { city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
  { city: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { city: "Karachi", country: "Pakistan", latitude: 24.8607, longitude: 67.0011 },
  { city: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456 },
  { city: "Kuala Lumpur", country: "Malaysia", latitude: 3.1390, longitude: 101.6869 },
];

export type LocationStatus = "idle" | "loading_location" | "fetching_api" | "success" | "error";

interface LocationContextType {
  location: LocationState | null;
  status: LocationStatus;
  errorMsg: string | null;
  prayerSchedule: PrayerSchedule | null;
  qibla: QiblaDirection | null;
  detectLocation: () => void;
  selectCity: (city: CityOption) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [prayerSchedule, setPrayerSchedule] = useState<PrayerSchedule | null>(null);
  const [qibla, setQibla] = useState<QiblaDirection | null>(null);

  const fetchPrayerData = useCallback(async (
    lat: number,
    lon: number,
    cityName?: string,
    countryName?: string
  ) => {
    setStatus("fetching_api");
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      
      // 1. Fetch Prayer Times (Method 2: ISNA is the default calculations method)
      const timingsRes = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`
      );
      if (!timingsRes.ok) throw new Error("Failed to fetch prayer times");
      const timingsData = await timingsRes.json();

      // 2. Fetch Qibla bearing
      const qiblaRes = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`);
      if (!qiblaRes.ok) throw new Error("Failed to fetch Qibla direction");
      const qiblaData = await qiblaRes.json();

      // 3. Resolve city and country
      let finalCity = cityName || "";
      let finalCountry = countryName || "";

      if (!finalCity) {
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            finalCity = geoData.city || geoData.locality || geoData.principalSubdivision || "";
            finalCountry = geoData.countryName || "";
          }
        } catch (e) {
          console.error("Reverse geocoding client error, falling back to timezone", e);
        }
      }

      const timezone = timingsData.data.meta.timezone;
      if (!finalCity && timezone) {
        const parts = timezone.split("/");
        finalCity = parts[parts.length - 1].replace(/_/g, " ");
        finalCountry = parts[0] || "";
      }

      if (!finalCity) {
        finalCity = "My Location";
      }

      const apiTimings = timingsData.data.timings;
      const rawPrayers: PrayerTime[] = [
        { name: "fajr", label: "Fajr", time: convert24to12(apiTimings.Fajr) },
        { name: "sunrise", label: "Sunrise", time: convert24to12(apiTimings.Sunrise) },
        { name: "dhuhr", label: "Dhuhr", time: convert24to12(apiTimings.Dhuhr) },
        { name: "asr", label: "Asr", time: convert24to12(apiTimings.Asr) },
        { name: "maghrib", label: "Maghrib", time: convert24to12(apiTimings.Maghrib) },
        { name: "isha", label: "Isha", time: convert24to12(apiTimings.Isha) },
      ];

      // Mark current/next prayers dynamically based on current client time
      const prayers = getPrayerTimesWithCurrentNext(rawPrayers, new Date());

      const schedule: PrayerSchedule = {
        date: timingsData.data.date.readable,
        hijriDate: `${timingsData.data.date.hijri.day} ${timingsData.data.date.hijri.month.en} ${timingsData.data.date.hijri.year}`,
        location: {
          city: finalCity,
          country: finalCountry,
        },
        prayers,
      };

      const distance = getHaversineDistanceKm(lat, lon);
      const qiblaResult: QiblaDirection = {
        degrees: Math.round(qiblaData.data.direction),
        cardinal: getCardinalDirection(qiblaData.data.direction),
        distanceKm: Math.round(distance),
      };

      setPrayerSchedule(schedule);
      setQibla(qiblaResult);
      
      const newLoc: LocationState = {
        city: finalCity,
        country: finalCountry,
        latitude: lat,
        longitude: lon,
        type: cityName ? "manual" : "gps",
      };
      
      setLocation(newLoc);
      localStorage.setItem("alif-location", JSON.stringify(newLoc));
      setStatus("success");
      setErrorMsg(null);
    } catch (err: any) {
      console.error("Error fetching AlAdhan API data:", err);
      setStatus("error");
      setErrorMsg(err.message || "Failed to load prayer schedule");
    }
  }, []);

  const detectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setStatus("error");
      setErrorMsg("location_unavailable");
      return;
    }

    setStatus("loading_location");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchPrayerData(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setStatus("error");
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMsg("location_permission_denied");
        } else {
          setErrorMsg("location_unavailable");
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, [fetchPrayerData]);

  const selectCity = useCallback((cityOption: CityOption) => {
    fetchPrayerData(
      cityOption.latitude,
      cityOption.longitude,
      cityOption.city,
      cityOption.country
    );
  }, [fetchPrayerData]);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("alif-location");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LocationState;
        fetchPrayerData(parsed.latitude, parsed.longitude, parsed.city, parsed.country);
      } catch {
        // Fallback to doing nothing, page will prompt location if needed
      }
    }
  }, [fetchPrayerData]);

  // Periodically update current/next prayers as time ticks
  useEffect(() => {
    if (status !== "success" || !prayerSchedule) return;

    const interval = setInterval(() => {
      const updatedPrayers = getPrayerTimesWithCurrentNext(prayerSchedule.prayers, new Date());
      const hasChanged = updatedPrayers.some((p, i) => {
        const orig = prayerSchedule.prayers[i];
        return p.isCurrent !== orig.isCurrent || p.isNext !== orig.isNext;
      });

      if (hasChanged) {
        setPrayerSchedule((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            prayers: updatedPrayers,
          };
        });
      }
    }, 15000); // check every 15s

    return () => clearInterval(interval);
  }, [status, prayerSchedule]);

  return (
    <LocationContext.Provider
      value={{
        location,
        status,
        errorMsg,
        prayerSchedule,
        qibla,
        detectLocation,
        selectCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
