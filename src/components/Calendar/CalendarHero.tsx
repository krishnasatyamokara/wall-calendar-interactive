import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";

interface CalendarHeroProps {
  currentDate: Date;
}

const HERO_IMAGES: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", // Jan
  1: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200", // Feb
  2: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=1200", // Mar
  3: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200", // Apr
  4: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", // May
  5: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200", // Jun
  6: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1200", // Jul
  7: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200", // Aug
  8: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", // Sep
  9: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200", // Oct
  10: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200", // Nov
  11: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1200", // Dec
};

export function CalendarHero({ currentDate }: CalendarHeroProps) {
  const monthIndex = currentDate.getMonth();
  const imageUrl = HERO_IMAGES[monthIndex] || HERO_IMAGES[0];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-calendar-border group">
      <AnimatePresence mode="wait">
        <motion.div
          key={monthIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={imageUrl}
            alt={format(currentDate, "MMMM")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-8 text-white z-10">
        <motion.div
          key={`text-${monthIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] mb-2 opacity-80">
            {format(currentDate, "yyyy")}
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            {format(currentDate, "MMMM")}
          </h1>
        </motion.div>
      </div>

      {/* Decorative "Wall Calendar" hole */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-calendar-bg border border-calendar-border shadow-inner z-20 hidden md:block" />
    </div>
  );
}
