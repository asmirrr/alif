import type { PrayerStatus, PrayerTime } from "@/types/prayer";

function parseTimeToMinutes(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function formatCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

export function getCurrentAndNextPrayer(prayers: PrayerTime[]) {
  const trackable = prayers.filter((p) => p.name !== "sunrise");
  const current = trackable.find((p) => p.isCurrent) ?? trackable[0];
  const next = trackable.find((p) => p.isNext) ?? trackable[1];

  return { current, next };
}

export function getCountdownToNext(
  nextPrayer: PrayerTime,
  currentPrayer: PrayerTime,
  now: Date = new Date(),
): { countdown: string; progress: number } {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const currentMinutes = parseTimeToMinutes(currentPrayer.time);
  const nextMinutes = parseTimeToMinutes(nextPrayer.time);

  let diffMinutes = nextMinutes - nowMinutes;
  if (diffMinutes <= 0) diffMinutes += 24 * 60;

  const totalWindow = nextMinutes - currentMinutes > 0
    ? nextMinutes - currentMinutes
    : nextMinutes - currentMinutes + 24 * 60;

  const elapsed = totalWindow - diffMinutes;
  const progress = Math.min(100, Math.max(0, (elapsed / totalWindow) * 100));

  const totalSeconds = diffMinutes * 60 - now.getSeconds();
  return {
    countdown: formatCountdown(Math.max(0, totalSeconds)),
    progress: Math.round(progress),
  };
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function formatDisplayDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getTodayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function countCompletedPrayers(prayers: PrayerStatus): number {
  return Object.values(prayers).filter(Boolean).length;
}

export function getWeekDayLabels(): string[] {
  return ["M", "T", "W", "T", "F", "S", "S"];
}

export function getWeekDates(reference: Date = new Date()): string[] {
  const day = reference.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(reference);
  monday.setDate(reference.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

export function convert24to12(time24: string): string {
  if (!time24) return "";
  const cleanTime = time24.split(" ")[0];
  const [hourStr, minStr] = cleanTime.split(":");
  let hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);
  if (isNaN(hour) || isNaN(min)) return time24;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  const minFormatted = min.toString().padStart(2, "0");
  return `${hour}:${minFormatted} ${ampm}`;
}

export function getHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number = 21.4225,
  lon2: number = 39.8262,
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getCardinalDirection(degrees: number): string {
  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getPrayerTimesWithCurrentNext(
  prayers: PrayerTime[],
  now: Date = new Date(),
): PrayerTime[] {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Find trackable prayers and parse times in minutes
  const trackable = prayers.filter((p) => p.name !== "sunrise");
  const parsed = trackable.map((p) => ({
    prayer: p,
    minutes: parseTimeToMinutes(p.time),
  }));

  parsed.sort((a, b) => a.minutes - b.minutes);

  let currentIndex = -1;

  for (let i = 0; i < parsed.length; i++) {
    const currentP = parsed[i];
    const nextP = parsed[(i + 1) % parsed.length];

    const currMin = currentP.minutes;
    const nextMin = nextP.minutes;

    if (nextMin < currMin) {
      // Midnight wrap-around (Isha -> Fajr)
      if (nowMinutes >= currMin || nowMinutes < nextMin) {
        currentIndex = i;
        break;
      }
    } else {
      if (nowMinutes >= currMin && nowMinutes < nextMin) {
        currentIndex = i;
        break;
      }
    }
  }

  if (currentIndex === -1) {
    currentIndex = parsed.length - 1; // Default fallback to Isha
  }

  const currentPrayerName = parsed[currentIndex].prayer.name;
  const nextPrayerName =
    parsed[(currentIndex + 1) % parsed.length].prayer.name;

  return prayers.map((p) => ({
    ...p,
    isCurrent: p.name === currentPrayerName,
    isNext: p.name === nextPrayerName,
  }));
}

