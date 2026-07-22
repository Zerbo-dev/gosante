-- Ajout enum user_role (migration séparée obligatoire avant usage)
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'psychologue';
