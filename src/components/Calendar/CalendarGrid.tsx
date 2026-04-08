import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  addMonths,
  subMonths,
  isToday
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "@/src/types";
import { motion } from "motion/react";

interface CalendarGridProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function CalendarGrid({ currentDate, onDateChange, range, onRangeChange }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const handleDateClick = (day: Date) => {
    if (!range.start || (range.start && range.end)) {
      onRangeChange({ start: day, end: null });
    } else {
      if (day < range.start) {
        onRangeChange({ start: day, end: range.start });
      } else {
        onRangeChange({ start: range.start, end: day });
      }
    }
  };

  const isInRange = (day: Date) => {
    if (range.start && range.end) {
      return isWithinInterval(day, { start: range.start, end: range.end });
    }
    return false;
  };

  const isStart = (day: Date) => range.start && isSameDay(day, range.start);
  const isEnd = (day: Date) => range.end && isSameDay(day, range.end);

  return (
    <div className="p-6 md:p-8 bg-calendar-paper flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <p className="text-sm text-calendar-muted">Select a range to add notes</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
            className="rounded-full px-4 text-xs font-bold uppercase tracking-widest hover:bg-calendar-accent hover:text-white transition-colors"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateChange(subMonths(currentDate, 1))}
            className="rounded-full hover:bg-calendar-accent hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateChange(addMonths(currentDate, 1))}
            className="rounded-full hover:bg-calendar-accent hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-bold uppercase tracking-widest text-calendar-muted py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-calendar-border border border-calendar-border rounded-lg overflow-hidden shadow-sm">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const active = isInRange(day);
          const start = isStart(day);
          const end = isEnd(day);
          const today = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={cn(
                "calendar-day relative flex flex-col items-center justify-center p-2 transition-all group",
                isCurrentMonth ? "bg-white text-calendar-ink" : "bg-zinc-50 text-zinc-300",
                active && !start && !end && "bg-calendar-accent/10",
                (start || end) && "bg-calendar-accent text-white z-10",
                !active && isCurrentMonth && "hover:bg-zinc-50"
              )}
            >
              {today && !start && !end && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-calendar-accent" />
              )}
              
              <span className={cn(
                "text-sm font-medium",
                (start || end) ? "font-bold" : ""
              )}>
                {format(day, "d")}
              </span>

              {/* Range connectors */}
              {active && !start && !end && (
                <div className="absolute inset-0 bg-calendar-accent/5" />
              )}
              
              {start && range.end && (
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-[80%] bg-calendar-accent/10 -z-10" />
              )}
              {end && range.start && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-[80%] bg-calendar-accent/10 -z-10" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-4 text-xs text-calendar-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-calendar-accent" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-calendar-accent/20" />
          <span>Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-calendar-accent" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
