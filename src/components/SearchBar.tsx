import React from 'react';
import { Search, X, MapPin, Filter } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  availableBranches: string[];
  totalResultsCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  availableBranches,
  totalResultsCount,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_2px_12px_rgba(2,132,199,0.03)] mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        
        {/* Search Input with refined blue focus */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4.5 h-4.5 text-sky-600" />
          </div>
          <input
            id="global-satsang-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Branch, Place (e.g. Kopar, Lodha), Prabandhak Mahatma, Phone or Day..."
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50/60 hover:bg-white focus:bg-white text-sm sm:text-base text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-0.5" />
            </button>
          )}
        </div>

        {/* Branch Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[170px] sm:min-w-[210px] w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MapPin className="w-4 h-4 text-sky-600" />
            </div>
            <select
              id="branch-filter-select"
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 sm:py-3 bg-slate-50/60 hover:bg-white focus:bg-white text-xs sm:text-sm font-medium text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">All Branches ({availableBranches.length})</option>
              {availableBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          {(searchQuery || selectedBranch) && (
            <button
              id="reset-all-filters-btn"
              onClick={() => {
                onSearchChange('');
                onBranchChange('');
              }}
              className="px-3.5 py-2.5 sm:py-3 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-xl transition-colors whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Active Search & Filter Indicator */}
      {(searchQuery || selectedBranch) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-700">Filtering:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200/60 px-2.5 py-0.5 rounded-lg font-medium">
                Keyword: "{searchQuery}"
              </span>
            )}
            {selectedBranch && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg font-medium">
                Branch: {selectedBranch}
              </span>
            )}
          </div>
          <span className="font-semibold text-sky-800">
            {totalResultsCount} matching {totalResultsCount === 1 ? 'record' : 'records'}
          </span>
        </div>
      )}
    </div>
  );
};
