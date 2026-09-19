import React from 'react';
import { MissionLogo } from './Logo';
import { Shield, Database, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentView: 'public' | 'admin';
  onViewChange: (view: 'public' | 'admin') => void;
  isSupabaseLive: boolean;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  isSupabaseLive,
  totalRecords,
}) => {
  const todayDateFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="relative bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs z-20">
      {/* Top golden/spiritual announcement ribbon */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white text-xs sm:text-sm py-1.5 px-4 font-medium tracking-wider flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <span className="text-amber-200 font-semibold tracking-wide">Dombivli Zone 35-A</span>
          <span className="opacity-60">•</span>
          <span className="opacity-95">{todayDateFormatted}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            id="admin-nav-toggle-btn"
            onClick={() => onViewChange(currentView === 'admin' ? 'public' : 'admin')}
            className="hover:underline flex items-center gap-1 font-semibold opacity-95 hover:opacity-100 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
          >
            {currentView === 'admin' ? 'Public Website' : 'Admin Login'}
          </button>
        </div>
      </div>

      {/* Main Spiritual Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="flex flex-col items-center text-center">
          
          {/* Spiritual Greeting: Dhan Nirankar Ji */}
          <div className="inline-block mb-3">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dhan Nirankar Ji
            </span>
          </div>

          {/* Official Mission Logo with Refined Soft Glow */}
          <div className="relative my-3 sm:my-4">
            <MissionLogo size={88} glow={true} />
          </div>

          {/* Mission & Zone Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 sm:mt-2">
            Sant Nirankari Mission Dombivli Zone 35-A
          </h1>

          <p className="mt-2.5 text-base sm:text-lg text-sky-800 font-medium tracking-wide">
            Humanity and Spirituality hand in hand.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-900 border border-sky-200/90 font-medium shadow-2xs">
              <Database className="w-3.5 h-3.5 text-sky-600" />
              <span>{totalRecords} Verified Satsang Centers</span>
            </span>

            <button
              id="mobile-admin-switch"
              onClick={() => onViewChange(currentView === 'admin' ? 'public' : 'admin')}
              className={`sm:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Back to Schedule' : 'Admin Area'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
