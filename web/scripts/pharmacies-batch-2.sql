INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (61, 'Pharmacie CONCORDE', 'Av. Kwame N''krumah, au carrefour de Zabre Daaga', 'Ouagadougou', '+226 25 31 29 49', 12.366, -1.519, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (59302, 'Pharmacie CONGO BLANDINE', 'Située au quartier belle ville secteur 28 sur le goudron de wapassi non loin de la clinique YAAB-YIRI', 'Ouagadougou', '+226 50 65 66 31', 12.31, -1.57, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (46, 'Pharmacie COURA', '200m côté ouest du rond-point des Droits Humains', 'Ouagadougou', '+226 25 38 83 90', 12.327, -1.519, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (18928, 'Pharmacie CRYSTAL', 'Face à la nouvelle Mairie de l’Arrdt 9 ; vers Centre  Medical DON ORIONE, sect 38"', 'Ouagadougou', '+226 60 46 08 08', 12.42, -1.559, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (18929, 'Pharmacie DANOUMA', '300m avant le rond-point de la transition en partant à Komsilga, à gauche', 'Ouagadougou', '+226 25 39 55 54', 12.297, -1.565, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (126, 'Pharmacie DAPOYA', 'Dapoya', 'Ouagadougou', '+226 25 31 84 31', 12.38, -1.523, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (7, 'Pharmacie DELWINDE', 'Sect. 42 de l''Arrdt. 10, à  700m de l''échangeur de l’EST (Kossodo) RN3', 'Ouagadougou', '+226 25 36 72 80', 12.401, -1.472, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (51254, 'Pharmacie DES CITES', 'Situé à Bassinko, sur le nouveau goudron allant à la zone des cités', 'Ouagadougou', '+226 73 92 97 02', 12.416, -1.64, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (109, 'Pharmacie DESA', 'Côté Hôtel Ricardo (Tanghin)', 'Ouagadougou', '+226 25 47 50 50', 12.391, -1.524, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (41, 'Pharmacie DIABY', 'A côté du laboratoire du Centre à Koulouba', 'Ouagadougou', '+226 25 33 50 00', 12.3654022, -1.5163808, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19287, 'Pharmacie DINIE', 'Sortie Banfora, kuadeni, Bobo-Dioulasso', 'Bobo-Dioulasso', '+226 56 89 89 12', 11.1344723, -4.3200125, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (50443, 'Pharmacie DIVINE', 'Située à KILWIN, sur la route menant à Marcoussi', 'Ouagadougou', '+226 69 00 07 77', 12.398, -1.593, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (18932, 'Pharmacie DJIMBIA', '400m après le rond-point du Rotary, Tanghin', 'Ouagadougou', '+226 78 83 62 74', 12.401, -1.514, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (43, 'Pharmacie DOMINIQUE KABORE', '200 mètres du rond-point de la Pae d’oie, sur le blvd des Martyrs (ou blvd France - Afrique)', 'Ouagadougou', '+226 25 38 48 84', 12.33, -1.526, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (29, 'Pharmacie DUNIA', 'Avenue des Arts/ face au rond-point des Artistes ex sect. 14, 1200 logts', 'Ouagadougou', '+226 25 36 20 51', 12.359, -1.495, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (133, 'Pharmacie EL SHADDAI', 'Non loin du pont Anayele', 'Ouagadougou', '+226 25 41 00 02', 12.414, -1.463, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (110, 'Pharmacie ELITE', 'Avenue Yennega route de Yagma', 'Ouagadougou', '+226 71 68 45 55', 12.398, -1.613, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (20036, 'Pharmacie ESPERANCE', '02 BP 1804 BOBO-DIOULASSO 02', 'Bobo-Dioulasso', '+226 20 97 47 17', 11.189, -4.27, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1041, 'Pharmacie FAAG-YONRE', 'KOUDOUGOU', 'Koudougou', '+226 25 44 02 30', 12.25, -2.363, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (17730, 'Pharmacie FABERE', 'Sis à Tampouy, à 200m du complexe scolaire la sagesse sur la voie du collège Avé Maria en Direction du château d''eau de l''ONEA', 'Ouagadougou', '+226 25 41 05 75', 12.413, -1.571, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (59, 'Pharmacie FASO', 'Blvd France - Afrique à 300m de l’agence BOA France Afrique, Pae-d’oie', 'Ouagadougou', '+226 25 38 19 29', 12.322198, -1.5280526, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (5, 'Pharmacie FRATERNITE', '100m de ENAREF, côté ECOBANK', 'Ouagadougou', '+226 78 83 63 98', 12.39, -1.482, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19090, 'Pharmacie GALIAM', 'Tampouy, route de la mairie de Sig-Nonghin, non loin du rond point de la Cité AZIMO', 'Ouagadougou', '+226 25 65 31 65', 12.4, -1.566, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (1039, 'Pharmacie GALYS', 'KOUDOUGOU', 'Koudougou', '+226 25 44 05 07', 12.254, -2.383, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (68, 'Pharmacie GEORGETTE', 'Bassinko, route de Ouahigouya, à côté de la boulangerie Baraka', 'Ouagadougou', '+226 25 50 05 28', 12.41, -1.632, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (69143, 'Pharmacie GOVA', 'Située au pied de l''échangeur du Nord en venant de Tanghin', 'Ouagadougou', '+226 74 44 42 09', 12.392, -1.551, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (63489, 'Pharmacie GUESWENDE', 'Située à la Zone 1, entre le Lycée Privé Bangré Yiguia et le feu tricolore de la Maison de la femme sur le boulevard des Tensoba (ex-circulaire) non loin du bas-fonds aménagé', 'Ouagadougou', '+226 75 21 20 00', 12.363008, -1.478586, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (55958, 'Pharmacie GUUDUMA', 'Situé à Karpalla, sur le nouveau goudron allant de Saaba à Ouaga 2000', 'Ouagadougou', '+226 25 46 54 09', 12.331, -1.485, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1037, 'Pharmacie HABIB', 'KOUDOUGOU', 'Koudougou', '+226 70 00 45 99', 12.253, -2.351, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (1064, 'Pharmacie HADIM', '', 'Bobo-Dioulasso', '+226 20 98 42 00', 11.178, -4.273, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (72, 'Pharmacie HAMDALAYE', 'Quartier Hamdalaye près du marché du 10 Yaar', 'Ouagadougou', '+226 25 34 36 94', 12.375, -1.551, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (796, 'Pharmacie HANAHIM', 'Bendogo', 'Ouagadougou', '+226 25 39 54 38', 12.396, -1.454, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (48638, 'Pharmacie HANNIEL', 'Saaba', 'Ouagadougou', '+226 25 36 60 20', 12.38, -1.452, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1061, 'Pharmacie HARMONIE', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 07 17', 11.158, -4.321, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (50305, 'Pharmacie HAVVAH', 'BOBO', 'Bobo-Dioulasso', '+226 20 95 75 98', 11.165, -4.305, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (93, 'Pharmacie HIPPODROME', '116 boulevard Tensoba Bugum, côté est de l’hippodrome de Nonsin', 'Ouagadougou', '+226 25 34 02 32', 12.376, -1.557, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (10, 'Pharmacie HOPE', 'Route de fada, Nioko 1, Saaba en allant vers la Consolatrice', 'Ouagadougou', '+226 71 14 22 22', 12.405, -1.432, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (128, 'Pharmacie HÔPITAL', 'A côté de l''hôpital Yalgado OUEDRAOGO', 'Ouagadougou', '+226 25 30 66 41', 12.382, -1.509, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1055, 'Pharmacie HÔPITAL', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 98 37 47', 11.169, -4.303, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19551, 'Pharmacie HORIZON', 'Situé sur le goudron en face de Palace Hôtel, non loin de IST Ouaga 2000 I', 'Ouagadougou', '+226 73 17 06 06', 12.311, -1.545, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
