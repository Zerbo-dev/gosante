INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (19289, 'Pharmacie VITALIS', 'YEGUERE SECTEUR 22', 'Bobo-Dioulasso', '+226 20 98 12 17', 11.191, -4.314, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (70034, 'Pharmacie WAPPASI LAAFI', 'Située à Bonheur ville, à 300m du rond point de la transition', 'Ouagadougou', '+226 67 07 08 46', 12.304, -1.58, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (13, 'Pharmacie WAYALGHIN', 'Secteur 42, Wayalghin, en Face du camps CRS', 'Ouagadougou', '+226 25 39 52 08', 12.397, -1.479, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (36, 'Pharmacie WEND KUUNI', 'Blvd Charles De Gaulle non loin de la mosquée de l’AEEMB', 'Ouagadougou', '+226 25 36 20 15', 12.375632, -1.487486, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (123, 'Pharmacie WEND LAMITA', 'Sect. n°8 avenue du Yatenga Face école Kologh-Naba', 'Ouagadougou', '+226 78 83 63 41', 12.381, -1.55, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (68427, 'Pharmacie WEND PANGA', 'Située à la patte d’oie, non loin de de la grande mosquée de KANAZOE à 100 de la Station PETROFA côté ouest', 'Ouagadougou', '+226 25 50 29 29', 12.317, -1.53, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (55866, 'Pharmacie WEND-DENDA', 'Sect. 9, quartier Ouidi, Avenue Yatenga, entre la station Total de Larlé et ECOBANK Ouidi', 'Ouagadougou', '+226 71 50 94 92', 12.377, -1.544, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (99, 'Pharmacie WEND-YAM', 'Route de Ouahigouya, à la n des deux voies, 500m du marché de bétail', 'Ouagadougou', '+226 25 48 30 47', 12.39, -1.591, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (1116, 'Pharmacie WOBI', 'DIARRADOUGOU SECT 1', 'Bobo-Dioulasso', '+226 20 97 36 97', 11.185, -4.298, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (55743, 'Pharmacie YAN-MAROU', 'Située à Marcoussi', 'Ouagadougou', '+226 25 46 50 06', 12.411, -1.597, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (124, 'Pharmacie YATHRIB', '200m du marché de Saaba', 'Ouagadougou', '+226 25 40 23 88', 12.373, -1.42, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (19317, 'Pharmacie YEMPABOU', 'Sur la route de Loumbila, après le passage piéton de Kossodo', 'Ouagadougou', '+226 25 39 40 61', 12.43629, -1.45106, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (35, 'Pharmacie YENNENGA', 'Blvd Tansoba face à la mairie de BOGODOGO', 'Ouagadougou', '+226 25 37 03 37', 12.351, -1.488, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (97, 'Pharmacie YENTEMA', 'Située sur le goudron de Nagrin, à 150m au Nord de la Cave du Sud', 'Ouagadougou', '+226 56 56 00 00', 12.277, -1.545, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (113, 'Pharmacie ZIDOU', 'Balkuy, en face de l’immeuble Yelhi', 'Ouagadougou', '+226 61 07 88 60', 12.304, -1.476, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (1341, 'Pharmacie ZOE', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 63 10 07 75', 11.155, -4.325, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (26, 'Pharmacie ZONE 1', 'À 200m du marché de la Zone 1', 'Ouagadougou', '+226 25 48 15 13', 12.367, -1.47, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (1042, 'Pharmacie ZOODO', 'KOUDOUGOU', 'Koudougou', '+226 25 44 07 05', 12.261, -2.36, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;
