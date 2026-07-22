-- Livraison : urgence, géolocalisation, assignation auto, notes psy, avis

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS livreur_online boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS livreur_lat double precision,
  ADD COLUMN IF NOT EXISTS livreur_lng double precision,
  ADD COLUMN IF NOT EXISTS livreur_heading double precision,
  ADD COLUMN IF NOT EXISTS livreur_location_at timestamptz;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS urgency_level text NOT NULL DEFAULT 'normal'
    CHECK (urgency_level IN ('normal', 'urgent', 'emergency')),
  ADD COLUMN IF NOT EXISTS delivery_lat double precision,
  ADD COLUMN IF NOT EXISTS delivery_lng double precision,
  ADD COLUMN IF NOT EXISTS assigned_at timestamptz,
  ADD COLUMN IF NOT EXISTS livreur_lat double precision,
  ADD COLUMN IF NOT EXISTS livreur_lng double precision,
  ADD COLUMN IF NOT EXISTS livreur_location_at timestamptz,
  ADD COLUMN IF NOT EXISTS mock_payment_ref text,
  ADD COLUMN IF NOT EXISTS rated_at timestamptz;

ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS session_notes text,
  ADD COLUMN IF NOT EXISTS patient_rated_at timestamptz;

CREATE TABLE IF NOT EXISTS public.service_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rater_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type text NOT NULL CHECK (target_type IN ('livreur', 'psychologist')),
  target_user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  appointment_id uuid REFERENCES public.appointments(id) ON DELETE SET NULL,
  score smallint NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (rater_id, order_id),
  UNIQUE (rater_id, appointment_id)
);

CREATE INDEX IF NOT EXISTS idx_orders_livreur_active
  ON public.orders (livreur_id, status)
  WHERE status IN ('ready', 'delivering');

CREATE INDEX IF NOT EXISTS idx_profiles_livreur_online
  ON public.profiles (livreur_online)
  WHERE role = 'livreur';

ALTER TABLE public.service_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_ratings_own_insert ON public.service_ratings;
CREATE POLICY service_ratings_own_insert ON public.service_ratings
  FOR INSERT TO authenticated
  WITH CHECK (rater_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS service_ratings_own_select ON public.service_ratings;
CREATE POLICY service_ratings_own_select ON public.service_ratings
  FOR SELECT TO authenticated
  USING (rater_id = (SELECT auth.uid()) OR public.is_admin());

GRANT SELECT, INSERT ON public.service_ratings TO authenticated;

-- Patients peuvent lire la position livreur sur LEUR commande active
DROP POLICY IF EXISTS orders_patient_track_livreur ON public.orders;
-- (colonnes livreur_lat sur orders déjà lisibles via policy own_select existante)
