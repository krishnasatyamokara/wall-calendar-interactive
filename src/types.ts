export interface CalendarNote {
  id: string;
  date: string; // ISO string for the date or 'general' for monthly notes
  content: string;
  createdAt: number;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}
