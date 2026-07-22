WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
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
  },
  {
    "external_id": 19110,
    "name": "Pharmacie SANITAS",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 22 42",
    "latitude": 11.162,
    "longitude": -4.251,
    "is_on_duty": false
  },
  {
    "external_id": 55908,
    "name": "Pharmacie SENEVE",
    "address": "Située à Wayalghin, à environ 2km dans le 6m en face de la station Oryx située après l'Echangeur de l'Est en allant à Kossodo",
    "city": "Ouagadougou",
    "phone": "+226 50 35 35 40",
    "latitude": 12.404,
    "longitude": -1.465,
    "is_on_duty": true
  },
  {
    "external_id": 1079,
    "name": "Pharmacie SIBIRI",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 79 02",
    "latitude": 11.169,
    "longitude": -4.251,
    "is_on_duty": false
  },
  {
    "external_id": 1098,
    "name": "Pharmacie SIFOMA",
    "address": "CENTRE - VILLE SECT 9 ACCART",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 19 65",
    "latitude": 11.182,
    "longitude": -4.307,
    "is_on_duty": true
  },
  {
    "external_id": 101,
    "name": "Pharmacie SIG-NOGHIN",
    "address": "Av. Naaba Ziiwendé 150m du rond point de Rimkieta",
    "city": "Ouagadougou",
    "phone": "+226 25 35 09 77",
    "latitude": 12.3899349,
    "longitude": -1.5976862,
    "is_on_duty": false
  },
  {
    "external_id": 53,
    "name": "Pharmacie SIGRI",
    "address": "2828 Av. du Conseil de l’Entente Gounghin, non loin de la station Total et Marina Market",
    "city": "Ouagadougou",
    "phone": "+226 25 41 21 48",
    "latitude": 12.358,
    "longitude": -1.549,
    "is_on_duty": false
  },
  {
    "external_id": 55565,
    "name": "Pharmacie SILOE",
    "address": "Samandin ,vers chez le Mogho-Naba en face du Château d’Eau BAMA",
    "city": "Ouagadougou",
    "phone": "+226 25 40 27 46",
    "latitude": 12.356,
    "longitude": -1.527,
    "is_on_duty": false
  },
  {
    "external_id": 73,
    "name": "Pharmacie SIRA",
    "address": "Route de Bobo, 100m de la Mairie de Boulmiougou",
    "city": "Ouagadougou",
    "phone": "+226 25 43 17 78",
    "latitude": 12.342,
    "longitude": -1.581,
    "is_on_duty": false
  },
  {
    "external_id": 60297,
    "name": "Pharmacie SISAOLE",
    "address": "Sect 29 route de Nasso en face de la s Station Petro SAR sa.",
    "city": "Bobo Dioulasso",
    "phone": "+226 77 57 56 06",
    "latitude": 11.184,
    "longitude": -4.344,
    "is_on_duty": false
  },
  {
    "external_id": 1082,
    "name": "Pharmacie SIYARA",
    "address": "SECT 1 FACE MARCHÉ CENTRAL",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 13 73",
    "latitude": 11.176,
    "longitude": -4.302,
    "is_on_duty": false
  },
  {
    "external_id": 1525,
    "name": "Pharmacie SOLIDARITE",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 17 26",
    "latitude": 11.187,
    "longitude": -4.296,
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
