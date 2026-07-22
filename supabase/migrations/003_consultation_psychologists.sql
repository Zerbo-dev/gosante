-- Consultation médicale + psychologues (Phase 2)
-- Apply via Supabase SQL Editor or MCP

CREATE TABLE IF NOT EXISTS public.psychologists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  specialty text NOT NULL DEFAULT 'Psychologie clinique',
  city text NOT NULL DEFAULT 'Ouagadougou',
  phone text,
  email text,
  bio text,
  languages text[] NOT NULL DEFAULT ARRAY['Français'],
  consultation_fee numeric,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  psychologist_id uuid REFERENCES public.psychologists(id) ON DELETE SET NULL,
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  reason text,
  is_anonymous boolean NOT NULL DEFAULT false,
  jitsi_room text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_user ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_psychologist ON public.appointments(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled ON public.appointments(scheduled_at);

ALTER TABLE public.psychologists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY psychologists_public_read ON public.psychologists
  FOR SELECT TO authenticated USING (true);

CREATE POLICY psychologists_admin_write ON public.psychologists
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY appointments_own_select ON public.appointments
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id OR public.is_admin());

CREATE POLICY appointments_own_insert ON public.appointments
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY appointments_own_update ON public.appointments
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id OR public.is_admin())
  WITH CHECK ((SELECT auth.uid()) = user_id OR public.is_admin());

CREATE POLICY appointments_own_delete ON public.appointments
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id OR public.is_admin());

GRANT SELECT ON public.psychologists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;

INSERT INTO public.psychologists (full_name, specialty, city, phone, bio, languages, consultation_fee, is_available)
SELECT * FROM (VALUES
  ('Dr. Aminata Ouédraogo', 'Psychologie clinique', 'Ouagadougou', '+226 70 00 11 22',
   'Spécialisée dans l''anxiété, le stress post-traumatique et le soutien aux jeunes adultes.',
   ARRAY['Français', 'Mooré']::text[], 15000::numeric, true),
  ('Dr. Ibrahim Sawadogo', 'Psychiatrie', 'Ouagadougou', '+226 70 00 22 33',
   'Psychiatre formé à la prise en charge des troubles de l''humeur et des addictions.',
   ARRAY['Français', 'Dioula']::text[], 20000::numeric, true),
  ('Mme Fatoumata Kaboré', 'Counseling / écoute', 'Bobo-Dioulasso', '+226 70 00 33 44',
   'Counselor formée à l''écoute active, violence conjugale et orientation familiale.',
   ARRAY['Français', 'Dioula']::text[], 10000::numeric, true),
  ('Dr. Jean-Baptiste Zongo', 'Psychologie infantile', 'Ouagadougou', '+226 70 00 44 55',
   'Accompagnement des enfants et adolescents, troubles scolaires et famille.',
   ARRAY['Français', 'Mooré']::text[], 12000::numeric, true),
  ('Mme Mariam Traoré', 'Santé mentale communautaire', 'Koudougou', '+226 70 00 55 66',
   'Approche communautaire, groupes de parole et prévention du suicide.',
   ARRAY['Français', 'Mooré']::text[], 8000::numeric, true)
) AS v(full_name, specialty, city, phone, bio, languages, consultation_fee, is_available)
WHERE NOT EXISTS (SELECT 1 FROM public.psychologists LIMIT 1);
