-- Auto-suppression des créneaux dont l'horaire de fin est passé.
CREATE OR REPLACE FUNCTION public.cleanup_past_psychologist_slots()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.psychologist_slots
  WHERE starts_at + make_interval(mins => duration_minutes) < now();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_past_psychologist_slots() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_past_psychologist_slots() TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_past_psychologist_slots() TO service_role;

-- Première passe immédiate
SELECT public.cleanup_past_psychologist_slots();

-- Planification horaire si pg_cron est disponible
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'pg_cron non installable: %', SQLERRM;
END;
$$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule(jobid)
    FROM cron.job
    WHERE jobname = 'cleanup-past-psychologist-slots';

    PERFORM cron.schedule(
      'cleanup-past-psychologist-slots',
      '15 * * * *',
      $$SELECT public.cleanup_past_psychologist_slots()$$
    );
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Planification cron ignorée: %', SQLERRM;
END;
$$;
