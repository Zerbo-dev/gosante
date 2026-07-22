-- Coffre chiffré côté client pour le journal de santé mentale

ALTER TABLE public.mental_health_journal
  ALTER COLUMN content DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS encrypted_content text,
  ADD COLUMN IF NOT EXISTS encryption_iv text;

ALTER TABLE public.mental_health_journal
  DROP CONSTRAINT IF EXISTS mental_health_journal_content_check;

ALTER TABLE public.mental_health_journal
  ADD CONSTRAINT mental_health_journal_content_check
  CHECK (
    (content IS NOT NULL AND length(trim(content)) > 0)
    OR (encrypted_content IS NOT NULL AND encryption_iv IS NOT NULL)
  );

CREATE TABLE IF NOT EXISTS public.mental_journal_vaults (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  salt text NOT NULL,
  verifier text NOT NULL,
  verifier_iv text NOT NULL,
  iterations integer NOT NULL DEFAULT 310000 CHECK (iterations >= 200000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mental_journal_vaults ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS mental_journal_vault_own_select ON public.mental_journal_vaults;
CREATE POLICY mental_journal_vault_own_select
  ON public.mental_journal_vaults FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS mental_journal_vault_own_insert ON public.mental_journal_vaults;
CREATE POLICY mental_journal_vault_own_insert
  ON public.mental_journal_vaults FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS mental_journal_vault_own_update ON public.mental_journal_vaults;
CREATE POLICY mental_journal_vault_own_update
  ON public.mental_journal_vaults FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS mental_journal_vault_own_delete ON public.mental_journal_vaults;
CREATE POLICY mental_journal_vault_own_delete
  ON public.mental_journal_vaults FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mental_journal_vaults TO authenticated;
