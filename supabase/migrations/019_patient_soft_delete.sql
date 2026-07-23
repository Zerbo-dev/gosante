-- Soft-delete / archivage côté patient : on conserve les lignes en base.
-- deleted_at = données appartenant au patient (masquées partout côté app patient)
-- patient_deleted_at = historique partagé (commandes, RDV) masqué uniquement pour le patient

-- Carnet : historique médical
ALTER TABLE public.medical_history_entries
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS medical_history_entries_active_idx
  ON public.medical_history_entries (user_id, entry_date DESC)
  WHERE deleted_at IS NULL;

-- Journal santé mentale
ALTER TABLE public.mental_health_journal
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS mental_health_journal_active_idx
  ON public.mental_health_journal (user_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- Conversations assistant bien-être
ALTER TABLE public.mental_chat_threads
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS mental_chat_threads_active_idx
  ON public.mental_chat_threads (user_id, updated_at DESC)
  WHERE deleted_at IS NULL;

-- Notifications
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

CREATE INDEX IF NOT EXISTS notifications_user_active_idx
  ON public.notifications (user_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- Commandes : archivage patient (pharmacien / livreur / admin continuent de voir)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS patient_deleted_at timestamptz;

CREATE INDEX IF NOT EXISTS orders_patient_active_idx
  ON public.orders (user_id, created_at DESC)
  WHERE patient_deleted_at IS NULL;

-- Rendez-vous consultation : archivage patient
ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS patient_deleted_at timestamptz;

CREATE INDEX IF NOT EXISTS appointments_patient_active_idx
  ON public.appointments (user_id, scheduled_at DESC)
  WHERE patient_deleted_at IS NULL;

-- Le patient peut mettre à jour patient_deleted_at sur SES commandes
DROP POLICY IF EXISTS orders_patient_archive ON public.orders;
CREATE POLICY orders_patient_archive
  ON public.orders
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));
