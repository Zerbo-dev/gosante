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
