-- Conversations d'écoute mentale persistantes
CREATE TABLE IF NOT EXISTS public.mental_chat_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Nouvelle conversation',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.mental_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.mental_chat_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mental_chat_threads_user
  ON public.mental_chat_threads (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_mental_chat_messages_thread
  ON public.mental_chat_messages (thread_id, created_at ASC);

ALTER TABLE public.mental_chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mental_chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS mental_chat_threads_own ON public.mental_chat_threads;
CREATE POLICY mental_chat_threads_own
  ON public.mental_chat_threads
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()) OR public.is_admin())
  WITH CHECK (user_id = (SELECT auth.uid()) OR public.is_admin());

DROP POLICY IF EXISTS mental_chat_messages_own ON public.mental_chat_messages;
CREATE POLICY mental_chat_messages_own
  ON public.mental_chat_messages
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()) OR public.is_admin())
  WITH CHECK (user_id = (SELECT auth.uid()) OR public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mental_chat_threads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mental_chat_messages TO authenticated;
