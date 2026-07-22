WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 117,
    "name": "Pharmacie VIEL",
    "address": "Route de Kamboincé , Porte des soeurs après CMA PAUL VI",
    "city": "Ouagadougou",
    "phone": "+226 25 45 98 25",
    "latitude": 12.425,
    "longitude": -1.551,
    "is_on_duty": false
  },
  {
    "external_id": 36417,
    "name": "Pharmacie VINCENT DE PAUL",
    "address": "Située à la Zone 1, à côté de Bangré Yiguia",
    "city": "Ouagadougou",
    "phone": "+226 02 04 77 77",
    "latitude": 12.359,
    "longitude": -1.474,
    "is_on_duty": false
  },
  {
    "external_id": 19289,
    "name": "Pharmacie VITALIS",
    "address": "YEGUERE SECTEUR 22",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 98 12 17",
    "latitude": 11.191,
    "longitude": -4.314,
    "is_on_duty": false
  },
  {
    "external_id": 70034,
    "name": "Pharmacie WAPPASI LAAFI",
    "address": "Située à Bonheur ville, à 300m du rond point de la transition",
    "city": "Ouagadougou",
    "phone": "+226 67 07 08 46",
    "latitude": 12.304,
    "longitude": -1.58,
    "is_on_duty": true
  },
  {
    "external_id": 13,
    "name": "Pharmacie WAYALGHIN",
    "address": "Secteur 42, Wayalghin, en Face du camps CRS",
    "city": "Ouagadougou",
    "phone": "+226 25 39 52 08",
    "latitude": 12.397,
    "longitude": -1.479,
    "is_on_duty": true
  },
  {
    "external_id": 36,
    "name": "Pharmacie WEND KUUNI",
    "address": "Blvd Charles De Gaulle non loin de la mosquée de l’AEEMB",
    "city": "Ouagadougou",
    "phone": "+226 25 36 20 15",
    "latitude": 12.375632,
    "longitude": -1.487486,
    "is_on_duty": false
  },
  {
    "external_id": 123,
    "name": "Pharmacie WEND LAMITA",
    "address": "Sect. n°8 avenue du Yatenga Face école Kologh-Naba",
    "city": "Ouagadougou",
    "phone": "+226 78 83 63 41",
    "latitude": 12.381,
    "longitude": -1.55,
    "is_on_duty": false
  },
  {
    "external_id": 68427,
    "name": "Pharmacie WEND PANGA",
    "address": "Située à la patte d’oie, non loin de de la grande mosquée de KANAZOE à 100 de la Station PETROFA côté ouest",
    "city": "Ouagadougou",
    "phone": "+226 25 50 29 29",
    "latitude": 12.317,
    "longitude": -1.53,
    "is_on_duty": false
  },
  {
    "external_id": 55866,
    "name": "Pharmacie WEND-DENDA",
    "address": "Sect. 9, quartier Ouidi, Avenue Yatenga, entre la station Total de Larlé et ECOBANK Ouidi",
    "city": "Ouagadougou",
    "phone": "+226 71 50 94 92",
    "latitude": 12.377,
    "longitude": -1.544,
    "is_on_duty": true
  },
  {
    "external_id": 99,
    "name": "Pharmacie WEND-YAM",
    "address": "Route de Ouahigouya, à la n des deux voies, 500m du marché de bétail",
    "city": "Ouagadougou",
    "phone": "+226 25 48 30 47",
    "latitude": 12.39,
    "longitude": -1.591,
    "is_on_duty": false
  },
  {
    "external_id": 1116,
    "name": "Pharmacie WOBI",
    "address": "DIARRADOUGOU SECT 1",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 36 97",
    "latitude": 11.185,
    "longitude": -4.298,
    "is_on_duty": true
  },
  {
    "external_id": 55743,
    "name": "Pharmacie YAN-MAROU",
    "address": "Située à Marcoussi",
    "city": "Ouagadougou",
    "phone": "+226 25 46 50 06",
    "latitude": 12.411,
    "longitude": -1.597,
    "is_on_duty": false
  },
  {
    "external_id": 124,
    "name": "Pharmacie YATHRIB",
    "address": "200m du marché de Saaba",
    "city": "Ouagadougou",
    "phone": "+226 25 40 23 88",
    "latitude": 12.373,
    "longitude": -1.42,
    "is_on_duty": false
  },
  {
    "external_id": 19317,
    "name": "Pharmacie YEMPABOU",
    "address": "Sur la route de Loumbila, après le passage piéton de Kossodo",
    "city": "Ouagadougou",
    "phone": "+226 25 39 40 61",
    "latitude": 12.43629,
    "longitude": -1.45106,
    "is_on_duty": true
  },
  {
    "external_id": 35,
    "name": "Pharmacie YENNENGA",
    "address": "Blvd Tansoba face à la mairie de BOGODOGO",
    "city": "Ouagadougou",
    "phone": "+226 25 37 03 37",
    "latitude": 12.351,
    "longitude": -1.488,
    "is_on_duty": true
  },
  {
    "external_id": 97,
    "name": "Pharmacie YENTEMA",
    "address": "Située sur le goudron de Nagrin, à 150m au Nord de la Cave du Sud",
    "city": "Ouagadougou",
    "phone": "+226 56 56 00 00",
    "latitude": 12.277,
    "longitude": -1.545,
    "is_on_duty": false
  },
  {
    "external_id": 113,
    "name": "Pharmacie ZIDOU",
    "address": "Balkuy, en face de l’immeuble Yelhi",
    "city": "Ouagadougou",
    "phone": "+226 61 07 88 60",
    "latitude": 12.304,
    "longitude": -1.476,
    "is_on_duty": false
  },
  {
    "external_id": 1341,
    "name": "Pharmacie ZOE",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 63 10 07 75",
    "latitude": 11.155,
    "longitude": -4.325,
    "is_on_duty": true
  },
  {
    "external_id": 26,
    "name": "Pharmacie ZONE 1",
    "address": "À 200m du marché de la Zone 1",
    "city": "Ouagadougou",
    "phone": "+226 25 48 15 13",
    "latitude": 12.367,
    "longitude": -1.47,
    "is_on_duty": true
  },
  {
    "external_id": 1042,
    "name": "Pharmacie ZOODO",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 07 05",
    "latitude": 12.261,
    "longitude": -2.36,
    "is_on_duty": false
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
