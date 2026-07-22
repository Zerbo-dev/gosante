WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 48,
    "name": "Pharmacie BEATITUDES",
    "address": "Blvd. France-Afrique Ouaga 2000 en face de la cite Azimo",
    "city": "Ouagadougou",
    "phone": "+226 25 37 47 11",
    "latitude": 12.308,
    "longitude": -1.529,
    "is_on_duty": false
  },
  {
    "external_id": 64485,
    "name": "Pharmacie BEDJOU",
    "address": "Située en face du CSPS du secteur 51, non loin du Château d'eau ONEA de Karpalla",
    "city": "Ouagadougou",
    "phone": "+226 25 47 58 25",
    "latitude": 12.344,
    "longitude": -1.48,
    "is_on_duty": false
  },
  {
    "external_id": 18923,
    "name": "Pharmacie BELLE VILLE",
    "address": "Route de Komsilga / BRAFASO / 75e Anniversaire AD",
    "city": "Ouagadougou",
    "phone": "+226 25 40 84 14",
    "latitude": 12.308,
    "longitude": -1.558,
    "is_on_duty": true
  },
  {
    "external_id": 115,
    "name": "Pharmacie BENAIA",
    "address": "Katre-yaare ex secteur 29",
    "city": "Ouagadougou",
    "phone": "+226 25 37 28 30",
    "latitude": 12.35,
    "longitude": -1.479,
    "is_on_duty": false
  },
  {
    "external_id": 111,
    "name": "Pharmacie BETHANIA",
    "address": "Av.Oumarou KANAZOE coté Est CBC",
    "city": "Ouagadougou",
    "phone": "+226 25 31 31 41",
    "latitude": 12.364,
    "longitude": -1.534,
    "is_on_duty": false
  },
  {
    "external_id": 1059,
    "name": "Pharmacie BETHEL",
    "address": "639,RUE DR KAMBOU,SECTEUR 21,COLSAMA",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 37 59",
    "latitude": 11.184,
    "longitude": -4.321,
    "is_on_duty": true
  },
  {
    "external_id": 51172,
    "name": "Pharmacie BLESSING",
    "address": "Belle ville à 1km du rond de la transition sur le goudron allant à BRAFASO",
    "city": "Ouagadougou",
    "phone": "+226 01 75 99 75",
    "latitude": 12.282,
    "longitude": -1.579,
    "is_on_duty": true
  },
  {
    "external_id": 19111,
    "name": "Pharmacie BOLIBANA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 70 72 83 07",
    "latitude": 11.242,
    "longitude": -4.287,
    "is_on_duty": true
  },
  {
    "external_id": 960,
    "name": "Pharmacie BONHEUR",
    "address": "Située à Bonheur ville",
    "city": "Ouagadougou",
    "phone": "+226 63 73 81 81",
    "latitude": 12.314,
    "longitude": -1.555,
    "is_on_duty": false
  },
  {
    "external_id": 1063,
    "name": "Pharmacie BOULEVARD",
    "address": "Sur le boulevard, collé à l'Hôtel Tounouma City",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 20 93",
    "latitude": 11.184,
    "longitude": -4.286,
    "is_on_duty": true
  },
  {
    "external_id": 91,
    "name": "Pharmacie BOULMIOUGOU",
    "address": "Arrdt n°6, Sect 27, 166 rue de Boassa, Pissy à 200m du Complexe Scolaire Sainte-Famille",
    "city": "Ouagadougou",
    "phone": "+226 25 43 12 68",
    "latitude": 12.335,
    "longitude": -1.58,
    "is_on_duty": false
  },
  {
    "external_id": 27,
    "name": "Pharmacie CAMILLE",
    "address": "Av. Charles De Gaule - Hôtel des Finances de Dassasgho",
    "city": "Ouagadougou",
    "phone": "+226 25 36 61 27",
    "latitude": 12.376,
    "longitude": -1.479,
    "is_on_duty": false
  },
  {
    "external_id": 118,
    "name": "Pharmacie CATHÉDRALE",
    "address": "38, Av de la cathédrale, coté Ouest de la cathédrale, face à la station TOTAL",
    "city": "Ouagadougou",
    "phone": "+226 25 31 28 07",
    "latitude": 12.363,
    "longitude": -1.527,
    "is_on_duty": false
  },
  {
    "external_id": 81,
    "name": "Pharmacie CENTRE",
    "address": "460, Av. de la nation collée à Telecel siège",
    "city": "Ouagadougou",
    "phone": "+226 25 31 16 60",
    "latitude": 12.3702664,
    "longitude": -1.5244474,
    "is_on_duty": false
  },
  {
    "external_id": 1083,
    "name": "Pharmacie CHRIST ROI",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 58 53",
    "latitude": 11.177,
    "longitude": -4.248,
    "is_on_duty": true
  },
  {
    "external_id": 37937,
    "name": "Pharmacie CHRIST VI",
    "address": "Située devant le marché de bétail de Tanghin",
    "city": "Ouagadougou",
    "phone": "+226 25 48 59 59",
    "latitude": 12.392,
    "longitude": -1.536,
    "is_on_duty": true
  },
  {
    "external_id": 90,
    "name": "Pharmacie CIRCULAIRE SEDE",
    "address": "ex Sect. 15 face à la Station TOTAL Ouaga-inter",
    "city": "Ouagadougou",
    "phone": "+226 25 38 44 91",
    "latitude": 12.333,
    "longitude": -1.516,
    "is_on_duty": false
  },
  {
    "external_id": 58625,
    "name": "Pharmacie COLMA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 17 02",
    "latitude": 11.201,
    "longitude": -4.298,
    "is_on_duty": false
  },
  {
    "external_id": 61,
    "name": "Pharmacie CONCORDE",
    "address": "Av. Kwame N'krumah, au carrefour de Zabre Daaga",
    "city": "Ouagadougou",
    "phone": "+226 25 31 29 49",
    "latitude": 12.366,
    "longitude": -1.519,
    "is_on_duty": true
  },
  {
    "external_id": 59302,
    "name": "Pharmacie CONGO BLANDINE",
    "address": "Située au quartier belle ville secteur 28 sur le goudron de wapassi non loin de la clinique YAAB-YIRI",
    "city": "Ouagadougou",
    "phone": "+226 50 65 66 31",
    "latitude": 12.31,
    "longitude": -1.57,
    "is_on_duty": false
  },
  {
    "external_id": 46,
    "name": "Pharmacie COURA",
    "address": "200m côté ouest du rond-point des Droits Humains",
    "city": "Ouagadougou",
    "phone": "+226 25 38 83 90",
    "latitude": 12.327,
    "longitude": -1.519,
    "is_on_duty": true
  },
  {
    "external_id": 18928,
    "name": "Pharmacie CRYSTAL",
    "address": "Face à la nouvelle Mairie de l’Arrdt 9 ; vers Centre Medical DON ORIONE, sect 38\"",
    "city": "Ouagadougou",
    "phone": "+226 60 46 08 08",
    "latitude": 12.42,
    "longitude": -1.559,
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
