-- Assignation livraison : lecture présence livreurs + claim commandes prêtes
DROP POLICY IF EXISTS profiles_livreur_presence_read ON public.profiles;
CREATE POLICY profiles_livreur_presence_read
  ON public.profiles
  FOR SELECT TO authenticated
  USING (role = 'livreur' AND livreur_online = true);

DROP POLICY IF EXISTS orders_livreur_read_unassigned ON public.orders;
CREATE POLICY orders_livreur_read_unassigned
  ON public.orders
  FOR SELECT TO authenticated
  USING (
    public.get_my_role() = 'livreur'
    AND status = 'ready'
    AND livreur_id IS NULL
  );

DROP POLICY IF EXISTS orders_livreur_update ON public.orders;
CREATE POLICY orders_livreur_update
  ON public.orders
  FOR UPDATE TO authenticated
  USING (
    public.get_my_role() = 'livreur'
    AND (
      livreur_id = (SELECT auth.uid())
      OR (status = 'ready' AND livreur_id IS NULL)
    )
  )
  WITH CHECK (
    public.get_my_role() = 'livreur'
    AND livreur_id = (SELECT auth.uid())
  );
