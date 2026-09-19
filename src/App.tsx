import React, { useState, useEffect, useMemo } from 'react';
import { SatsangRecord, DayOfWeek } from './types';
import { fetchAllSatsangRecords } from './lib/supabase';
import { DAYS_LIST, mapDayIndexToDayOfWeek } from './data/initialSchedule';
import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { SearchBar } from './components/SearchBar';
import { SatsangTableRecord } from './components/SatsangTableRecord';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MissionLogo } from './components/Logo';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';

export default function App() {
  // Determine local user's day of week automatically
  const detectedToday: DayOfWeek = useMemo(() => {
    const dayIndex = new Date().getDay();
    return mapDayIndexToDayOfWeek(dayIndex);
  }, []);

  // State
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'ALL'>(detectedToday);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [records, setRecords] = useState<SatsangRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Load records from Supabase / local persistence
  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllSatsangRecords();
      setRecords(res.data);
      setIsSupabaseLive(res.isLive);
    } catch (err) {
      console.error('Error loading satsang schedule:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute counts per day
  const dayCounts = useMemo(() => {
    const counts: Record<DayOfWeek, number> = {
      SUNDAY: 0,
      MONDAY: 0,
      TUESDAY: 0,
      WEDNESDAY: 0,
      THURSDAY: 0,
      FRIDAY: 0,
      SATURDAY: 0,
    };
    records.forEach((r) => {
      if (counts[r.day] !== undefined) {
        counts[r.day]++;
      }
    });
    return counts;
  }, [records]);

  // Compute available unique branches
  const availableBranches = useMemo(() => {
    const branchSet = new Set<string>();
    records.forEach((r) => {
      if (r.branch?.trim()) {
        branchSet.add(r.branch.trim());
      }
    });
    return Array.from(branchSet).sort();
  }, [records]);

  // Filtered records based on Day, Search, and Branch
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // 1. Day filter (If search query is present, search across all days automatically if needed, or within selected day)
      if (selectedDay !== 'ALL' && !searchQuery.trim()) {
        if (r.day !== selectedDay) return false;
      } else if (selectedDay !== 'ALL' && searchQuery.trim()) {
        // If user is searching while a day is selected, prioritize that day unless they clicked "All Days"
        if (r.day !== selectedDay) return false;
      }

      // 2. Branch filter
      if (selectedBranch && r.branch !== selectedBranch) {
        return false;
      }

      // 3. Global search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesDay = r.day?.toLowerCase().includes(query);
        const matchesBranch = r.branch?.toLowerCase().includes(query);
        const matchesPlace = r.satsang_place?.toLowerCase().includes(query);
        const matchesPrabandhak = r.prabandhak_name?.toLowerCase().includes(query);
        const matchesContact = r.contact_no?.toLowerCase().includes(query);
        const matchesTime = r.time?.toLowerCase().includes(query);

        if (!matchesDay && !matchesBranch && !matchesPlace && !matchesPrabandhak && !matchesContact && !matchesTime) {
          return false;
        }
      }

      return true;
    });
  }, [records, selectedDay, selectedBranch, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative selection:bg-sky-500 selection:text-white font-sans">
      
      {/* Subtle divine logo watermark background (opacity < 0.04 for serene spiritual atmosphere) */}
      <MissionLogo watermark={true} />

      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={(v) => setCurrentView(v)}
        isSupabaseLive={isSupabaseLive}
        totalRecords={records.length}
      />

      {/* Main Public Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
        
        {/* Day Selector & Featured Today Banner */}
        <section className="mb-6">
          <DaySelector
            selectedDay={selectedDay}
            todayDay={detectedToday}
            onSelectDay={(day) => setSelectedDay(day)}
            dayCounts={dayCounts}
          />
        </section>

        {/* Global Search and Branch Dropdown Filter */}
        <section>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedBranch={selectedBranch}
            onBranchChange={setSelectedBranch}
            availableBranches={availableBranches}
            totalResultsCount={filteredRecords.length}
          />
        </section>

        {/* Section Heading & View Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 font-sans">
              <span className="text-sky-800">
                {selectedDay === 'ALL' ? 'All Weekly Satsang Schedule' : `${selectedDay}'s Satsang Schedule`}
              </span>
              {selectedDay === detectedToday && (
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300/80 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Today
                </span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing {filteredRecords.length} verified Satsang gatherings
              {selectedBranch ? ` in ${selectedBranch} branch` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
              title="Refresh schedule"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            {selectedDay !== 'ALL' && (
              <button
                onClick={() => setSelectedDay('ALL')}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-xs font-semibold shadow-2xs"
              >
                View Full Week
              </button>
            )}
          </div>
        </div>

        {/* Satsang Table / Cards Display */}
        <section>
          {isLoading ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
              <div className="text-base font-bold text-slate-800">Loading Satsang Schedule...</div>
              <p className="text-xs text-slate-500">Retrieving authoritative records for Zone 35-A</p>
            </div>
          ) : (
            <SatsangTableRecord
              records={filteredRecords}
              highlightQuery={searchQuery}
            />
          )}
        </section>

      </main>

      {/* Admin Panel Modal / Overlay */}
      {currentView === 'admin' && (
        <AdminPanel
          onClose={() => setCurrentView('public')}
          onDataChanged={loadData}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setCurrentView('admin')}
        totalRecords={records.length}
      />

    </div>
  );
}
