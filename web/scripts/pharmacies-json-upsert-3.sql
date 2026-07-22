WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 44,
    "name": "Pharmacie LE ROCHER",
    "address": "Rue séparant Ouaga 2000 et Pa e d’oie à 1km de la Mosquée KANAZOE",
    "city": "Ouagadougou",
    "phone": "+226 25 40 83 87",
    "latitude": 12.318,
    "longitude": -1.518,
    "is_on_duty": false
  },
  {
    "external_id": 38450,
    "name": "Pharmacie LENDIMI",
    "address": "Située à Balkuy, à 100m de l'Hôtel Viva",
    "city": "Ouagadougou",
    "phone": "+226 63 81 59 18",
    "latitude": 12.304,
    "longitude": -1.469,
    "is_on_duty": false
  },
  {
    "external_id": 119,
    "name": "Pharmacie LES GRÂCES",
    "address": "Av. de la concorde nationale, secteur 17 Tanghin",
    "city": "Ouagadougou",
    "phone": "+226 60 80 80 77",
    "latitude": 12.409,
    "longitude": -1.514,
    "is_on_duty": false
  },
  {
    "external_id": 64,
    "name": "Pharmacie LINA",
    "address": "Avenue Kwamé N’krumah non loin du Paradis des Meilleurs Vins",
    "city": "Ouagadougou",
    "phone": "+226 73 48 35 65",
    "latitude": 12.355,
    "longitude": -1.517,
    "is_on_duty": false
  },
  {
    "external_id": 67726,
    "name": "Pharmacie LOBBO",
    "address": "Située à 300m au nord du Centre médical de Nagrin, juste à moins de 100m de l'entrée du marché de nagrin",
    "city": "Ouagadougou",
    "phone": "+226 25 48 26 48",
    "latitude": 12.29,
    "longitude": -1.535,
    "is_on_duty": false
  },
  {
    "external_id": 108,
    "name": "Pharmacie LOUIS PASTEUR",
    "address": "Av. Dapoya à 400m de l’Église catholique",
    "city": "Ouagadougou",
    "phone": "+226 25 50 78 43",
    "latitude": 12.381,
    "longitude": -1.528,
    "is_on_duty": false
  },
  {
    "external_id": 1077,
    "name": "Pharmacie LUCIEN",
    "address": "01 BP 1183 BOBO-DIOULASSO 01",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 51 52",
    "latitude": 11.173,
    "longitude": -4.297,
    "is_on_duty": true
  },
  {
    "external_id": 84,
    "name": "Pharmacie MAGNIFICAT",
    "address": "Sect.50 Karpala, 1km après rue Sankara Inoussa, 300m du dernier six-mètre à gauche",
    "city": "Ouagadougou",
    "phone": "+226 25 41 29 90",
    "latitude": 12.329,
    "longitude": -1.477,
    "is_on_duty": false
  },
  {
    "external_id": 85,
    "name": "Pharmacie MARE",
    "address": "Gounghin, non loin du Stade du 4 août",
    "city": "Ouagadougou",
    "phone": "+226 25 34 11 28",
    "latitude": 12.367,
    "longitude": -1.551,
    "is_on_duty": false
  },
  {
    "external_id": 19092,
    "name": "Pharmacie MARLASS",
    "address": "Tanghin sect. 17, après Arbr Yaar en face de la boulangerie Fatim",
    "city": "Ouagadougou",
    "phone": "+226 78 55 00 52",
    "latitude": 12.406,
    "longitude": -1.54,
    "is_on_duty": false
  },
  {
    "external_id": 131,
    "name": "Pharmacie MARTIN",
    "address": "Av. de la Dignité, non loin de la radio SAVANE FM",
    "city": "Ouagadougou",
    "phone": "+226 25 50 84 59",
    "latitude": 12.3280431,
    "longitude": -1.5510473,
    "is_on_duty": false
  },
  {
    "external_id": 1081,
    "name": "Pharmacie MEDINE",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 09 10",
    "latitude": 11.179,
    "longitude": -4.299,
    "is_on_duty": false
  },
  {
    "external_id": 11,
    "name": "Pharmacie MEIRA",
    "address": "Nioko 2 non loin du marché, route de Ziniaré, à 500m de la Station Total",
    "city": "Ouagadougou",
    "phone": "+226 25 65 12 46",
    "latitude": 12.426,
    "longitude": -1.463,
    "is_on_duty": false
  },
  {
    "external_id": 89,
    "name": "Pharmacie METEBA",
    "address": "Ex Sect. 23 quartier Tanghin 365 rue JEAN-PAUL II",
    "city": "Ouagadougou",
    "phone": "+226 25 33 53 33",
    "latitude": 12.395,
    "longitude": -1.515,
    "is_on_duty": false
  },
  {
    "external_id": 107,
    "name": "Pharmacie MINITCHE",
    "address": "Belleville non loin du rond-point de la transition.",
    "city": "Ouagadougou",
    "phone": "+226 72 25 76 76",
    "latitude": 12.29,
    "longitude": -1.574,
    "is_on_duty": false
  },
  {
    "external_id": 102,
    "name": "Pharmacie MISERICORDE",
    "address": "Dassasgho, coté nord de l’Eglise de Karambiri à 300 mètres",
    "city": "Ouagadougou",
    "phone": "+226 25 65 22 64",
    "latitude": 12.387,
    "longitude": -1.463,
    "is_on_duty": false
  },
  {
    "external_id": 19544,
    "name": "Pharmacie MITSPAH",
    "address": "Ouagadougou, non loin de UPO, à 200M dans le quartier",
    "city": "Ouagadougou",
    "phone": "+226 25 45 85 85",
    "latitude": 12.41,
    "longitude": -1.46,
    "is_on_duty": false
  },
  {
    "external_id": 1085,
    "name": "Pharmacie MODERNE",
    "address": "SECT 1 EST MARCHÉ CENTRAL",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 02 50",
    "latitude": 11.177,
    "longitude": -4.298,
    "is_on_duty": false
  },
  {
    "external_id": 6,
    "name": "Pharmacie MUSEE",
    "address": "Blvd Tansoba côté est du Mur du Musée National",
    "city": "Ouagadougou",
    "phone": "+226 25 36 68 41",
    "latitude": 12.38,
    "longitude": -1.469,
    "is_on_duty": false
  },
  {
    "external_id": 77,
    "name": "Pharmacie NAAB RAGA",
    "address": "Samandin, Avenue Oumarou KANAZOE à 100m du marché de Naab Raga",
    "city": "Ouagadougou",
    "phone": "+226 70 14 39 77",
    "latitude": 12.3523313,
    "longitude": -1.5317179,
    "is_on_duty": true
  },
  {
    "external_id": 79,
    "name": "Pharmacie NAABA-KOOM",
    "address": "200m de la Clinique Notre-Dame-de-la-Paix",
    "city": "Ouagadougou",
    "phone": "+226 25 48 33 34",
    "latitude": 12.399,
    "longitude": -1.503,
    "is_on_duty": true
  },
  {
    "external_id": 49,
    "name": "Pharmacie NAGRIN",
    "address": "Route de Saponé avant l‘hôpital Blaise Compaoré",
    "city": "Ouagadougou",
    "phone": "+226 25 46 90 48",
    "latitude": 12.266,
    "longitude": -1.531,
    "is_on_duty": true
  },
  {
    "external_id": 53675,
    "name": "Pharmacie NANLE",
    "address": "Située sur nouveau goudron allant de la Patte d'Oie à Cissin, devant la Pharmacie Santé Vitalité",
    "city": "Ouagadougou",
    "phone": "+226 25 47 70 80",
    "latitude": 12.329,
    "longitude": -1.543,
    "is_on_duty": false
  },
  {
    "external_id": 31,
    "name": "Pharmacie NATILGE",
    "address": "Bvd Tansoaba Waonre, en face du feu tricolore de l’IDS",
    "city": "Ouagadougou",
    "phone": "+226 25 37 28 00",
    "latitude": 12.359,
    "longitude": -1.483,
    "is_on_duty": false
  },
  {
    "external_id": 69391,
    "name": "Pharmacie NAYALGBA",
    "address": "Située en face du CSPS de KOUMDANYORE à 400m du commissariat de l’arrondissement 8",
    "city": "Ouagadougou",
    "phone": "+226 25 40 73 25",
    "latitude": 12.364,
    "longitude": -1.617,
    "is_on_duty": true
  },
  {
    "external_id": 75,
    "name": "Pharmacie NAYYIRA",
    "address": "Katre Yaar après la gare de taxis",
    "city": "Ouagadougou",
    "phone": "+226 25 48 18 41",
    "latitude": 12.347,
    "longitude": -1.474,
    "is_on_duty": false
  },
  {
    "external_id": 1527,
    "name": "Pharmacie NAZINDI-GOUBA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 57 57",
    "latitude": 11.196,
    "longitude": -4.292,
    "is_on_duty": true
  },
  {
    "external_id": 1067,
    "name": "Pharmacie NAZOUNKI",
    "address": "SECT 22 À 300M DU STADE OMNISPORT SANGOULE LAMIZANA",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 31 00",
    "latitude": 11.19,
    "longitude": -4.326,
    "is_on_duty": true
  },
  {
    "external_id": 30,
    "name": "Pharmacie NEMADIS",
    "address": "Rue Bogodogo à 500m du Rond point SANDOF en direction de SOGEL B (vers le SIAO)",
    "city": "Ouagadougou",
    "phone": "+226 25 48 09 66",
    "latitude": 12.357,
    "longitude": -1.491,
    "is_on_duty": false
  },
  {
    "external_id": 54880,
    "name": "Pharmacie NIOKO 1",
    "address": "Située sur le nouveau goudron de Saaba, à côté de la route de Fada",
    "city": "Ouagadougou",
    "phone": "+226 61 97 70 48",
    "latitude": 12.394,
    "longitude": -1.432,
    "is_on_duty": false
  },
  {
    "external_id": 66,
    "name": "Pharmacie NONGUI",
    "address": "Tampouy vers l’école Toecin",
    "city": "Ouagadougou",
    "phone": "+226 25 40 84 88",
    "latitude": 12.386,
    "longitude": -1.575,
    "is_on_duty": false
  },
  {
    "external_id": 19141,
    "name": "Pharmacie NONSIN",
    "address": "Nonsin, Rue 19.100 à côté du rond point des rails, route de Rimkieta",
    "city": "Ouagadougou",
    "phone": "+226 25 41 77 76",
    "latitude": 12.37467922,
    "longitude": -1.5702447,
    "is_on_duty": true
  },
  {
    "external_id": 40265,
    "name": "Pharmacie OUEDRAOGO REMI",
    "address": "Av. des Tansoba KIEMA, sous l'immeuble résidence Alice face à la SONABEL Zad",
    "city": "Ouagadougou",
    "phone": "+226 25 37 16 52",
    "latitude": 12.335,
    "longitude": -1.499,
    "is_on_duty": false
  },
  {
    "external_id": 64180,
    "name": "Pharmacie OULAGNAN TRAORE",
    "address": "Située au quartier Accart ville, secteur N°9, Arrondissement N°6, non loin du marché de fruits.",
    "city": "Bobo Dioulasso",
    "phone": "+226 57 93 93 56",
    "latitude": 11.176,
    "longitude": -4.313,
    "is_on_duty": false
  },
  {
    "external_id": 32600,
    "name": "Pharmacie PINGDBA",
    "address": "Petit goudron allant vers Saaba, à côté du marché de 14 Yaar",
    "city": "Ouagadougou",
    "phone": "+226 78 37 93 81",
    "latitude": 12.3734246,
    "longitude": -1.4648036,
    "is_on_duty": false
  },
  {
    "external_id": 52,
    "name": "Pharmacie PISSY",
    "address": "Côté Est CMA de Pissy",
    "city": "Ouagadougou",
    "phone": "+226 25 43 13 35",
    "latitude": 12.337,
    "longitude": -1.564,
    "is_on_duty": true
  },
  {
    "external_id": 61079,
    "name": "Pharmacie PRIM SANTE",
    "address": "Situé non loin de l'échangeur de Gounghin, 200m du cimétière de Gounghin",
    "city": "Ouagadougou",
    "phone": "+226 50 04 89 92",
    "latitude": 12.342,
    "longitude": -1.553,
    "is_on_duty": false
  },
  {
    "external_id": 56582,
    "name": "Pharmacie PROGRES",
    "address": "Pissy, route de Bobo, face à UBIPHARM",
    "city": "Ouagadougou",
    "phone": "+226 25 43 01 62",
    "latitude": 12.343,
    "longitude": -1.569,
    "is_on_duty": false
  },
  {
    "external_id": 19139,
    "name": "Pharmacie PROVIDENCE",
    "address": "Larlé, à 200m de la gare STAF",
    "city": "Ouagadougou",
    "phone": "+226 25 31 86 48",
    "latitude": 12.373,
    "longitude": -1.539,
    "is_on_duty": false
  },
  {
    "external_id": 60555,
    "name": "Pharmacie RACHEL YAGMA",
    "address": "YAGMA, Côté Est du Sanctuaire marial, sur la nouvelle voie YAGMA - KAMBOINSIN, à 30 mètres du Groupe Scolaire EDIF, et du Centre de Formation Professionnelle de Yagma",
    "city": "Ouagadougou",
    "phone": "+226 25 40 70 09",
    "latitude": 12.439,
    "longitude": -1.601,
    "is_on_duty": false
  },
  {
    "external_id": 69,
    "name": "Pharmacie RAKISMANEGRE",
    "address": "Non loin du Chateau d’eau de Tampouy, sur la voie de la nouvelle mairie de l’arrdt 9",
    "city": "Ouagadougou",
    "phone": "+226 62 50 58 18",
    "latitude": 12.418,
    "longitude": -1.569,
    "is_on_duty": false
  },
  {
    "external_id": 34132,
    "name": "Pharmacie RAYIBTIGA",
    "address": "Av Jean-Baptiste OUEDRAOGO, 800 m au Nord de la Clinique Notre Dame de la Paix a, Somgandé",
    "city": "Ouagadougou",
    "phone": "+226 65 32 11 53",
    "latitude": 12.405,
    "longitude": -1.506,
    "is_on_duty": false
  },
  {
    "external_id": 1342,
    "name": "Pharmacie REMEDIS",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 09 52",
    "latitude": 11.165,
    "longitude": -4.276,
    "is_on_duty": false
  },
  {
    "external_id": 45400,
    "name": "Pharmacie RENAISSANCE (Ex-St JULIEN)",
    "address": "À 100m du rond-point de la Patte-d’oie, sur l‘avenue Bassawarga",
    "city": "Ouagadougou",
    "phone": "+226 68 91 10 10",
    "latitude": 12.334,
    "longitude": -1.529,
    "is_on_duty": true
  },
  {
    "external_id": 38914,
    "name": "Pharmacie RIMA",
    "address": "Situé à Kamboinsin, sur la route menant à Pazani",
    "city": "Ouagadougou",
    "phone": "+226 50 61 07 07",
    "latitude": 12.443,
    "longitude": -1.564,
    "is_on_duty": false
  },
  {
    "external_id": 56315,
    "name": "Pharmacie RIMKIETA",
    "address": "Située à proximité de la maison des jeunes de RIMKIETA",
    "city": "Ouagadougou",
    "phone": "+226 71 50 94 36",
    "latitude": 12.373751,
    "longitude": -1.615132,
    "is_on_duty": false
  },
  {
    "external_id": 987,
    "name": "Pharmacie SAABA",
    "address": "A Saaba",
    "city": "Ouagadougou",
    "phone": "+226 25 40 86 99",
    "latitude": 12.372,
    "longitude": -1.429,
    "is_on_duty": true
  },
  {
    "external_id": 60,
    "name": "Pharmacie SACRE-COEUR",
    "address": "Avenue Simon Compaoré, à 500m du lycée Mixte de Gounghin, en partant vers Watam Kaiser",
    "city": "Ouagadougou",
    "phone": "+226 25 34 60 60",
    "latitude": 12.351,
    "longitude": -1.546,
    "is_on_duty": true
  },
  {
    "external_id": 42,
    "name": "Pharmacie SAHEL",
    "address": "Av. du Président Sangoulé LAMIZANA. Koulouba sur alignement du siège de ORANGE",
    "city": "Ouagadougou",
    "phone": "+226 25 31 81 95",
    "latitude": 12.366,
    "longitude": -1.515,
    "is_on_duty": false
  },
  {
    "external_id": 127,
    "name": "Pharmacie SAINT BERNARD",
    "address": "Face à la trame d’accueil Ouaga 2000",
    "city": "Ouagadougou",
    "phone": "+226 25 45 14 82",
    "latitude": 12.312,
    "longitude": -1.489,
    "is_on_duty": false
  },
  {
    "external_id": 121,
    "name": "Pharmacie SAINT JEAN",
    "address": "Rue 30.240 Blvd. Tansoaba; bâtiment de ISDA, 500m de l’Hôpital de Bogodgo ex-CMA 30",
    "city": "Ouagadougou",
    "phone": "+226 25 37 00 33",
    "latitude": 12.343,
    "longitude": -1.494,
    "is_on_duty": false
  },
  {
    "external_id": 40,
    "name": "Pharmacie SAINT LAZARE",
    "address": "1200 logts, à côté du Pont (du Canal) de Bons Yaare",
    "city": "Ouagadougou",
    "phone": "+226 25 36 86 48",
    "latitude": 12.369,
    "longitude": -1.5,
    "is_on_duty": true
  },
  {
    "external_id": 19113,
    "name": "Pharmacie SAKABY",
    "address": "Située en face de la station Total Énergies de SAKABY route de Dédougou",
    "city": "Bobo Dioulasso",
    "phone": "+226 60 75 36 36",
    "latitude": 11.217,
    "longitude": -4.286,
    "is_on_duty": true
  },
  {
    "external_id": 790,
    "name": "Pharmacie SAMANDIN EX-HEERA",
    "address": "100m du théâtre populaire",
    "city": "Ouagadougou",
    "phone": "+226 50 35 53 78",
    "latitude": 12.356,
    "longitude": -1.534,
    "is_on_duty": false
  },
  {
    "external_id": 58015,
    "name": "Pharmacie SAMBA",
    "address": "Située à Bindougousso, à 300m de la station Total Energies",
    "city": "Bobo Dioulasso",
    "phone": "+226 04 37 24 24",
    "latitude": 11.193,
    "longitude": -4.265,
    "is_on_duty": true
  }
]
  $PHARMACIES_JSON$::jsonb) AS x(
    external_id int,
    name text,
    address text,
    city text,
    phone text,
    latitude double precision,
    longitude double precision,
    is_on_duty boolean
  )
),
norm AS (
  SELECT
    external_id,
    name,
    address,
    CASE
      WHEN lower(city) LIKE 'bobo%' THEN 'Bobo-Dioulasso'
      WHEN lower(city) LIKE 'koudougou%' OR upper(city) = 'KOUDOUGOU' THEN 'Koudougou'
      ELSE city
    END AS city,
    phone,
    latitude,
    longitude,
    COALESCE(is_on_duty, false) AS is_on_duty,
    'Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)' AS opening_hours,
    CASE WHEN COALESCE(is_on_duty, false) THEN 'De garde' ELSE NULL END AS status_label
  FROM src
)
INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)
SELECT external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, NULL
FROM norm
ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  phone = EXCLUDED.phone,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_on_duty = EXCLUDED.is_on_duty,
  opening_hours = EXCLUDED.opening_hours,
  status_label = EXCLUDED.status_label;
