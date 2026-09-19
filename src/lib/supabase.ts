import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { INITIAL_SATSANG_RECORDS } from '../data/initialSchedule';
import { SatsangRecord, SupabaseConfig } from '../types';

const STORAGE_KEYS = {
  RECORDS: 'snm_satsang_records_v1',
  CONFIG: 'snm_supabase_config_v1',
  AUTH_SESSION: 'snm_admin_session_v1',
};

// Initialize config from Vite env or localStorage
export function getSavedConfig(): SupabaseConfig {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading saved supabase config', e);
  }

  return { url: '', anonKey: '' };
}

export function saveConfig(config: SupabaseConfig): void {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  // Reset client instance
  supabaseInstance = null;
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSavedConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.error('Failed to create Supabase client', err);
      return null;
    }
  }

  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  const config = getSavedConfig();
  return Boolean(config.url && config.anonKey);
}

// Local Storage Fallback Cache Management
function getLocalRecords(): SatsangRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading local records cache', e);
  }
  // Initialize with authoritative PDF data
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_SATSANG_RECORDS));
  return INITIAL_SATSANG_RECORDS;
}

function saveLocalRecords(records: SatsangRecord[]): void {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
}

// --- Data Operations (Supabase with seamless fallback) ---

export const fetchSatsangRecords = fetchAllSatsangRecords;

export async function fetchAllSatsangRecords(): Promise<{ data: SatsangRecord[]; isLive: boolean; error?: string }> {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      const { data, error } = await client
        .from('satsang_records')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Supabase fetch error, falling back to local dataset:', error.message);
        return { data: getLocalRecords(), isLive: false, error: error.message };
      }

      if (data && data.length > 0) {
        // Cache locally for offline resilience
        saveLocalRecords(data as SatsangRecord[]);
        return { data: data as SatsangRecord[], isLive: true };
      } else {
        // Table exists but is empty -> provide local records and recommend seeding
        return { data: getLocalRecords(), isLive: true, error: 'Database table is currently empty. Click "Seed PDF Records" in Admin to upload all 142 records.' };
      }
    } catch (err: any) {
      console.warn('Error querying Supabase, using local records:', err);
      return { data: getLocalRecords(), isLive: false, error: err?.message || 'Network error' };
    }
  }

  // Not connected to Supabase yet -> Return local storage data
  return { data: getLocalRecords(), isLive: false };
}

export async function insertSatsangRecord(record: Omit<SatsangRecord, 'id'> & { id?: string }): Promise<{ success: boolean; data?: SatsangRecord; error?: string }> {
  const newId = record.id || `rec-${Date.now()}`;
  const completeRecord: SatsangRecord = {
    ...record,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('satsang_records')
        .insert([completeRecord])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Update local cache
      const current = getLocalRecords();
      saveLocalRecords([completeRecord, ...current.filter(r => r.id !== completeRecord.id)]);
      return { success: true, data: data as SatsangRecord };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to insert into Supabase' };
    }
  }

  // Fallback mode
  const current = getLocalRecords();
  const updated = [completeRecord, ...current.filter(r => r.id !== completeRecord.id)];
  saveLocalRecords(updated);
  return { success: true, data: completeRecord };
}

export async function updateSatsangRecord(record: SatsangRecord): Promise<{ success: boolean; data?: SatsangRecord; error?: string }> {
  const updatedRecord: SatsangRecord = {
    ...record,
    updated_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('satsang_records')
        .update(updatedRecord)
        .eq('id', record.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      const current = getLocalRecords();
      const updatedList = current.map(r => r.id === record.id ? updatedRecord : r);
      saveLocalRecords(updatedList);
      return { success: true, data: data as SatsangRecord };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update in Supabase' };
    }
  }

  // Fallback mode
  const current = getLocalRecords();
  const updatedList = current.map(r => r.id === record.id ? updatedRecord : r);
  saveLocalRecords(updatedList);
  return { success: true, data: updatedRecord };
}

export async function deleteSatsangRecord(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client
        .from('satsang_records')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      const current = getLocalRecords();
      saveLocalRecords(current.filter(r => r.id !== id));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete from Supabase' };
    }
  }

  // Fallback mode
  const current = getLocalRecords();
  saveLocalRecords(current.filter(r => r.id !== id));
  return { success: true };
}

export async function seedAllRecordsToSupabase(): Promise<{ success: boolean; count: number; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, count: 0, error: 'Supabase credentials not configured' };
  }

  try {
    const recordsToInsert = INITIAL_SATSANG_RECORDS.map(r => ({
      id: r.id,
      day: r.day,
      branch: r.branch,
      satsang_place: r.satsang_place,
      prabandhak_name: r.prabandhak_name,
      contact_no: r.contact_no,
      time: r.time,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await client
      .from('satsang_records')
      .upsert(recordsToInsert, { onConflict: 'id' });

    if (error) {
      return { success: false, count: 0, error: error.message };
    }

    saveLocalRecords(INITIAL_SATSANG_RECORDS);
    return { success: true, count: recordsToInsert.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Seed operation failed' };
  }
}

export function resetLocalRecordsToAuthoritativePDF(): void {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_SATSANG_RECORDS));
}

// --- Admin Authentication ---

export interface AdminUser {
  email: string;
  id: string;
  isDemo?: boolean;
}

export async function adminSignIn(email: string, password: string):Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If user entered valid credentials or wants to enter admin
        return { success: false, error: error.message };
      }

      if (data.user) {
        const admin: AdminUser = {
          email: data.user.email || email,
          id: data.user.id,
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(admin));
        return { success: true, user: admin };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Supabase authentication failed' };
    }
  }

  // Fallback demo/local authentication when Supabase is not configured yet
  // Enables authorized volunteer testing right away
  if (password === 'Nirankar35A' || password === 'admin123' || password.length >= 6) {
    const admin: AdminUser = {
      email,
      id: 'local-admin-' + Date.now(),
      isDemo: true,
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(admin));
    return { success: true, user: admin };
  }

  return { success: false, error: 'Invalid email or password. (Hint: Use any email and password with at least 6 characters)' };
}

export async function adminSignOut(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data } = await client.auth.getSession();
      if (data.session?.user) {
        return {
          email: data.session.user.email || '',
          id: data.session.user.id,
        };
      }
    } catch (e) {
      console.warn('Session check failed', e);
    }
  }

  try {
    const local = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}
