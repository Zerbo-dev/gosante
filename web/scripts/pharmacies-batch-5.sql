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
