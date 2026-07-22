-- Inbox notifications in-app (pas Web Push)
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  href text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  meta jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx
  ON public.notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx
  ON public.notifications (user_id)
  WHERE read_at IS NULL;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS notifications_select_own ON public.notifications;
CREATE POLICY notifications_select_own
  ON public.notifications
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS notifications_update_own ON public.notifications;
CREATE POLICY notifications_update_own
  ON public.notifications
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- Pas d'INSERT/DELETE client : uniquement via fonction sécurisée / triggers
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_title text,
  p_body text,
  p_type text DEFAULT 'info',
  p_href text DEFAULT NULL,
  p_meta jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
BEGIN
  IF p_user_id IS NULL OR p_title IS NULL OR p_body IS NULL THEN
    RETURN NULL;
  END IF;
  INSERT INTO public.notifications (user_id, title, body, type, href, meta)
  VALUES (p_user_id, p_title, p_body, COALESCE(p_type, 'info'), p_href, COALESCE(p_meta, '{}'::jsonb))
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_notification(uuid, text, text, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text, jsonb) TO service_role;

-- RDV : nouveau → psychologue ; confirm/cancel/complete → patient (+ psy si annulation patient)
CREATE OR REPLACE FUNCTION public.notify_on_appointment_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  psy_user uuid;
  patient_name text;
  when_label text;
BEGIN
  SELECT user_id INTO psy_user FROM public.psychologists WHERE id = NEW.psychologist_id;
  SELECT COALESCE(full_name, 'Un patient') INTO patient_name
  FROM public.profiles WHERE id = NEW.user_id;
  when_label := to_char(NEW.scheduled_at AT TIME ZONE 'Africa/Ouagadougou', 'DD/MM à HH24:MI');

  IF TG_OP = 'INSERT' THEN
    IF psy_user IS NOT NULL THEN
      PERFORM public.create_notification(
        psy_user,
        'Nouveau rendez-vous',
        CASE WHEN NEW.is_anonymous
          THEN 'Un patient anonyme a réservé le ' || when_label
          ELSE patient_name || ' a réservé le ' || when_label
        END,
        'appointment',
        '/dashboard/psychologue',
        jsonb_build_object('appointment_id', NEW.id, 'event', 'created')
      );
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    IF NEW.status = 'confirmed' THEN
      PERFORM public.create_notification(
        NEW.user_id,
        'Rendez-vous confirmé',
        'Votre consultation du ' || when_label || ' est confirmée.',
        'appointment',
        '/dashboard/consultation',
        jsonb_build_object('appointment_id', NEW.id, 'event', 'confirmed')
      );
    ELSIF NEW.status = 'cancelled' THEN
      PERFORM public.create_notification(
        NEW.user_id,
        'Rendez-vous annulé',
        'Votre consultation du ' || when_label || ' a été annulée.',
        'appointment',
        '/dashboard/consultation',
        jsonb_build_object('appointment_id', NEW.id, 'event', 'cancelled')
      );
      IF psy_user IS NOT NULL AND NEW.cancelled_by IS DISTINCT FROM psy_user THEN
        PERFORM public.create_notification(
          psy_user,
          'Rendez-vous annulé',
          CASE WHEN NEW.is_anonymous
            THEN 'Un patient anonyme a annulé le RDV du ' || when_label
            ELSE patient_name || ' a annulé le RDV du ' || when_label
          END,
          'appointment',
          '/dashboard/psychologue',
          jsonb_build_object('appointment_id', NEW.id, 'event', 'cancelled')
        );
      END IF;
    ELSIF NEW.status = 'completed' THEN
      PERFORM public.create_notification(
        NEW.user_id,
        'Consultation terminée',
        'Votre séance du ' || when_label || ' est terminée. Vous pouvez laisser une note.',
        'appointment',
        '/dashboard/consultation',
        jsonb_build_object('appointment_id', NEW.id, 'event', 'completed')
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_appointment ON public.appointments;
CREATE TRIGGER trg_notify_appointment
  AFTER INSERT OR UPDATE OF status ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_appointment_change();

-- Commandes : assignation livreur, ready, completed, cancelled
CREATE OR REPLACE FUNCTION public.notify_on_order_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.livreur_id IS NOT NULL
       AND (OLD.livreur_id IS DISTINCT FROM NEW.livreur_id)
       AND NEW.status IN ('ready', 'delivering') THEN
      PERFORM public.create_notification(
        NEW.livreur_id,
        'Nouvelle livraison assignée',
        'Une commande vous a été assignée — ouvrez Livraisons.',
        'order',
        '/dashboard/livreur',
        jsonb_build_object('order_id', NEW.id, 'event', 'assigned')
      );
    END IF;

    IF OLD.status IS DISTINCT FROM NEW.status THEN
      IF NEW.status = 'ready' THEN
        PERFORM public.create_notification(
          NEW.user_id,
          'Commande prête',
          'Votre commande est prête pour la livraison.',
          'order',
          '/dashboard/commandes',
          jsonb_build_object('order_id', NEW.id, 'event', 'ready')
        );
      ELSIF NEW.status = 'delivering' THEN
        PERFORM public.create_notification(
          NEW.user_id,
          'Livraison en cours',
          'Le livreur est en route vers vous.',
          'order',
          '/dashboard/commandes',
          jsonb_build_object('order_id', NEW.id, 'event', 'delivering')
        );
      ELSIF NEW.status = 'completed' THEN
        PERFORM public.create_notification(
          NEW.user_id,
          'Commande livrée',
          'Votre commande a été livrée. Merci de noter le livreur si vous le souhaitez.',
          'order',
          '/dashboard/commandes',
          jsonb_build_object('order_id', NEW.id, 'event', 'completed')
        );
      ELSIF NEW.status = 'cancelled' THEN
        PERFORM public.create_notification(
          NEW.user_id,
          'Commande annulée',
          'Votre commande a été annulée.',
          'order',
          '/dashboard/commandes',
          jsonb_build_object('order_id', NEW.id, 'event', 'cancelled')
        );
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_order ON public.orders;
CREATE TRIGGER trg_notify_order
  AFTER UPDATE OF status, livreur_id ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_order_change();

-- Realtime pour badge live
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL;
END;
$$;
