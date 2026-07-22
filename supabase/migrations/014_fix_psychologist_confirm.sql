-- Permettre au psychologue de confirmer un RDV (ne pas appliquer les règles patient à tort)
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

    IF (SELECT auth.uid()) = OLD.user_id
      AND caller_role <> 'admin'
      AND (
        caller_psychologist_id IS NULL
        OR caller_psychologist_id IS DISTINCT FROM OLD.psychologist_id
      )
    THEN
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
