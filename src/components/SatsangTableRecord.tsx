import React, { useState } from 'react';
import { SatsangRecord } from '../types';
import { Phone, Clock, MapPin, User, Check, Copy, Sparkles } from 'lucide-react';

interface SatsangTableRecordProps {
  records: SatsangRecord[];
  highlightQuery?: string;
}

export const SatsangTableRecord: React.FC<SatsangTableRecordProps> = ({
  records,
  highlightQuery = '',
}) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const highlightMatch = (text: string) => {
    if (!highlightQuery.trim() || !text) return text;
    const regex = new RegExp(`(${highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 text-slate-900 font-bold px-0.5 rounded-xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs my-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-sky-50 rounded-full flex items-center justify-center text-sky-600">
          <MapPin className="w-8 h-8 opacity-70" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Satsang Records Found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          No records matched your selected criteria. Try resetting filters or searching with a different branch or keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop / Tablet View: Refined White and Blue Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-[0_2px_16px_rgba(2,132,199,0.04)] border border-slate-200/90 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-950 text-white text-xs tracking-wider uppercase font-bold border-b border-sky-900">
                <th scope="col" className="py-4 px-4 w-[12%] border-r border-sky-900/60 font-semibold">
                  DAY
                </th>
                <th scope="col" className="py-4 px-4 w-[15%] border-r border-sky-900/60 font-semibold">
                  BRANCH
                </th>
                <th scope="col" className="py-4 px-5 w-[30%] border-r border-sky-900/60 font-semibold">
                  SATSANG PLACE
                </th>
                <th scope="col" className="py-4 px-4 w-[19%] border-r border-sky-900/60 font-semibold">
                  PRABANDHAK MAHATMA
                </th>
                <th scope="col" className="py-4 px-4 w-[12%] border-r border-sky-900/60 font-semibold">
                  CONTACT NO
                </th>
                <th scope="col" className="py-4 px-4 w-[12%] text-right font-semibold">
                  TIME
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-sm font-medium">
              {records.map((record, index) => {
                const cleanPhone = record.contact_no?.replace(/\D/g, '');
                const isCopied = copiedPhone === record.contact_no;

                return (
                  <tr
                    key={record.id || index}
                    className={`transition-colors hover:bg-sky-50/50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    {/* 1. DAY */}
                    <td className="py-3.5 px-4 border-r border-slate-100 align-middle">
                      <span className="inline-block font-bold text-xs uppercase px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200/80 font-mono">
                        {record.day}
                      </span>
                    </td>

                    {/* 2. BRANCH */}
                    <td className="py-3.5 px-4 border-r border-slate-100 align-middle font-bold text-sky-950 tracking-wide">
                      {highlightMatch(record.branch)}
                    </td>

                    {/* 3. SATSANG PLACE */}
                    <td className="py-3.5 px-5 border-r border-slate-100 align-middle text-slate-900 font-semibold leading-relaxed">
                      {highlightMatch(record.satsang_place)}
                    </td>

                    {/* 4. PRABANDHAK MAHATMA */}
                    <td className="py-3.5 px-4 border-r border-slate-100 align-middle text-slate-700">
                      {record.prabandhak_name ? (
                        highlightMatch(record.prabandhak_name)
                      ) : (
                        <span className="text-slate-400 italic text-xs">—</span>
                      )}
                    </td>

                    {/* 5. CONTACT NO */}
                    <td className="py-3.5 px-4 border-r border-slate-100 align-middle whitespace-nowrap">
                      {record.contact_no ? (
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="text-sky-700 hover:text-sky-900 hover:underline font-bold"
                            title="Call this number"
                          >
                            {highlightMatch(record.contact_no)}
                          </a>
                          <button
                            onClick={(e) => handleCopyPhone(record.contact_no, e)}
                            className="p-1 text-slate-400 hover:text-sky-700 rounded-md hover:bg-sky-50 transition-colors"
                            title="Copy phone number"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-sky-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">—</span>
                      )}
                    </td>

                    {/* 6. TIME */}
                    <td className="py-3.5 px-4 text-right align-middle whitespace-nowrap">
                      <span className="inline-block font-mono text-xs font-bold text-sky-900 bg-sky-50/80 px-2.5 py-1 rounded-md border border-sky-100">
                        {highlightMatch(record.time)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet View: Elegant White Cards with Refined Blue Header */}
      <div className="lg:hidden space-y-3.5">
        {records.map((record, index) => {
          const cleanPhone = record.contact_no?.replace(/\D/g, '');
          const isCopied = copiedPhone === record.contact_no;

          return (
            <div
              key={record.id || index}
              className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(2,132,199,0.04)] border border-slate-200/90 overflow-hidden transition-all active:scale-[0.99] hover:border-sky-300"
            >
              {/* Deep Blue Header Block */}
              <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-sky-200 bg-sky-500/20 border border-sky-400/30 px-2 py-0.5 rounded-md font-mono">
                    {record.day}
                  </span>
                  <span className="text-sky-400">•</span>
                  <span className="text-sm font-bold tracking-wide text-white">
                    {highlightMatch(record.branch)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-sky-200 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-sky-300" />
                  <span>{highlightMatch(record.time)}</span>
                </div>
              </div>

              {/* White Body with Structured Fields */}
              <div className="p-4 space-y-3">
                {/* SATSANG PLACE */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Satsang Place
                  </div>
                  <div className="text-base font-bold text-slate-900 leading-snug">
                    {highlightMatch(record.satsang_place)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                  {/* PRABANDHAK MAHATMA */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>Prabandhak Mahatma</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-800">
                      {record.prabandhak_name ? (
                        highlightMatch(record.prabandhak_name)
                      ) : (
                        <span className="text-slate-400 italic">Not Specified</span>
                      )}
                    </div>
                  </div>

                  {/* CONTACT NO */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>Contact No</span>
                    </div>
                    {record.contact_no ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 bg-sky-50 hover:bg-sky-100 min-h-[44px] px-3 py-2 rounded-xl border border-sky-200/80 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-600" />
                          <span>{highlightMatch(record.contact_no)}</span>
                        </a>
                        <button
                          onClick={(e) => handleCopyPhone(record.contact_no, e)}
                          className="min-h-[44px] min-w-[44px] p-2 text-slate-500 hover:text-sky-700 bg-slate-100 hover:bg-sky-50 rounded-xl transition-colors flex items-center justify-center"
                          title="Copy contact number"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-sky-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Not Available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
