INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (17673, 'Pharmacie ADAMA', 'En face du Marché de Pissy non loin de la Caisse Populaire', 'Ouagadougou', '+226 62 33 77 77', 12.336, -1.568, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (51, 'Pharmacie AEROPORT', 'Face à l’ASECNA à 500m de l’Aeroport International de Ouagadougou', 'Ouagadougou', '+226 25 31 42 22', 12.351, -1.521, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (104, 'Pharmacie AIMEVO', 'Situé à côté de l''ONEA de Karpalla', 'Ouagadougou', '+226 25 39 63 99', 12.339, -1.48, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (82, 'Pharmacie AMARO', 'Av. du Kadiogo Gounghin Petit Paris entre le service passeport et le pont Kadiogo', 'Ouagadougou', '+226 25 34 33 28', 12.361, -1.54, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (74796, 'Pharmacie AMINA', 'Située à Wemtenga, sur le même alignement que le maquis YING YANG', 'Ouagadougou', '+226 25 36 76 65', 12.37, -1.484, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1054, 'Pharmacie AMINE', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 19 97', 11.199, -4.323, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1078, 'Pharmacie AMIRBOUBA', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 98 27 95', 11.205, -4.311, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (71, 'Pharmacie AMITIE MIYOUGOU', 'Boulevard de la circulaire, sect. 25 Cissin, à 200m du marché de Paagla yiri', 'Ouagadougou', '+226 25 38 52 36', 12.335, -1.535, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (65, 'Pharmacie ANGELE', 'Tampouy côté sud du Centre Médical Paul VI, face au monument des Martyrs.', 'Ouagadougou', '+226 25 35 07 17', 12.39, -1.563, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19145, 'Pharmacie AOUDI', 'CENTRE - VILLE SECTEUR 6', 'Bobo-Dioulasso', '+226 20 97 08 50', 11.163, -4.292, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (94, 'Pharmacie AR-RAHMA', 'Av. Yatenga à Tampouy, face à la Caisse Populaire', 'Ouagadougou', '+226 25 35 09 86', 12.39, -1.574, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19081, 'Pharmacie ARCHANGES', 'Située à Sondogo, OUAGADOUGOU', 'Ouagadougou', '+226 79 20 01 83', 12.33184289, -1.58468243, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (18918, 'Pharmacie ARZOUMA', 'Quartier Pissy, à 100m de la clinique du Plateau, non loin de la salle de ciné de Pissy', 'Ouagadougou', '+226 25 48 01 53', 12.333, -1.575, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (58014, 'Pharmacie AUBE NOUVELLE', 'Située à côté du CSPS de Sarfalao', 'Bobo-Dioulasso', '+226 20 97 78 78', 11.159, -4.269, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1065, 'Pharmacie AUDREY', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 95 44 69', 11.1668502, -4.2420372, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (47, 'Pharmacie AUGUSTINE', 'Sise à Ouaga 2000 à environ 300m de l’échangeur en partance vers le monument des martyres', 'Ouagadougou', '+226 25 37 61 00', 12.326, -1.503, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (67352, 'Pharmacie BAANI', 'Arrondissement 12, Secteur 55, quartier Kossyam à 300m au nord de la colline de Tanwaka', 'Ouagadougou', '+226 77 52 00 36', 12.271, -1.49, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (60452, 'Pharmacie BADENYA', 'Bobo 2010, côté nord mosquée d''Hadja, marché du soir et face à la station super oil', 'Bobo-Dioulasso', '+226 20 95 78 95', 11.237, -4.302, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (112, 'Pharmacie BALKUY', 'Route de Pô, non loin de la Station Total', 'Ouagadougou', '+226 25 37 51 36', 12.31, -1.482, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (18920, 'Pharmacie BAO NEERE', 'A Rimkiéta, non loin du marché de Songpélsé', 'Ouagadougou', '+226 25 45 88 88', 12.374, -1.586, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (67, 'Pharmacie BAOWENDSOM', 'Tampouy sur le nouveau goudron du collège Notre Dame de l''Espérance non loin de "La Roche"', 'Ouagadougou', '+226 25 41 44 99', 12.404, -1.577, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (18922, 'Pharmacie BASSINKO', 'A Rimkiéta, non loin du marché de Songpélsé', 'Ouagadougou', '+226 25 41 71 50', 12.389, -1.635, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (48, 'Pharmacie BEATITUDES', 'Blvd. France-Afrique Ouaga 2000 en face de la cite Azimo', 'Ouagadougou', '+226 25 37 47 11', 12.308, -1.529, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (64485, 'Pharmacie BEDJOU', 'Située en face du CSPS du secteur 51, non loin du Château d''eau ONEA de Karpalla', 'Ouagadougou', '+226 25 47 58 25', 12.344, -1.48, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (18923, 'Pharmacie BELLE VILLE', 'Route de Komsilga / BRAFASO / 75e Anniversaire AD', 'Ouagadougou', '+226 25 40 84 14', 12.308, -1.558, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (115, 'Pharmacie BENAIA', 'Katre-yaare ex secteur 29', 'Ouagadougou', '+226 25 37 28 30', 12.35, -1.479, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (111, 'Pharmacie BETHANIA', 'Av.Oumarou KANAZOE coté Est CBC', 'Ouagadougou', '+226 25 31 31 41', 12.364, -1.534, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1059, 'Pharmacie BETHEL', '639,RUE DR KAMBOU,SECTEUR 21,COLSAMA', 'Bobo-Dioulasso', '+226 20 97 37 59', 11.184, -4.321, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (51172, 'Pharmacie BLESSING', 'Belle ville à 1km du rond de la transition sur le goudron allant à BRAFASO', 'Ouagadougou', '+226 01 75 99 75', 12.282, -1.579, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19111, 'Pharmacie BOLIBANA', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 70 72 83 07', 11.242, -4.287, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (960, 'Pharmacie BONHEUR', 'Située à Bonheur ville', 'Ouagadougou', '+226 63 73 81 81', 12.314, -1.555, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1063, 'Pharmacie BOULEVARD', 'Sur le boulevard, collé à l''Hôtel Tounouma City', 'Bobo-Dioulasso', '+226 20 95 20 93', 11.184, -4.286, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (91, 'Pharmacie BOULMIOUGOU', 'Arrdt n°6, Sect 27, 166 rue de Boassa, Pissy à 200m du Complexe Scolaire Sainte-Famille', 'Ouagadougou', '+226 25 43 12 68', 12.335, -1.58, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (27, 'Pharmacie CAMILLE', 'Av. Charles De Gaule - Hôtel des nances de Dassasgho', 'Ouagadougou', '+226 25 36 61 27', 12.376, -1.479, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (118, 'Pharmacie CATHÉDRALE', '38, Av de la cathédrale, coté Ouest de la cathédrale, face à la station TOTAL', 'Ouagadougou', '+226 25 31 28 07', 12.363, -1.527, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (81, 'Pharmacie CENTRE', '460, Av. de la nation collée à Telecel siège', 'Ouagadougou', '+226 25 31 16 60', 12.3702664, -1.5244474, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1083, 'Pharmacie CHRIST ROI', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 95 58 53', 11.177, -4.248, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (37937, 'Pharmacie CHRIST VI', 'Située devant le marché de bétail de Tanghin', 'Ouagadougou', '+226 25 48 59 59', 12.392, -1.536, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (90, 'Pharmacie CIRCULAIRE SEDE', 'ex Sect. 15 face à la Station TOTAL Ouaga-inter', 'Ouagadougou', '+226 25 38 44 91', 12.333, -1.516, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (58625, 'Pharmacie COLMA', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 95 17 02', 11.201, -4.298, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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

INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
VALUES (134, 'Pharmacie INDEPENDANCE', 'Ouaga 2000, sur l''avenue de l''Ex-Joly Hotel, Actuel Zind-Naaba 2', 'Ouagadougou', '+226 78 83 61 24', 12.312, -1.525, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (15777, 'Pharmacie IRIS', 'Situé à Bonheur ville, à côté du rond point de la transition', 'Ouagadougou', '+226 54 21 01 01', 12.294, -1.578, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (8, 'Pharmacie JABNEEL', 'Route Côté Sud SONABEL Bendogo à 700M', 'Ouagadougou', '+226 25 36 66 01', 12.389, -1.458, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (486, 'Pharmacie JEUNESSE', 'Blvd de la Jeunesse, Hamdalaye à 200m de l’hippodrome', 'Ouagadougou', '+226 25 34 35 04', 12.372, -1.558, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (50, 'Pharmacie JoBeR', 'Pissy Secteur 6 (ex-sec. 17), en face du Château d’eau ONEA dit « Silmiraogo château ».', 'Ouagadougou', '+226 25 45 51 75', 12.324, -1.556, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1056, 'Pharmacie JOLEAN', 'SECT 22 COTÉ SUD CMA 22', 'Bobo-Dioulasso', '+226 20 98 21 20', 11.201, -4.315, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (73451, 'Pharmacie JORIEL', 'Située à Bassinko', 'Ouagadougou', '+226 25 48 98 98', 12.413, -1.656, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (33, 'Pharmacie JOURDAIN', 'Blvd Tansoba, 100m de l’hôpital pédiatrique', 'Ouagadougou', '+226 25 36 06 86', 12.373, -1.474, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (132, 'Pharmacie KADIOGO', '1207, avenue Kwamé N’krumah, immeuble CNSS ; Face à Coris Bank siège', 'Ouagadougou', '+226 25 31 87 88', 12.36, -1.517, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (52910, 'Pharmacie KALIFA TRAORE', 'Située à Pissy', 'Ouagadougou', '+226 25 43 21 21', 12.316, -1.564, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19175, 'Pharmacie KAMIN', 'Sect. 06 Gounghin, côté est du marché de Gounghin', 'Ouagadougou', '+226 25 34 30 28', 12.358, -1.546, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (1060, 'Pharmacie KANTA', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 66 10 51', 11.184, -4.33, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (129, 'Pharmacie KARPALA', 'Route CFAO-KARPALA (Hopital ex-Sect 30)', 'Ouagadougou', '+226 25 37 14 14', 12.332, -1.493, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (39, 'Pharmacie KATRA', 'Située à Kalgondé après la gare RAHIMO', 'Ouagadougou', '+226 25 37 20 13', 12.3469307, -1.5030307, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (76, 'Pharmacie KAWSAR', 'Karpala à 600m de la division scale (impôts)', 'Ouagadougou', '+226 73 20 77 87', 12.343, -1.469, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (12411, 'Pharmacie KO-VIIGA', 'RIMKIETA, 10030 BV 35005 OUAGADOUGOU Arrondissement 8, secteur 35', 'Ouagadougou', '+226 54 10 21 02', 12.385, -1.608, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (12, 'Pharmacie KOSSODO', 'En face de l’abattoir de Kossodo, après la BOA', 'Ouagadougou', '+226 25 35 63 04', 12.417, -1.473, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (32, 'Pharmacie KOULOUBA', 'Koulouba à 200m côté Ouest du marché de Boins-Yaaré', 'Ouagadougou', '+226 25 31 19 18', 12.367, -1.51, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (48329, 'Pharmacie KOUMA', 'Boulevard de l''Insurrection populaire (Ex-France-Afrique) Ouaga 2000, à 100m de Ouaga FM', 'Ouagadougou', '+226 25 38 57 42', 12.313, -1.529, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1043, 'Pharmacie KUILIG NOORE', 'KOUDOUGOU', 'Koudougou', '+226 25 44 11 88', 12.251, -2.374, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (57, 'Pharmacie LA CROIX', 'Gounghin, En face du LNBTP, à côté de ESCO-IGES', 'Ouagadougou', '+226 25 34 12 64', 12.362, -1.544, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (70, 'Pharmacie LA ROCHE', 'A 100M de la CNSS de TAMPUY, en Face de l''ecole NAKIEMZANGA', 'Ouagadougou', '+226 25 39 51 32', 12.396, -1.582, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1040, 'Pharmacie LAAFIA', 'KOUDOUGOU', 'Koudougou', '+226 25 44 00 00', 12.252, -2.362, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1529, 'Pharmacie LAFIA', 'SECT 10 ROUTE DE FARAMANA (VERS BOBO 2010)', 'Bobo-Dioulasso', '+226 20 95 54 37', 11.215, -4.31, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19114, 'Pharmacie LAKARI', 'SECTEUR 3 YOROKOKO 691', 'Bobo-Dioulasso', '+226 53 68 18 18', 11.176, -4.288, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (40064, 'Pharmacie LAME', 'Route de Bama, 200m de la station Ola Énergie', 'Bobo-Dioulasso', '+226 20 95 76 75', 11.226, -4.315, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (68425, 'Pharmacie LAMOUSSA DAVID', 'Av. du Général De Gaulles, en face du BUMIGEB', 'Bobo-Dioulasso', '+226 20 97 21 72', 11.171, -4.282, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (33711, 'Pharmacie LANIBOUGNA', 'Tanghin, quartier Nonghin, non loin de la Station Radar', 'Ouagadougou', '+226 25 48 07 97', 12.416, -1.524, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19721, 'Pharmacie LANZANE', 'En face de l’Auto-Ecole Magnicat à la Zone Une (1)', 'Ouagadougou', '+226 25 47 10 65', 12.364, -1.458, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (9756, 'Pharmacie LAURIERS', 'Située sur le goudron de Karpalla allant de NACO vers Gira Imana, située avant la station Shell', 'Ouagadougou', '+226 25 48 37 55', 12.336, -1.472, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (44, 'Pharmacie LE ROCHER', 'Rue séparant Ouaga 2000 et Pae d’oie à 1km de la Mosquée KANAZOE', 'Ouagadougou', '+226 25 40 83 87', 12.318, -1.518, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (38450, 'Pharmacie LENDIMI', 'Située à Balkuy, à 100m de l''Hôtel Viva', 'Ouagadougou', '+226 63 81 59 18', 12.304, -1.469, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (119, 'Pharmacie LES GRÂCES', 'Av. de la concorde nationale, secteur 17 Tanghin', 'Ouagadougou', '+226 60 80 80 77', 12.409, -1.514, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (64, 'Pharmacie LINA', 'Avenue Kwamé N’krumah non loin du Paradis des Meilleurs Vins', 'Ouagadougou', '+226 73 48 35 65', 12.355, -1.517, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (67726, 'Pharmacie LOBBO', 'Située à 300m au nord du Centre médical de Nagrin, juste à moins de 100m de l''entrée du marché de nagrin', 'Ouagadougou', '+226 25 48 26 48', 12.29, -1.535, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (108, 'Pharmacie LOUIS PASTEUR', 'Av. Dapoya à 400m de l’Église catholique', 'Ouagadougou', '+226 25 50 78 43', 12.381, -1.528, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1077, 'Pharmacie LUCIEN', '01 BP 1183 BOBO-DIOULASSO 01', 'Bobo-Dioulasso', '+226 20 97 51 52', 11.173, -4.297, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (84, 'Pharmacie MAGNIFICAT', 'Sect.50 Karpala, 1km après rue Sankara Inoussa, 300m du dernier six-mètre à gauche', 'Ouagadougou', '+226 25 41 29 90', 12.329, -1.477, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (85, 'Pharmacie MARE', 'Gounghin, non loin du Stade du 4 août', 'Ouagadougou', '+226 25 34 11 28', 12.367, -1.551, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19092, 'Pharmacie MARLASS', 'Tanghin sect. 17, après Arbr Yaar en face de la boulangerie Fatim', 'Ouagadougou', '+226 78 55 00 52', 12.406, -1.54, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (131, 'Pharmacie MARTIN', 'Av. de la Dignité, non loin de la radio SAVANE FM', 'Ouagadougou', '+226 25 50 84 59', 12.3280431, -1.5510473, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1081, 'Pharmacie MEDINE', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 09 10', 11.179, -4.299, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (11, 'Pharmacie MEIRA', 'Nioko 2 non loin du marché, route de Ziniaré, à 500m de la Station Total', 'Ouagadougou', '+226 25 65 12 46', 12.426, -1.463, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (89, 'Pharmacie METEBA', 'Ex Sect. 23 quartier Tanghin 365 rue JEAN-PAUL II', 'Ouagadougou', '+226 25 33 53 33', 12.395, -1.515, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (107, 'Pharmacie MINITCHE', 'Belleville non loin du rond-point de la transition.', 'Ouagadougou', '+226 72 25 76 76', 12.29, -1.574, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (102, 'Pharmacie MISERICORDE', 'Dassasgho, coté nord de l’Eglise de Karambiri à 300 mètres', 'Ouagadougou', '+226 25 65 22 64', 12.387, -1.463, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19544, 'Pharmacie MITSPAH', 'Ouagadougou, non loin de UPO, à 200M dans le quartier', 'Ouagadougou', '+226 25 45 85 85', 12.41, -1.46, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1085, 'Pharmacie MODERNE', 'SECT 1 EST MARCHÉ CENTRAL', 'Bobo-Dioulasso', '+226 20 97 02 50', 11.177, -4.298, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (6, 'Pharmacie MUSEE', 'Blvd Tansoba côté est du Mur du Musée National', 'Ouagadougou', '+226 25 36 68 41', 12.38, -1.469, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (77, 'Pharmacie NAAB RAGA', 'Samandin, Avenue Oumarou KANAZOE à 100m du marché de Naab Raga', 'Ouagadougou', '+226 70 14 39 77', 12.3523313, -1.5317179, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (79, 'Pharmacie NAABA-KOOM', '200m de la Clinique Notre-Dame-de-la-Paix', 'Ouagadougou', '+226 25 48 33 34', 12.399, -1.503, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (49, 'Pharmacie NAGRIN', 'Route de Saponé avant l‘hôpital Blaise Compaoré', 'Ouagadougou', '+226 25 46 90 48', 12.266, -1.531, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (53675, 'Pharmacie NANLE', 'Située sur nouveau goudron allant de la Patte d''Oie à Cissin, devant la Pharmacie Santé Vitalité', 'Ouagadougou', '+226 25 47 70 80', 12.329, -1.543, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (31, 'Pharmacie NATILGE', 'Bvd Tansoaba Waonre, en face du feu tricolore de l’IDS', 'Ouagadougou', '+226 25 37 28 00', 12.359, -1.483, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (69391, 'Pharmacie NAYALGBA', 'Située en face du CSPS de KOUMDANYORE à 400m du commissariat de l’arrondissement 8', 'Ouagadougou', '+226 25 40 73 25', 12.364, -1.617, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (75, 'Pharmacie NAYYIRA', 'Katre Yaar après la gare de taxis', 'Ouagadougou', '+226 25 48 18 41', 12.347, -1.474, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1527, 'Pharmacie NAZINDI-GOUBA', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 57 57', 11.196, -4.292, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (1067, 'Pharmacie NAZOUNKI', 'SECT 22 À 300M DU STADE OMNISPORT SANGOULE LAMIZANA', 'Bobo-Dioulasso', '+226 20 97 31 00', 11.19, -4.326, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (30, 'Pharmacie NEMADIS', 'Rue Bogodogo à 500m du Rond point SANDOF en direction de SOGEL B (vers le SIAO)', 'Ouagadougou', '+226 25 48 09 66', 12.357, -1.491, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (54880, 'Pharmacie NIOKO 1', 'Située sur le nouveau goudron de Saaba, à côté de la route de Fada', 'Ouagadougou', '+226 61 97 70 48', 12.394, -1.432, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (66, 'Pharmacie NONGUI', 'Tampouy vers l’école Toecin', 'Ouagadougou', '+226 25 40 84 88', 12.386, -1.575, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19141, 'Pharmacie NONSIN', 'Nonsin, Rue 19.100 à côté du rond point des rails, route de Rimkieta', 'Ouagadougou', '+226 25 41 77 76', 12.37467922, -1.5702447, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (40265, 'Pharmacie OUEDRAOGO REMI', 'Av. des Tansoba KIEMA, sous l''immeuble résidence Alice face à la SONABEL Zad', 'Ouagadougou', '+226 25 37 16 52', 12.335, -1.499, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (64180, 'Pharmacie OULAGNAN TRAORE', 'Située au quartier Accart ville,  secteur N°9, Arrondissement N°6, non loin du marché de fruits.', 'Bobo-Dioulasso', '+226 57 93 93 56', 11.176, -4.313, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (32600, 'Pharmacie PINGDBA', 'Petit goudron allant vers Saaba, à côté du marché de 14 Yaar', 'Ouagadougou', '+226 78 37 93 81', 12.3734246, -1.4648036, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (52, 'Pharmacie PISSY', 'Côté Est CMA de Pissy', 'Ouagadougou', '+226 25 43 13 35', 12.337, -1.564, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (61079, 'Pharmacie PRIM SANTE', 'Situé non loin de l''échangeur de Gounghin, 200m du cimétière de Gounghin', 'Ouagadougou', '+226 50 04 89 92', 12.342, -1.553, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (56582, 'Pharmacie PROGRES', 'Pissy, route de Bobo, face à UBIPHARM', 'Ouagadougou', '+226 25 43 01 62', 12.343, -1.569, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19139, 'Pharmacie PROVIDENCE', 'Larlé, à 200m de la gare STAF', 'Ouagadougou', '+226 25 31 86 48', 12.373, -1.539, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (60555, 'Pharmacie RACHEL YAGMA', 'YAGMA, Côté Est du Sanctuaire marial, sur la nouvelle voie YAGMA - KAMBOINSIN, à 30 mètres du Groupe Scolaire EDIF, et du Centre de Formation Professionnelle de Yagma', 'Ouagadougou', '+226 25 40 70 09', 12.439, -1.601, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (69, 'Pharmacie RAKISMANEGRE', 'Non loin du Chateau d’eau de Tampouy, sur la voie de la nouvelle mairie de l’arrdt 9', 'Ouagadougou', '+226 62 50 58 18', 12.418, -1.569, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (34132, 'Pharmacie RAYIBTIGA', 'Av Jean-Baptiste OUEDRAOGO, 800 m au Nord de la Clinique Notre Dame de la Paix a, Somgandé', 'Ouagadougou', '+226 65 32 11 53', 12.405, -1.506, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1342, 'Pharmacie REMEDIS', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 09 52', 11.165, -4.276, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (45400, 'Pharmacie RENAISSANCE (Ex-St JULIEN)', 'À 100m du rond-point de la Patte-d’oie, sur l‘avenue Bassawarga', 'Ouagadougou', '+226 68 91 10 10', 12.334, -1.529, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (38914, 'Pharmacie RIMA', 'Situé à Kamboinsin, sur la route menant à Pazani', 'Ouagadougou', '+226 50 61 07 07', 12.443, -1.564, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (56315, 'Pharmacie RIMKIETA', 'Située à proximité de la maison des jeunes de RIMKIETA', 'Ouagadougou', '+226 71 50 94 36', 12.373751, -1.615132, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (987, 'Pharmacie SAABA', 'A Saaba', 'Ouagadougou', '+226 25 40 86 99', 12.372, -1.429, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (60, 'Pharmacie SACRE-COEUR', 'Avenue Simon Compaoré, à 500m du lycée Mixte de Gounghin, en partant vers Watam Kaiser', 'Ouagadougou', '+226 25 34 60 60', 12.351, -1.546, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (42, 'Pharmacie SAHEL', 'Av. du Président Sangoulé LAMIZANA. Koulouba sur alignement du siège de ORANGE', 'Ouagadougou', '+226 25 31 81 95', 12.366, -1.515, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (127, 'Pharmacie SAINT BERNARD', 'Face à la trame d’accueil Ouaga 2000', 'Ouagadougou', '+226 25 45 14 82', 12.312, -1.489, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (121, 'Pharmacie SAINT JEAN', 'Rue 30.240 Blvd. Tansoaba; bâtiment de ISDA, 500m de l’Hôpital de Bogodgo ex-CMA 30', 'Ouagadougou', '+226 25 37 00 33', 12.343, -1.494, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (40, 'Pharmacie SAINT LAZARE', '1200 logts, à côté du Pont (du Canal) de Bons Yaare', 'Ouagadougou', '+226 25 36 86 48', 12.369, -1.5, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19113, 'Pharmacie SAKABY', 'Située en face de la station Total Énergies de SAKABY route de Dédougou', 'Bobo-Dioulasso', '+226 60 75 36 36', 11.217, -4.286, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (790, 'Pharmacie SAMANDIN EX-HEERA', '100m du théâtre populaire', 'Ouagadougou', '+226 50 35 53 78', 12.356, -1.534, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (58015, 'Pharmacie SAMBA', 'Située à Bindougousso, à 300m de la station Total Energies', 'Bobo-Dioulasso', '+226 04 37 24 24', 11.193, -4.265, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19110, 'Pharmacie SANITAS', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 22 42', 11.162, -4.251, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (55908, 'Pharmacie SENEVE', 'Située à Wayalghin, à environ 2km dans le 6m en face de la station Oryx située après l''Echangeur de l''Est en allant à Kossodo', 'Ouagadougou', '+226 50 35 35 40', 12.404, -1.465, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (1079, 'Pharmacie SIBIRI', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 79 02', 11.169, -4.251, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1098, 'Pharmacie SIFOMA', 'CENTRE - VILLE SECT 9 ACCART', 'Bobo-Dioulasso', '+226 20 97 19 65', 11.182, -4.307, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (101, 'Pharmacie SIG-NOGHIN', 'Av. Naaba Ziiwendé 150m du rond point de Rimkieta', 'Ouagadougou', '+226 25 35 09 77', 12.3899349, -1.5976862, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (53, 'Pharmacie SIGRI', '2828 Av. du Conseil de l’Entente Gounghin, non loin de la station Total et Marina Market', 'Ouagadougou', '+226 25 41 21 48', 12.358, -1.549, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (55565, 'Pharmacie SILOE', 'Samandin ,vers chez le Mogho-Naba en face du Château d’Eau  BAMA', 'Ouagadougou', '+226 25 40 27 46', 12.356, -1.527, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (73, 'Pharmacie SIRA', 'Route de Bobo, 100m de la Mairie de Boulmiougou', 'Ouagadougou', '+226 25 43 17 78', 12.342, -1.581, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (60297, 'Pharmacie SISAOLE', 'Sect 29 route de Nasso en face de la s Station Petro SAR sa.', 'Bobo-Dioulasso', '+226 77 57 56 06', 11.184, -4.344, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1082, 'Pharmacie SIYARA', 'SECT 1 FACE MARCHÉ CENTRAL', 'Bobo-Dioulasso', '+226 20 97 13 73', 11.176, -4.302, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1525, 'Pharmacie SOLIDARITE', 'Bobo Dioulasso', 'Bobo-Dioulasso', '+226 20 97 17 26', 11.187, -4.296, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19087, 'Pharmacie SOMKETA', 'Situé à Kamboinsin', 'Ouagadougou', '+226 05 05 74 00', 12.451, -1.551, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (37936, 'Pharmacie SONDOGO', 'Située à Sondogo', 'Ouagadougou', '+226 71 81 80 84', 12.318, -1.598, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (3, 'Pharmacie SONG-TAABA', '100m de la SONABEL Bendogo, Cité de l’avenir', 'Ouagadougou', '+226 25 36 64 62', 12.395, -1.46, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1080, 'Pharmacie SOULIGNE', 'SECT 1 À 20 M DE BIB', 'Bobo-Dioulasso', '+226 20 97 08 16', 11.174, -4.3, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (23, 'Pharmacie ST FRANCOIS D''ASSISE', 'Zone du bois, en face du goudron allant vers Yalgado', 'Ouagadougou', '+226 25 36 85 85', 12.388, -1.491, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (73487, 'Pharmacie ST MICHEL', 'Rimkiéta non loin de la phcie Barkwendé', 'Ouagadougou', '+226 79 79 18 24', 12.375, -1.598, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (50951, 'Pharmacie STE HENRIETTE', 'Koudougou', 'Koudougou', '+226 70 78 66 37', 12.26, -2.373, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1166, 'Pharmacie STE ODILE', 'Karpala, non loin du lycée Thomas SANKARA', 'Ouagadougou', '+226 51 69 77 77', 12.333, -1.463, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1044, 'Pharmacie STE PHILOMENE', 'KOUDOUGOU', 'Koudougou', '+226 25 44 11 44', 12.243, -2.363, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (67174, 'Pharmacie SŨ-MAASEM', 'Nioko 2 non loin du marché, route de Ziniaré, 500m avant la Station OLA', 'Ouagadougou', '+226 25 50 08 08', 12.433, -1.455, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19249, 'Pharmacie SYA', '01 BP 775 BOBO-DIOULASSO 01', 'Bobo-Dioulasso', '+226 20 97 79 93', 11.174, -4.279, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (34, 'Pharmacie TALBA', 'Av. Charles De Gaulle, face au Scolasticat, Zogona', 'Ouagadougou', '+226 25 36 22 25', 12.376, -1.491, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (1002, 'Pharmacie TALE', 'Pissy', 'Ouagadougou', '+226 71 62 08 08', 12.333, -1.605, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (116, 'Pharmacie TANKO', 'Face au CMA Paul VI sur la route de Kamboinsé', 'Ouagadougou', '+226 25 35 15 57', 12.399, -1.556, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (14, 'Pharmacie TAOKO', 'Blvd Tansoba, à 500m de l’échangeur de l’Est', 'Ouagadougou', '+226 25 36 69 27', 12.387, -1.468, TRUE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', 'De garde', NULL)
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
VALUES (19108, 'Pharmacie TENE', '', 'Bobo-Dioulasso', '+226 70 70 43 05', 11.185, -4.276, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (19093, 'Pharmacie TENEDIA', 'À 500 m de l''Université 2IE en face du CSPS DE KAMBOINSIN', 'Ouagadougou', '+226 63 93 00 19', 12.464, -1.555, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (15779, 'Pharmacie TI BANGRE', 'Située vers la sortie Ouest de Ouaga, devant la mairie de boulmiougou', 'Ouagadougou', '+226 25 45 45 95', 12.34, -1.586, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (67725, 'Pharmacie TIIS-YONDO', 'Situé à sonré à 100m du Centre Médical Saint Thérèse de l''enfant Jésus', 'Ouagadougou', '+226 50 37 27 27', 12.282, -1.573, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (86, 'Pharmacie TRYPANO', 'Derrière le Centre de Transfusion Sanguine (CNTS) Ouaga non loin de la Trypano', 'Ouagadougou', '+226 25 33 29 41', 12.381, -1.51, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (58, 'Pharmacie UNITE', 'Gounghin, Près de l''échangeur de l''ouest face au Jardin le Challenge', 'Ouagadougou', '+226 25 34 39 42', 12.352, -1.556, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (2, 'Pharmacie UNIVERS', 'Voie principale Saaba, à 500m de la Prefecture', 'Ouagadougou', '+226 25 41 99 65', 12.383, -1.426, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (117, 'Pharmacie VIEL', 'Route de Kamboincé , Porte des soeurs après CMA PAUL VI', 'Ouagadougou', '+226 25 45 98 25', 12.425, -1.551, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
VALUES (36417, 'Pharmacie VINCENT DE PAUL', 'Située à la Zone 1, à côté de Bangré Yiguia', 'Ouagadougou', '+226 02 04 77 77', 12.359, -1.474, FALSE, 'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)', NULL, NULL)
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
