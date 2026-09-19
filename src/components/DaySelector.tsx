import React from 'react';
import { DayOfWeek } from '../types';
import { Calendar, Sparkles } from 'lucide-react';

interface DaySelectorProps {
  selectedDay: DayOfWeek | 'ALL';
  todayDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek | 'ALL') => void;
  dayCounts: Record<DayOfWeek, number>;
}

const ORDERED_DAYS: DayOfWeek[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  todayDay,
  onSelectDay,
  dayCounts,
}) => {
  return (
    <div className="w-full">
      {/* "Today's Satsang" Featured Callout - Refined White & Blue Focus */}
      <div className="mb-4 bg-white p-4 sm:p-5 rounded-2xl border border-sky-200/90 shadow-[0_2px_14px_rgba(2,132,199,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 border border-sky-200/70 px-2.5 py-0.5 rounded-full">
                Today's Satsang
              </span>
              <span className="text-xs text-slate-500 font-medium">Auto-detected Day</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2.5">
              <span className="tracking-tight text-sky-950">{todayDay}</span>
              <span className="text-xs sm:text-sm font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/60">
                {dayCounts[todayDay] || 0} Satsang Locations Today
              </span>
            </div>
          </div>
        </div>

        {selectedDay !== todayDay ? (
          <button
            id="switch-to-today-btn"
            onClick={() => onSelectDay(todayDay)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Show Today's Schedule</span>
          </button>
        ) : (
          <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200/80 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Showing Today's Satsangs</span>
          </div>
        )}
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          id="day-filter-all"
          onClick={() => onSelectDay('ALL')}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            selectedDay === 'ALL'
              ? 'bg-sky-950 text-white shadow-xs'
              : 'bg-white hover:bg-sky-50/60 text-slate-700 border border-slate-200/90'
          }`}
        >
          <span>All Days</span>
        </button>

        {ORDERED_DAYS.map((day) => {
          const isToday = day === todayDay;
          const isSelected = selectedDay === day;
          const count = dayCounts[day] || 0;

          return (
            <button
              key={day}
              id={`day-filter-${day.toLowerCase()}`}
              onClick={() => onSelectDay(day)}
              className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-500/20'
                  : 'bg-white hover:bg-sky-50/60 text-slate-700 border border-slate-200/90'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{day}</span>
                {isToday && (
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-sm ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
                  }`}>
                    Today
                  </span>
                )}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                isSelected ? 'bg-sky-700 text-sky-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
