-- Paiement mock GoSanté : mobile_money, card, cash (remplace geniuspay)

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;

UPDATE public.orders
SET payment_method = 'mobile_money'
WHERE payment_method = 'geniuspay';

ALTER TABLE public.orders
  ADD CONSTRAINT orders_payment_method_check
  CHECK (payment_method = ANY (ARRAY['mobile_money'::text, 'card'::text, 'cash'::text]));
