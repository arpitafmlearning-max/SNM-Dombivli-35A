import { INITIAL_SATSANG_RECORDS } from '../data/initialSchedule';

export function generateSupabaseSQLScript(): string {
  const tableAndPolicies = `-- ══════════════════════════════════════════════════════════════════════
-- SANT NIRANKARI MISSION DOMBIVLI ZONE 35-A - SATSANG DIRECTORY SCHEMA
-- Copy and run this script in your Supabase Project -> SQL Editor
-- ══════════════════════════════════════════════════════════════════════

-- 1. Create the Satsang records table
CREATE TABLE IF NOT EXISTS public.satsang_records (
    id TEXT PRIMARY KEY,
    day TEXT NOT NULL,
    branch TEXT NOT NULL,
    satsang_place TEXT NOT NULL,
    prabandhak_name TEXT DEFAULT '',
    contact_no TEXT DEFAULT '',
    time TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create performance indexes for filtering and rapid global search
CREATE INDEX IF NOT EXISTS idx_satsang_day ON public.satsang_records(day);
CREATE INDEX IF NOT EXISTS idx_satsang_branch ON public.satsang_records(branch);
CREATE INDEX IF NOT EXISTS idx_satsang_place ON public.satsang_records(satsang_place);
CREATE INDEX IF NOT EXISTS idx_satsang_prabandhak ON public.satsang_records(prabandhak_name);
CREATE INDEX IF NOT EXISTS idx_satsang_contact ON public.satsang_records(contact_no);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.satsang_records ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- A. Devotees and public users can view all Satsang records
DROP POLICY IF EXISTS "Public can view satsang records" ON public.satsang_records;
CREATE POLICY "Public can view satsang records" 
ON public.satsang_records 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- B. Authenticated admins can manage (insert/update/delete) records
DROP POLICY IF EXISTS "Admins can insert satsang records" ON public.satsang_records;
CREATE POLICY "Admins can insert satsang records" 
ON public.satsang_records 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update satsang records" ON public.satsang_records;
CREATE POLICY "Admins can update satsang records" 
ON public.satsang_records 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete satsang records" ON public.satsang_records;
CREATE POLICY "Admins can delete satsang records" 
ON public.satsang_records 
FOR DELETE 
TO authenticated 
USING (true);

-- 5. Insert All 142 Authoritative PDF Records (Idempotent seed script)
INSERT INTO public.satsang_records (id, day, branch, satsang_place, prabandhak_name, contact_no, time)
VALUES
`;

  const valuesStatements = INITIAL_SATSANG_RECORDS.map(r => {
    const escPlace = r.satsang_place.replace(/'/g, "''");
    const escPrabandhak = r.prabandhak_name.replace(/'/g, "''");
    const escBranch = r.branch.replace(/'/g, "''");
    const escTime = r.time.replace(/'/g, "''");
    const escContact = r.contact_no.replace(/'/g, "''");
    return `('${r.id}', '${r.day}', '${escBranch}', '${escPlace}', '${escPrabandhak}', '${escContact}', '${escTime}')`;
  }).join(',\n');

  const onConflictClause = `
ON CONFLICT (id) DO UPDATE SET
    day = EXCLUDED.day,
    branch = EXCLUDED.branch,
    satsang_place = EXCLUDED.satsang_place,
    prabandhak_name = EXCLUDED.prabandhak_name,
    contact_no = EXCLUDED.contact_no,
    time = EXCLUDED.time,
    updated_at = TIMEZONE('utc'::text, NOW());
`;

  return tableAndPolicies + valuesStatements + onConflictClause;
}
