-- Pharmacies: groupes de garde, horaires standards, rotations
-- Appliquée via MCP (009_pharmacies_duty_groups_hours)

ALTER TABLE public.pharmacies
  ADD COLUMN IF NOT EXISTS duty_group text,
  ADD COLUMN IF NOT EXISTS status_label text;

CREATE UNIQUE INDEX IF NOT EXISTS pharmacies_external_id_uidx
  ON public.pharmacies (external_id)
  WHERE external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS pharmacies_city_idx ON public.pharmacies (city);
CREATE INDEX IF NOT EXISTS pharmacies_duty_group_idx ON public.pharmacies (duty_group);

CREATE TABLE IF NOT EXISTS public.pharmacy_duty_rotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  duty_group text NOT NULL,
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_on >= starts_on)
);

CREATE INDEX IF NOT EXISTS pharmacy_duty_rotations_group_dates_idx
  ON public.pharmacy_duty_rotations (duty_group, starts_on, ends_on);

ALTER TABLE public.pharmacy_duty_rotations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS pharmacy_duty_rotations_read ON public.pharmacy_duty_rotations;
CREATE POLICY pharmacy_duty_rotations_read ON public.pharmacy_duty_rotations
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS pharmacy_duty_rotations_admin ON public.pharmacy_duty_rotations;
CREATE POLICY pharmacy_duty_rotations_admin ON public.pharmacy_duty_rotations
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pharmacy_duty_rotations TO authenticated;
