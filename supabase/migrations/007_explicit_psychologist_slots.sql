-- Créneaux datés et indépendants, avec répétition facultative côté interface

CREATE TABLE IF NOT EXISTS public.psychologist_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id uuid NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
  starts_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 30
    CHECK (duration_minutes IN (15, 30, 45, 60, 90, 120)),
  status text NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'blocked')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (psychologist_id, starts_at)
);

ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS slot_id uuid REFERENCES public.psychologist_slots(id) ON DELETE RESTRICT;

CREATE UNIQUE INDEX IF NOT EXISTS appointments_unique_active_slot_id
  ON public.appointments (slot_id)
  WHERE slot_id IS NOT NULL
    AND status IN ('scheduled', 'confirmed', 'in_progress');

CREATE INDEX IF NOT EXISTS idx_psychologist_slots_open
  ON public.psychologist_slots (psychologist_id, starts_at)
  WHERE status = 'open';

ALTER TABLE public.psychologist_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS psychologist_slots_read ON public.psychologist_slots;
CREATE POLICY psychologist_slots_read
  ON public.psychologist_slots FOR SELECT TO authenticated
  USING (
    status = 'open'
    OR psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS psychologist_slots_psychologist_insert ON public.psychologist_slots;
CREATE POLICY psychologist_slots_psychologist_insert
  ON public.psychologist_slots FOR INSERT TO authenticated
  WITH CHECK (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS psychologist_slots_psychologist_update ON public.psychologist_slots;
CREATE POLICY psychologist_slots_psychologist_update
  ON public.psychologist_slots FOR UPDATE TO authenticated
  USING (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  )
  WITH CHECK (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS psychologist_slots_psychologist_delete ON public.psychologist_slots;
CREATE POLICY psychologist_slots_psychologist_delete
  ON public.psychologist_slots FOR DELETE TO authenticated
  USING (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON public.psychologist_slots TO authenticated;

CREATE OR REPLACE FUNCTION public.validate_appointment_rules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  caller_role public.user_role;
  caller_psychologist_id uuid;
  selected_slot public.psychologist_slots%ROWTYPE;
BEGIN
  SELECT role INTO caller_role
  FROM public.profiles
  WHERE id = (SELECT auth.uid());

  SELECT id INTO caller_psychologist_id
  FROM public.psychologists
  WHERE user_id = (SELECT auth.uid())
  LIMIT 1;

  IF TG_OP = 'INSERT' THEN
    IF NEW.slot_id IS NULL THEN
      RAISE EXCEPTION 'Un créneau publié est obligatoire';
    END IF;

    SELECT * INTO selected_slot
    FROM public.psychologist_slots
    WHERE id = NEW.slot_id;

    IF NOT FOUND
      OR selected_slot.status <> 'open'
      OR selected_slot.starts_at <= now()
    THEN
      RAISE EXCEPTION 'Ce créneau n''est plus disponible';
    END IF;

    IF NEW.psychologist_id IS DISTINCT FROM selected_slot.psychologist_id
      OR NEW.scheduled_at IS DISTINCT FROM selected_slot.starts_at
      OR NEW.duration_minutes IS DISTINCT FROM selected_slot.duration_minutes
    THEN
      RAISE EXCEPTION 'Les informations du rendez-vous ne correspondent pas au créneau';
    END IF;

    IF EXISTS (
      SELECT 1 FROM public.appointments appointment
      WHERE appointment.slot_id = NEW.slot_id
        AND appointment.status IN ('scheduled', 'confirmed', 'in_progress')
    ) THEN
      RAISE EXCEPTION 'Ce créneau vient d''être réservé';
    END IF;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF NEW.psychologist_last_seen_at IS DISTINCT FROM OLD.psychologist_last_seen_at
      AND caller_role <> 'admin'
      AND caller_psychologist_id IS DISTINCT FROM OLD.psychologist_id
    THEN
      RAISE EXCEPTION 'Seul le psychologue peut ouvrir la salle';
    END IF;

    IF (SELECT auth.uid()) = OLD.user_id AND caller_role <> 'admin' THEN
      IF NEW.scheduled_at IS DISTINCT FROM OLD.scheduled_at
        OR NEW.psychologist_id IS DISTINCT FROM OLD.psychologist_id
        OR NEW.duration_minutes IS DISTINCT FROM OLD.duration_minutes
        OR NEW.slot_id IS DISTINCT FROM OLD.slot_id
      THEN
        RAISE EXCEPTION 'Le patient ne peut pas déplacer le rendez-vous';
      END IF;

      IF NEW.status IS DISTINCT FROM OLD.status THEN
        IF NEW.status <> 'cancelled' THEN
          RAISE EXCEPTION 'Le patient peut uniquement annuler';
        END IF;
        IF OLD.scheduled_at - now() < interval '24 hours' THEN
          RAISE EXCEPTION 'Annulation impossible à moins de 24 heures';
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;
