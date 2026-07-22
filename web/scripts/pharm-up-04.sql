WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 63489,
    "name": "Pharmacie GUESWENDE",
    "address": "Située à la Zone 1, entre le Lycée Privé Bangré Yiguia et le feu tricolore de la Maison de la femme sur le boulevard des Tensoba (ex-circulaire) non loin du bas-fonds aménagé",
    "city": "Ouagadougou",
    "phone": "+226 75 21 20 00",
    "latitude": 12.363008,
    "longitude": -1.478586,
    "is_on_duty": false
  },
  {
    "external_id": 55958,
    "name": "Pharmacie GUUDUMA",
    "address": "Situé à Karpalla, sur le nouveau goudron allant de Saaba à Ouaga 2000",
    "city": "Ouagadougou",
    "phone": "+226 25 46 54 09",
    "latitude": 12.331,
    "longitude": -1.485,
    "is_on_duty": false
  },
  {
    "external_id": 1037,
    "name": "Pharmacie HABIB",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 70 00 45 99",
    "latitude": 12.253,
    "longitude": -2.351,
    "is_on_duty": true
  },
  {
    "external_id": 1064,
    "name": "Pharmacie HADIM",
    "address": "",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 98 42 00",
    "latitude": 11.178,
    "longitude": -4.273,
    "is_on_duty": false
  },
  {
    "external_id": 72,
    "name": "Pharmacie HAMDALAYE",
    "address": "Quartier Hamdalaye près du marché du 10 Yaar",
    "city": "Ouagadougou",
    "phone": "+226 25 34 36 94",
    "latitude": 12.375,
    "longitude": -1.551,
    "is_on_duty": false
  },
  {
    "external_id": 796,
    "name": "Pharmacie HANAHIM",
    "address": "Bendogo",
    "city": "Ouagadougou",
    "phone": "+226 25 39 54 38",
    "latitude": 12.396,
    "longitude": -1.454,
    "is_on_duty": false
  },
  {
    "external_id": 48638,
    "name": "Pharmacie HANNIEL",
    "address": "Saaba",
    "city": "Ouagadougou",
    "phone": "+226 25 36 60 20",
    "latitude": 12.38,
    "longitude": -1.452,
    "is_on_duty": false
  },
  {
    "external_id": 1061,
    "name": "Pharmacie HARMONIE",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 07 17",
    "latitude": 11.158,
    "longitude": -4.321,
    "is_on_duty": false
  },
  {
    "external_id": 50305,
    "name": "Pharmacie HAVVAH",
    "address": "BOBO",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 75 98",
    "latitude": 11.165,
    "longitude": -4.305,
    "is_on_duty": false
  },
  {
    "external_id": 93,
    "name": "Pharmacie HIPPODROME",
    "address": "116 boulevard Tensoba Bugum, côté est de l’hippodrome de Nonsin",
    "city": "Ouagadougou",
    "phone": "+226 25 34 02 32",
    "latitude": 12.376,
    "longitude": -1.557,
    "is_on_duty": false
  },
  {
    "external_id": 10,
    "name": "Pharmacie HOPE",
    "address": "Route de fada, Nioko 1, Saaba en allant vers la Consolatrice",
    "city": "Ouagadougou",
    "phone": "+226 71 14 22 22",
    "latitude": 12.405,
    "longitude": -1.432,
    "is_on_duty": false
  },
  {
    "external_id": 128,
    "name": "Pharmacie HÔPITAL",
    "address": "A côté de l'hôpital Yalgado OUEDRAOGO",
    "city": "Ouagadougou",
    "phone": "+226 25 30 66 41",
    "latitude": 12.382,
    "longitude": -1.509,
    "is_on_duty": false
  },
  {
    "external_id": 1055,
    "name": "Pharmacie HÔPITAL",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 98 37 47",
    "latitude": 11.169,
    "longitude": -4.303,
    "is_on_duty": false
  },
  {
    "external_id": 19551,
    "name": "Pharmacie HORIZON",
    "address": "Situé sur le goudron en face de Palace Hôtel, non loin de IST Ouaga 2000 I",
    "city": "Ouagadougou",
    "phone": "+226 73 17 06 06",
    "latitude": 12.311,
    "longitude": -1.545,
    "is_on_duty": false
  },
  {
    "external_id": 134,
    "name": "Pharmacie INDEPENDANCE",
    "address": "Ouaga 2000, sur l'avenue de l'Ex-Joly Hotel, Actuel Zind-Naaba 2",
    "city": "Ouagadougou",
    "phone": "+226 78 83 61 24",
    "latitude": 12.312,
    "longitude": -1.525,
    "is_on_duty": true
  },
  {
    "external_id": 15777,
    "name": "Pharmacie IRIS",
    "address": "Situé à Bonheur ville, à côté du rond point de la transition",
    "city": "Ouagadougou",
    "phone": "+226 54 21 01 01",
    "latitude": 12.294,
    "longitude": -1.578,
    "is_on_duty": false
  },
  {
    "external_id": 8,
    "name": "Pharmacie JABNEEL",
    "address": "Route Côté Sud SONABEL Bendogo à 700M",
    "city": "Ouagadougou",
    "phone": "+226 25 36 66 01",
    "latitude": 12.389,
    "longitude": -1.458,
    "is_on_duty": false
  },
  {
    "external_id": 486,
    "name": "Pharmacie JEUNESSE",
    "address": "Blvd de la Jeunesse, Hamdalaye à 200m de l’hippodrome",
    "city": "Ouagadougou",
    "phone": "+226 25 34 35 04",
    "latitude": 12.372,
    "longitude": -1.558,
    "is_on_duty": true
  },
  {
    "external_id": 50,
    "name": "Pharmacie JoBeR",
    "address": "Pissy Secteur 6 (ex-sec. 17), en face du Château d’eau ONEA dit « Silmiraogo château ».",
    "city": "Ouagadougou",
    "phone": "+226 25 45 51 75",
    "latitude": 12.324,
    "longitude": -1.556,
    "is_on_duty": false
  },
  {
    "external_id": 1056,
    "name": "Pharmacie JOLEAN",
    "address": "SECT 22 COTÉ SUD CMA 22",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 98 21 20",
    "latitude": 11.201,
    "longitude": -4.315,
    "is_on_duty": false
  },
  {
    "external_id": 73451,
    "name": "Pharmacie JORIEL",
    "address": "Située à Bassinko",
    "city": "Ouagadougou",
    "phone": "+226 25 48 98 98",
    "latitude": 12.413,
    "longitude": -1.656,
    "is_on_duty": false
  },
  {
    "external_id": 33,
    "name": "Pharmacie JOURDAIN",
    "address": "Blvd Tansoba, 100m de l’hôpital pédiatrique",
    "city": "Ouagadougou",
    "phone": "+226 25 36 06 86",
    "latitude": 12.373,
    "longitude": -1.474,
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
