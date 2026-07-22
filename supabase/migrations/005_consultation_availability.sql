-- Disponibilités réelles des psychologues et contrôle des consultations

CREATE TABLE IF NOT EXISTS public.psychologist_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id uuid NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  slot_minutes integer NOT NULL DEFAULT 30 CHECK (slot_minutes IN (15, 30, 45, 60, 90, 120)),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_time > start_time),
  UNIQUE (psychologist_id, weekday, start_time, end_time)
);

CREATE TABLE IF NOT EXISTS public.psychologist_time_off (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id uuid NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
  off_date date NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (psychologist_id, off_date)
);

ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 30
    CHECK (duration_minutes IN (15, 30, 45, 60, 90, 120)),
  ADD COLUMN IF NOT EXISTS psychologist_last_seen_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS appointments_unique_active_slot
  ON public.appointments (psychologist_id, scheduled_at)
  WHERE status IN ('scheduled', 'confirmed', 'in_progress');

CREATE INDEX IF NOT EXISTS idx_availability_psychologist_weekday
  ON public.psychologist_availability (psychologist_id, weekday)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_time_off_psychologist_date
  ON public.psychologist_time_off (psychologist_id, off_date);

ALTER TABLE public.psychologist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychologist_time_off ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS availability_authenticated_read ON public.psychologist_availability;
CREATE POLICY availability_authenticated_read
  ON public.psychologist_availability FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS availability_psychologist_write ON public.psychologist_availability;
CREATE POLICY availability_psychologist_write
  ON public.psychologist_availability FOR ALL TO authenticated
  USING (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  )
  WITH CHECK (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS time_off_authenticated_read ON public.psychologist_time_off;
CREATE POLICY time_off_authenticated_read
  ON public.psychologist_time_off FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS time_off_psychologist_write ON public.psychologist_time_off;
CREATE POLICY time_off_psychologist_write
  ON public.psychologist_time_off FOR ALL TO authenticated
  USING (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  )
  WITH CHECK (
    psychologist_id = public.my_psychologist_id()
    OR public.is_admin()
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON public.psychologist_availability TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.psychologist_time_off TO authenticated;

CREATE OR REPLACE FUNCTION public.validate_appointment_rules()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  caller_role public.user_role;
  rule_found boolean;
  caller_psychologist_id uuid;
BEGIN
  SELECT role INTO caller_role FROM public.profiles WHERE id = (SELECT auth.uid());
  SELECT id INTO caller_psychologist_id
  FROM public.psychologists
  WHERE user_id = (SELECT auth.uid())
  LIMIT 1;

  IF TG_OP = 'INSERT' THEN
    IF NEW.scheduled_at <= now() THEN
      RAISE EXCEPTION 'Le rendez-vous doit être dans le futur';
    END IF;

    SELECT EXISTS (
      SELECT 1
      FROM public.psychologist_availability availability
      WHERE availability.psychologist_id = NEW.psychologist_id
        AND availability.is_active = true
        AND availability.weekday = EXTRACT(DOW FROM NEW.scheduled_at AT TIME ZONE 'UTC')
        AND (NEW.scheduled_at AT TIME ZONE 'UTC')::time >= availability.start_time
        AND ((NEW.scheduled_at AT TIME ZONE 'UTC')::time
          + make_interval(mins => NEW.duration_minutes)) <= availability.end_time
        AND availability.slot_minutes = NEW.duration_minutes
        AND (
          EXTRACT(EPOCH FROM (
            (NEW.scheduled_at AT TIME ZONE 'UTC')::time - availability.start_time
          ))::integer / 60
        ) % availability.slot_minutes = 0
    ) INTO rule_found;

    IF NOT rule_found THEN
      RAISE EXCEPTION 'Créneau hors disponibilités';
    END IF;

    IF EXISTS (
      SELECT 1 FROM public.psychologist_time_off time_off
      WHERE time_off.psychologist_id = NEW.psychologist_id
        AND time_off.off_date = (NEW.scheduled_at AT TIME ZONE 'UTC')::date
    ) THEN
      RAISE EXCEPTION 'Psychologue absent à cette date';
    END IF;

    PERFORM pg_advisory_xact_lock(hashtextextended(NEW.psychologist_id::text, 0));
    IF EXISTS (
      SELECT 1 FROM public.appointments appointment
      WHERE appointment.psychologist_id = NEW.psychologist_id
        AND appointment.status IN ('scheduled', 'confirmed', 'in_progress')
        AND tstzrange(
          appointment.scheduled_at,
          appointment.scheduled_at + make_interval(mins => appointment.duration_minutes),
          '[)'
        ) && tstzrange(
          NEW.scheduled_at,
          NEW.scheduled_at + make_interval(mins => NEW.duration_minutes),
          '[)'
        )
    ) THEN
      RAISE EXCEPTION 'Ce créneau est déjà occupé';
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

DROP TRIGGER IF EXISTS appointments_validate_rules ON public.appointments;
CREATE TRIGGER appointments_validate_rules
  BEFORE INSERT OR UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.validate_appointment_rules();
