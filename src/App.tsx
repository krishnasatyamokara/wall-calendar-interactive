/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { CalendarHero } from "./components/Calendar/CalendarHero";
import { CalendarGrid } from "./components/Calendar/CalendarGrid";
import { CalendarNoteSection } from "./components/Calendar/CalendarNoteSection";
import { DateRange } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="min-h-screen bg-calendar-bg flex items-center justify-center p-4 md:p-8 lg:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-calendar-border overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Hero Image (Desktop) / Top (Mobile) */}
        <div className="md:w-1/3 lg:w-2/5 shrink-0">
          <CalendarHero currentDate={currentDate} />
        </div>

        {/* Right Side: Calendar Grid & Notes */}
        <div className="flex-1 flex flex-col lg:flex-row">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDate.toISOString()}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col lg:flex-row"
            >
              <CalendarGrid 
                currentDate={currentDate} 
                onDateChange={setCurrentDate}
                range={range}
                onRangeChange={setRange}
              />
              <CalendarNoteSection 
                range={range}
                currentDate={currentDate}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
        <div className="w-8 h-px bg-calendar-ink" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
          Aesthetic Series 2026
        </span>
        <div className="w-8 h-px bg-calendar-ink" />
      </div>
    </div>
  );
}

