import type { DayRecord, PrayerStatus, TrackingData } from "@/types/prayer";
import { mockTrackingSeed } from "@/lib/mock-data";
import { getTodayKey } from "@/lib/prayer-utils";

const STORAGE_KEY = "alif-tracking";

const emptyPrayers = (): PrayerStatus => ({
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
});

function isFullDay(record: DayRecord): boolean {
  return Object.values(record.prayers).every(Boolean);
}

function computeStreak(records: DayRecord[]): { current: number; best: number } {
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const today = getTodayKey();

  let best = 0;
  let running = 0;

  for (const record of sorted) {
    if (isFullDay(record)) {
      running++;
      best = Math.max(best, running);
    } else {
      running = 0;
    }
  }

  let current = 0;
  const descending = [...records].sort((a, b) => b.date.localeCompare(a.date));

  for (const record of descending) {
    if (record.date > today) continue;
    if (record.date === today && !isFullDay(record)) continue;
    if (isFullDay(record)) {
      current++;
    } else if (record.date !== today) {
      break;
    }
  }

  return { current, best };
}

function isValidTrackingData(value: unknown): value is TrackingData {
  if (!value || typeof value !== "object") return false;
  const data = value as TrackingData;
  return Array.isArray(data.records);
}

function seedTrackingData(): TrackingData {
  return {
    records: mockTrackingSeed.records,
    streak: computeStreak(mockTrackingSeed.records),
  };
}

function parseTrackingData(stored: string): TrackingData | null {
  const trimmed = stored.trim();
  if (!trimmed) return null;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (!isValidTrackingData(parsed)) return null;

    return {
      records: parsed.records,
      streak: computeStreak(parsed.records),
    };
  } catch {
    return null;
  }
}

function resetTrackingStorage(): TrackingData {
  const data = seedTrackingData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function loadTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return seedTrackingData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return resetTrackingStorage();
  }

  return parseTrackingData(stored) ?? resetTrackingStorage();
}

export function saveTrackingData(data: TrackingData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTodayRecord(data: TrackingData): DayRecord {
  const today = getTodayKey();
  const existing = data.records.find((r) => r.date === today);
  if (existing) return existing;

  const seed = mockTrackingSeed.records.find((r) => r.date === today);
  return seed ?? { date: today, prayers: emptyPrayers() };
}

export function togglePrayer(
  data: TrackingData,
  prayer: keyof PrayerStatus,
): TrackingData {
  const today = getTodayKey();
  const records = [...data.records];
  const index = records.findIndex((r) => r.date === today);

  if (index >= 0) {
    records[index] = {
      ...records[index],
      prayers: {
        ...records[index].prayers,
        [prayer]: !records[index].prayers[prayer],
      },
    };
  } else {
    records.push({
      date: today,
      prayers: { ...emptyPrayers(), [prayer]: true },
    });
  }

  const updated: TrackingData = {
    records,
    streak: computeStreak(records),
  };

  saveTrackingData(updated);
  return updated;
}

export function getRecordForDate(
  data: TrackingData,
  date: string,
): DayRecord | undefined {
  return data.records.find((r) => r.date === date);
}

const REFLECTION_KEY = "alif-reflection";

export function loadReflection(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(REFLECTION_KEY) ?? "";
}

export function saveReflection(text: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(REFLECTION_KEY, text);
}
