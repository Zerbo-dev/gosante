-- Lecture des notes pour afficher la moyenne sur les fiches publiques
DROP POLICY IF EXISTS service_ratings_select ON public.service_ratings;
CREATE POLICY service_ratings_select
  ON public.service_ratings
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS service_ratings_insert_own ON public.service_ratings;
CREATE POLICY service_ratings_insert_own
  ON public.service_ratings
  FOR INSERT TO authenticated
  WITH CHECK (rater_id = (SELECT auth.uid()));

GRANT SELECT, INSERT ON public.service_ratings TO authenticated;
