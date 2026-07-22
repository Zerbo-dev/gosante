-- Permettre la suppression d'un créneau même s'il est référencé par d'anciens RDV
ALTER TABLE public.appointments
  DROP CONSTRAINT IF EXISTS appointments_slot_id_fkey;

ALTER TABLE public.appointments
  ADD CONSTRAINT appointments_slot_id_fkey
  FOREIGN KEY (slot_id)
  REFERENCES public.psychologist_slots(id)
  ON DELETE SET NULL;
