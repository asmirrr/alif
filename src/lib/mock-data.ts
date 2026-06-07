import type { DailyContent } from "@/types/daily";
import type { QiblaDirection } from "@/types/qibla";
import type { PrayerSchedule, TrackingData } from "@/types/prayer";

export const mockSchedule: PrayerSchedule = {
  date: "Sunday, 7 June 2026",
  hijriDate: "15 Ramadan 1447",
  location: {
    city: "London",
    country: "UK",
  },
  prayers: [
    { name: "fajr", label: "Fajr", time: "4:12 AM" },
    { name: "sunrise", label: "Sunrise", time: "5:48 AM" },
    { name: "dhuhr", label: "Dhuhr", time: "12:58 PM" },
    { name: "asr", label: "Asr", time: "4:32 PM", isCurrent: true },
    { name: "maghrib", label: "Maghrib", time: "7:46 PM", isNext: true },
    { name: "isha", label: "Isha", time: "9:12 PM" },
  ],
};

export const mockDailyContent: DailyContent = {
  verse: {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    reference: "Ash-Sharh 94:6",
    teaser: "Indeed, with hardship comes ease.",
  },
  reminder: {
    title: "Reminder",
    body: "Take a moment before Dhuhr to pause and breathe.",
    teaser: "Start your day with dhikr.",
  },
  reflectionPrompt: "What are you grateful for today?",
};

export const mockQibla: QiblaDirection = {
  degrees: 118,
  cardinal: "Southeast",
  distanceKm: 4902,
};

export const mockTrackingSeed: TrackingData = {
  streak: {
    current: 12,
    best: 21,
  },
  records: [
    { date: "2026-06-01", prayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true } },
    { date: "2026-06-02", prayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true } },
    { date: "2026-06-03", prayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: false } },
    { date: "2026-06-04", prayers: { fajr: true, dhuhr: true, asr: true, maghrib: false, isha: false } },
    { date: "2026-06-05", prayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true } },
    { date: "2026-06-06", prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false } },
    { date: "2026-06-07", prayers: { fajr: true, dhuhr: true, asr: false, maghrib: false, isha: false } },
  ],
};

export const TRACKABLE_PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;

export const PRAYER_LABELS: Record<(typeof TRACKABLE_PRAYERS)[number], string> = {
  fajr: "Fajr",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};
