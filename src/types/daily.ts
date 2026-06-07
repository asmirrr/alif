export interface Verse {
  arabic: string;
  translation: string;
  reference: string;
  teaser: string;
}

export interface Reminder {
  title: string;
  body: string;
  teaser: string;
}

export interface DailyContent {
  verse: Verse;
  reminder: Reminder;
  reflectionPrompt: string;
}
