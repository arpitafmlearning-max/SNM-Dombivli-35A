import React, { useState, useEffect, useMemo } from 'react';
import { 
  SatsangRecord, 
  DayOfWeek, 
  SupabaseConfig 
} from '../types';
import { 
  fetchSatsangRecords, 
  insertSatsangRecord, 
  updateSatsangRecord, 
  deleteSatsangRecord, 
  seedAllRecordsToSupabase, 
  resetLocalRecordsToAuthoritativePDF,
  adminSignIn, 
  adminSignOut, 
  getAdminSession,
  AdminUser,
  getSavedConfig,
  saveConfig,
  isSupabaseConfigured
} from '../lib/supabase';
import { generateSupabaseSQLScript } from '../lib/sqlSchema';
import { DAYS_LIST } from '../data/initialSchedule';
import { 
  Shield, 
  KeyRound, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Check, 
  Database, 
  RefreshCw, 
  LogOut, 
  X, 
  Calendar, 
  Building2, 
  UserCheck, 
  UploadCloud,
  ChevronRight,
  SlidersHorizontal,
  FileCode2
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onDataChanged }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'records' | 'sql' | 'settings'>('records');

  // Records state
  const [records, setRecords] = useState<SatsangRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDay, setFilterDay] = useState<string>('ALL');
  const [filterBranch, setFilterBranch] = useState<string>('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<SatsangRecord | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Form inputs
  const [formData, setFormData] = useState({
    day: 'SUNDAY' as DayOfWeek,
    branch: '',
    satsang_place: '',
    prabandhak_name: '',
    contact_no: '',
    time: '7.00 PM TO 9.00 PM',
  });

  // Delete confirmation
  const [recordToDelete, setRecordToDelete] = useState<SatsangRecord | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Supabase connection config
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getSavedConfig());
  const [configSaving, setConfigSaving] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Check auth session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const session = await getAdminSession();
    setCurrentUser(session);
    if (session) {
      loadRecords();
    }
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadRecords = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const result = await fetchSatsangRecords();
      setRecords(result.data);
      setIsLiveSupabase(result.isLive);
      if (result.error) {
        setDbError(result.error);
      }
    } catch (err: any) {
      setDbError(err?.message || 'Failed to load records');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail || !loginPassword) {
      setAuthError('Please provide both email and password.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await adminSignIn(loginEmail, loginPassword);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        loadRecords();
        showToast('Welcome back, Admin!');
      } else {
        setAuthError(res.error || 'Authentication failed');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Authentication error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminSignOut();
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  // Open Add Record modal
  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      day: 'SUNDAY',
      branch: '',
      satsang_place: '',
      prabandhak_name: '',
      contact_no: '',
      time: '7.00 PM TO 9.00 PM',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Edit Record modal
  const handleOpenEdit = (record: SatsangRecord) => {
    setEditingRecord(record);
    setFormData({
      day: record.day,
      branch: record.branch,
      satsang_place: record.satsang_place,
      prabandhak_name: record.prabandhak_name,
      contact_no: record.contact_no,
      time: record.time,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Save Add / Edit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.branch.trim()) {
      setFormError('Branch is required.');
      return;
    }
    if (!formData.satsang_place.trim()) {
      setFormError('Satsang Place is required.');
      return;
    }
    if (!formData.time.trim()) {
      setFormError('Time is required.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingRecord) {
        // UPDATE
        const res = await updateSatsangRecord({
          ...editingRecord,
          day: formData.day,
          branch: formData.branch.trim().toUpperCase(),
          satsang_place: formData.satsang_place.trim(),
          prabandhak_name: formData.prabandhak_name.trim(),
          contact_no: formData.contact_no.trim(),
          time: formData.time.trim(),
        });

        if (res.success) {
          showToast('Satsang record updated successfully.');
          setIsModalOpen(false);
          await loadRecords();
          onDataChanged();
        } else {
          setFormError(res.error || 'Failed to update record in Supabase');
        }
      } else {
        // INSERT
        const res = await insertSatsangRecord({
          day: formData.day,
          branch: formData.branch.trim().toUpperCase(),
          satsang_place: formData.satsang_place.trim(),
          prabandhak_name: formData.prabandhak_name.trim(),
          contact_no: formData.contact_no.trim(),
          time: formData.time.trim(),
        });

        if (res.success) {
          showToast('New Satsang record added successfully.');
          setIsModalOpen(false);
          await loadRecords();
          onDataChanged();
        } else {
          setFormError(res.error || 'Failed to insert record into Supabase');
        }
      }
    } catch (err: any) {
      setFormError(err?.message || 'Database operation failed');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setDeleteSubmitting(true);
    try {
      const res = await deleteSatsangRecord(recordToDelete.id);
      if (res.success) {
        showToast('Satsang record deleted successfully.');
        setRecordToDelete(null);
        await loadRecords();
        onDataChanged();
      } else {
        showToast(res.error || 'Failed to delete record from Supabase', 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Delete operation failed', 'error');
    } finally {
      setDeleteSubmitting(false);
    }
  };

  // Save Supabase Configuration
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaving(true);
    try {
      saveConfig(supabaseConfig);
      showToast('Supabase configuration saved.');
      loadRecords();
    } catch (e: any) {
      showToast('Failed to save configuration', 'error');
    } finally {
      setConfigSaving(false);
    }
  };

  // One-click Seed to Supabase
  const handleSeedSupabase = async () => {
    if (!isSupabaseConfigured()) {
      showToast('Please enter your Supabase URL & Anon Key first.', 'error');
      return;
    }
    setSeedLoading(true);
    try {
      const res = await seedAllRecordsToSupabase();
      if (res.success) {
        showToast(`Successfully seeded all ${res.count} PDF records to Supabase!`);
        await loadRecords();
        onDataChanged();
      } else {
        showToast(res.error || 'Seed failed. Make sure the table exists via SQL editor.', 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Seed failed', 'error');
    } finally {
      setSeedLoading(false);
    }
  };

  // Reset local dataset to 142 PDF records
  const handleResetLocal = () => {
    if (window.confirm('Reset local cache to original 142 PDF records? Any unsynced local edits will be replaced with official PDF records.')) {
      resetLocalRecordsToAuthoritativePDF();
      loadRecords();
      onDataChanged();
      showToast('Reset to original 142 PDF records successfully.');
    }
  };

  // Copy SQL script
  const handleCopySQL = () => {
    const script = generateSupabaseSQLScript();
    navigator.clipboard.writeText(script);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
    showToast('Complete SQL script copied to clipboard!');
  };

  // Compute stats dynamically from database
  const stats = useMemo(() => {
    const total = records.length;
    const byDay: Record<DayOfWeek, number> = {
      SUNDAY: 0,
      MONDAY: 0,
      TUESDAY: 0,
      WEDNESDAY: 0,
      THURSDAY: 0,
      FRIDAY: 0,
      SATURDAY: 0,
    };
    const branches = new Set<string>();

    records.forEach((r) => {
      if (byDay[r.day] !== undefined) {
        byDay[r.day]++;
      }
      if (r.branch) {
        branches.add(r.branch);
      }
    });

    return {
      total,
      byDay,
      uniqueBranches: Array.from(branches).sort(),
    };
  }, [records]);

  // Filtered records for table
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (filterDay !== 'ALL' && r.day !== filterDay) {
        return false;
      }
      if (filterBranch !== 'ALL' && r.branch !== filterBranch) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          r.branch?.toLowerCase().includes(q) ||
          r.satsang_place?.toLowerCase().includes(q) ||
          r.prabandhak_name?.toLowerCase().includes(q) ||
          r.contact_no?.toLowerCase().includes(q) ||
          r.day?.toLowerCase().includes(q) ||
          r.time?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [records, filterDay, filterBranch, searchQuery]);

  // If not logged in, render the login screen
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-800 to-sky-900 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-sky-700/50"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
              <Shield className="w-6 h-6 text-sky-200" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Admin Authorization</h2>
            <p className="text-xs text-sky-200 mt-1">Sant Nirankari Mission Dombivli Zone 35-A</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {/* Demo Credentials Callout */}
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-900 space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-sky-800">
                  <KeyRound className="w-3.5 h-3.5 text-sky-600" />
                  Demo Admin Credentials
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('admin@nirankar35a.org');
                    setLoginPassword('Nirankar35A');
                  }}
                  className="px-2 py-0.5 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold rounded shadow-2xs transition-colors"
                >
                  Auto-fill
                </button>
              </div>
              <div className="grid grid-cols-1 gap-1 text-[11px] font-mono bg-white/70 p-2 rounded border border-sky-100">
                <div><strong className="font-sans text-slate-500 font-semibold">Email:</strong> admin@nirankar35a.org</div>
                <div><strong className="font-sans text-slate-500 font-semibold">Password:</strong> Nirankar35A</div>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@nirankar35a.org"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Authorized seva volunteers can enter credentials or sign in directly.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 px-4 bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Enter Admin Panel</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Cancel &amp; Return to Public Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-50 rounded-2xl shadow-2xl max-w-6xl w-full border border-slate-300 max-h-[95vh] flex flex-col overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-700/80 border border-sky-500/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Satsang Administration Panel</h2>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                  isLiveSupabase 
                    ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' 
                    : 'bg-amber-400/20 text-amber-200 border-amber-400/40'
                }`}>
                  {isLiveSupabase ? 'Supabase Live DB' : 'Local Persistence'}
                </span>
              </div>
              <p className="text-xs text-sky-200/90">
                Logged in as: <span className="font-semibold text-white">{currentUser.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadRecords}
              className="p-2 text-sky-200 hover:text-white hover:bg-sky-700/60 rounded-lg transition-colors"
              title="Refresh database"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold bg-sky-800 hover:bg-sky-700 text-sky-100 rounded-lg border border-sky-600/40 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-sky-200 hover:text-white hover:bg-sky-700/60 rounded-lg transition-colors ml-1"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-5 flex items-center justify-between shrink-0">
          <div className="flex space-x-1 sm:space-x-4">
            <button
              onClick={() => setActiveTab('records')}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'records'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Satsang Records ({stats.total})</span>
            </button>

            <button
              onClick={() => setActiveTab('sql')}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'sql'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Supabase SQL Setup</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Connection &amp; Seed</span>
            </button>
          </div>

          {activeTab === 'records' && (
            <button
              onClick={handleOpenAdd}
              className="my-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Satsang Record</span>
            </button>
          )}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="px-5 pt-3">
            <div className={`p-3 rounded-lg text-xs font-semibold flex items-center justify-between ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              <div className="flex items-center gap-2">
                {toastMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{toastMessage.text}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="opacity-60 hover:opacity-100">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Database Warning / Info */}
        {dbError && (
          <div className="px-5 pt-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{dbError}</span>
              </div>
              <button
                onClick={() => setActiveTab('sql')}
                className="underline font-bold text-amber-800 text-[11px]"
              >
                View SQL Setup
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: SATSANG RECORDS & DASHBOARD */}
          {activeTab === 'records' && (
            <>
              {/* Real Database Statistics Dashboard */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Satsang Statistics (Calculated from Database)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-center">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Total</div>
                    <div className="text-xl font-extrabold text-sky-800 mt-0.5">{stats.total}</div>
                  </div>

                  {DAYS_LIST.map((day) => (
                    <div 
                      key={day} 
                      onClick={() => setFilterDay(filterDay === day ? 'ALL' : day)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        filterDay === day 
                          ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-500/20' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-slate-500 uppercase truncate">
                        {day.substring(0, 3)}
                      </div>
                      <div className="text-lg font-bold text-slate-800 mt-0.5">
                        {stats.byDay[day]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search & Filter Bar for Admin */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by branch, place, prabandhak mahatma, or phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                    className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">All Days</option>
                    {DAYS_LIST.map((d) => (
                      <option key={d} value={d}>
                        {d} ({stats.byDay[d]})
                      </option>
                    ))}
                  </select>

                  <select
                    value={filterBranch}
                    onChange={(e) => setFilterBranch(e.target.value)}
                    className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">All Branches ({stats.uniqueBranches.length})</option>
                    {stats.uniqueBranches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>

                  {(searchQuery || filterDay !== 'ALL' || filterBranch !== 'ALL') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterDay('ALL');
                        setFilterBranch('ALL');
                      }}
                      className="px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Records Table / Responsive Cards */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>
                    Showing {filteredRecords.length} of {records.length} records
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {isLiveSupabase ? 'Synced with Supabase' : 'Stored in Local Cache'}
                  </span>
                </div>

                {isLoading ? (
                  <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
                    <span className="text-xs">Loading records from database...</span>
                  </div>
                ) : filteredRecords.length === 0 ? (
                  <div className="p-10 text-center text-slate-500">
                    <p className="text-sm font-semibold">No records match your filters.</p>
                    <p className="text-xs mt-1">Try resetting search or filters.</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop View Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100/90 text-slate-600 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3">DAY</th>
                            <th className="py-2.5 px-3">BRANCH</th>
                            <th className="py-2.5 px-4">SATSANG PLACE</th>
                            <th className="py-2.5 px-3">PRABANDHAK MAHATMA</th>
                            <th className="py-2.5 px-3">CONTACT NO</th>
                            <th className="py-2.5 px-3">TIME</th>
                            <th className="py-2.5 px-3 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-800">
                          {filteredRecords.map((r) => (
                            <tr key={r.id} className="hover:bg-sky-50/50">
                              <td className="py-2.5 px-3 font-semibold text-emerald-800 font-mono">
                                {r.day}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-sky-900">
                                {r.branch}
                              </td>
                              <td className="py-2.5 px-4 font-medium text-slate-900">
                                {r.satsang_place}
                              </td>
                              <td className="py-2.5 px-3 text-slate-700">
                                {r.prabandhak_name || '—'}
                              </td>
                              <td className="py-2.5 px-3 font-mono">
                                {r.contact_no || '—'}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                                {r.time}
                              </td>
                              <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleOpenEdit(r)}
                                  className="p-1.5 text-sky-700 hover:text-sky-900 hover:bg-sky-100 rounded-md transition-colors mr-1"
                                  title="Edit Record"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setRecordToDelete(r)}
                                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-md transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile View Cards */}
                    <div className="md:hidden divide-y divide-slate-200">
                      {filteredRecords.map((r) => (
                        <div key={r.id} className="p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-sm">
                                {r.day}
                              </span>
                              <span className="font-bold text-sky-900 text-xs">
                                {r.branch}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEdit(r)}
                                className="p-1.5 text-sky-700 bg-sky-50 rounded-md"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setRecordToDelete(r)}
                                className="p-1.5 text-rose-600 bg-rose-50 rounded-md"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs font-bold text-slate-900">
                            {r.satsang_place}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                            <div>
                              <span className="text-slate-400">Prabandhak Mahatma: </span>
                              <span className="font-medium text-slate-700">{r.prabandhak_name || '—'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Phone: </span>
                              <span className="font-mono text-slate-700">{r.contact_no || '—'}</span>
                            </div>
                          </div>

                          <div className="text-[11px] font-mono font-bold text-emerald-800">
                            {r.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* TAB 2: SUPABASE SQL SETUP SCRIPT */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Complete Supabase SQL Setup Script
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Copy and paste this script directly into your Supabase project's SQL Editor to create tables, indexes, RLS policies, and seed all 142 records.
                    </p>
                  </div>
                  <button
                    onClick={handleCopySQL}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs shrink-0"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Complete SQL Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto max-h-96 font-mono text-xs border border-slate-800">
                  <pre>{generateSupabaseSQLScript()}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONNECTION CONFIGURATION & SYNC SEED */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Supabase Connection Form */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Supabase Project Configuration
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Configure your project URL and public Anon Key. You can also configure these in your environment variables as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code>.
                </p>

                <form onSubmit={handleSaveConfig} className="space-y-3 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project URL
                    </label>
                    <input
                      type="url"
                      value={supabaseConfig.url}
                      onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Anon (Public) Key
                    </label>
                    <input
                      type="text"
                      value={supabaseConfig.anonKey}
                      onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-1 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={configSaving}
                    className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
                  >
                    {configSaving ? 'Saving...' : 'Save Configuration'}
                  </button>
                </form>
              </div>

              {/* Data Operations */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Initial Dataset Seeding &amp; Recovery
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  The initial 142 records were extracted directly from the official 7-page PDF. Use these buttons to sync or reset the database.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSeedSupabase}
                    disabled={seedLoading}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-2"
                  >
                    {seedLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UploadCloud className="w-4 h-4" />
                    )}
                    <span>Sync All 142 PDF Records to Supabase</span>
                  </button>

                  <button
                    onClick={handleResetLocal}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Local Cache to Official PDF Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Sant Nirankari Mission Dombivli Zone 35-A • Seva Portal</span>
          <button onClick={onClose} className="hover:text-slate-800 font-semibold">
            Return to Public Website
          </button>
        </div>

      </div>

      {/* ADD / EDIT RECORD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="bg-sky-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base">
                {editingRecord ? 'Edit Satsang Record' : 'Add New Satsang Record'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-sky-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. DAY */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  1. DAY *
                </label>
                <select
                  required
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value as DayOfWeek })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800"
                >
                  {DAYS_LIST.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. BRANCH */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  2. BRANCH *
                </label>
                <input
                  type="text"
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. DOMBIVLI, TITWALA, KALYAN"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              {/* 3. SATSANG PLACE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  3. SATSANG PLACE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.satsang_place}
                  onChange={(e) => setFormData({ ...formData, satsang_place: e.target.value })}
                  placeholder="e.g. DOMBIVLI SATSANG BHAWAN (SUNDAY)"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 4. PRABANDHAK MAHATMA */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  4. PRABANDHAK MAHATMA
                </label>
                <input
                  type="text"
                  value={formData.prabandhak_name}
                  onChange={(e) => setFormData({ ...formData, prabandhak_name: e.target.value })}
                  placeholder="e.g. REV. CHANDRAKANT KANSE JI"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 5. CONTACT NO */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  5. CONTACT NO
                </label>
                <input
                  type="text"
                  value={formData.contact_no}
                  onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })}
                  placeholder="e.g. 9833590574"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              {/* 6. TIME */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  6. TIME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 7.00 PM TO 9.00 PM"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs flex items-center gap-2"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingRecord ? 'Save Changes' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {recordToDelete && (
        <div className="fixed inset-0 z-70 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 p-5 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Delete this Satsang record?
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Are you sure you want to remove <strong className="text-slate-800">{recordToDelete.satsang_place}</strong>? This change will reflect immediately on the public website.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setRecordToDelete(null)}
                disabled={deleteSubmitting}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteSubmitting}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                {deleteSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
