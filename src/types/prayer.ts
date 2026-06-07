export type PrayerName =
  | "fajr"
  | "sunrise"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha";

export interface PrayerTime {
  name: PrayerName;
  label: string;
  time: string;
  isCurrent?: boolean;
  isNext?: boolean;
}

export interface PrayerSchedule {
  date: string;
  hijriDate: string;
  location: {
    city: string;
    country: string;
  };
  prayers: PrayerTime[];
}

export interface PrayerStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface DayRecord {
  date: string;
  prayers: PrayerStatus;
}

export interface StreakInfo {
  current: number;
  best: number;
}

export interface TrackingData {
  records: DayRecord[];
  streak: StreakInfo;
}
