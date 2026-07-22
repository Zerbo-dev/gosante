-- Rôle psychologue (comme pharmacien / livreur) + liaison compte
-- Prérequis: migration 004a_add_psychologue_enum.sql déjà appliquée

ALTER TABLE public.psychologists
  ADD COLUMN IF NOT EXISTS user_id uuid UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_psychologists_user ON public.psychologists(user_id);

CREATE OR REPLACE FUNCTION public.is_psychologue()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid()) AND role = 'psychologue'
  );
$$;

CREATE OR REPLACE FUNCTION public.my_psychologist_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.psychologists
  WHERE user_id = (SELECT auth.uid())
  LIMIT 1;
$$;

DROP POLICY IF EXISTS psychologists_public_read ON public.psychologists;
CREATE POLICY psychologists_public_read ON public.psychologists
  FOR SELECT TO authenticated
  USING (is_available = true AND user_id IS NOT NULL);

DROP POLICY IF EXISTS psychologists_own_update ON public.psychologists;
CREATE POLICY psychologists_own_update ON public.psychologists
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()) OR public.is_admin())
  WITH CHECK (user_id = (SELECT auth.uid()) OR public.is_admin());

DROP POLICY IF EXISTS appointments_own_select ON public.appointments;
CREATE POLICY appointments_own_select ON public.appointments
  FOR SELECT TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS appointments_own_update ON public.appointments;
CREATE POLICY appointments_own_update ON public.appointments
  FOR UPDATE TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  )
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    OR psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

UPDATE public.psychologists SET is_available = false WHERE user_id IS NULL;
