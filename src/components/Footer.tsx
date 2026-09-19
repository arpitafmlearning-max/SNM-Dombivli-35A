import React from 'react';
import { MissionLogo } from './Logo';
import { Heart, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  totalRecords: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, totalRecords }) => {
  return (
    <footer className="relative bg-sky-950 text-slate-300 pt-12 pb-8 border-t-2 border-sky-600 mt-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-sky-900/60">
          
          {/* Col 1: Identity & Greeting */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MissionLogo size={44} glow={false} />
              <div>
                <div className="text-sky-300 text-xs uppercase font-extrabold tracking-wider">
                  Dhan Nirankar Ji
                </div>
                <div className="text-white font-bold text-sm sm:text-base leading-tight">
                  Sant Nirankari Mission
                </div>
                <div className="text-sky-200/80 text-xs font-medium">
                  Dombivli Zone 35-A
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to serving devotees with accurate and updated weekly Satsang schedules across Dombivli, Kalyan, Titwala, and surrounding branches.
            </p>
          </div>

          {/* Col 2: Spiritual Thought & Mission Vision */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Universal Brotherhood &amp; Oneness</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-sky-400 pl-3">
              “Know One, Believe in One, and Become One.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Serving {totalRecords} weekly Satsang gatherings throughout the zone in the spirit of selfless Seva, Simran, and Satsang.
            </p>
          </div>

          {/* Col 3: Seva & Quick Access */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-sm">
              Directory Seva &amp; Administration
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized volunteers and prabandhak mahatmas can log in to update schedules and ensure timely information reaches all devotees.
            </p>
            <div className="pt-1">
              <button
                id="footer-admin-login-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-900/80 hover:bg-sky-800 text-slate-200 hover:text-white text-xs font-semibold border border-sky-700/60 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-sky-300" />
                <span>Admin Login &amp; Management</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>Seva initiative for Sant Nirankari Mission Dombivli Zone 35-A</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> Devotion
            </span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-slate-500">
            Source: Official Zone 35-A Weekly Satsang Schedule
          </div>
        </div>

      </div>
    </footer>
  );
};
