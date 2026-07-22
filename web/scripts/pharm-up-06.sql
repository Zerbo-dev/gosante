WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 44,
    "name": "Pharmacie LE ROCHER",
    "address": "Rue séparant Ouaga 2000 et Patte d’oie à 1km de la Mosquée KANAZOE",
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
