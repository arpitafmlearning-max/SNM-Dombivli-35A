export type DayOfWeek = 
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

export interface SatsangRecord {
  id: string;
  day: DayOfWeek;
  branch: string;
  satsang_place: string;
  prabandhak_name: string;
  contact_no: string;
  time: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export interface DayStat {
  day: DayOfWeek;
  count: number;
  label: string;
}
