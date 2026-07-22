WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 17673,
    "name": "Pharmacie ADAMA",
    "address": "En face du Marché de Pissy non loin de la Caisse Populaire",
    "city": "Ouagadougou",
    "phone": "+226 62 33 77 77",
    "latitude": 12.336,
    "longitude": -1.568,
    "is_on_duty": false
  },
  {
    "external_id": 51,
    "name": "Pharmacie AEROPORT",
    "address": "Face à l’ASECNA à 500m de l’Aeroport International de Ouagadougou",
    "city": "Ouagadougou",
    "phone": "+226 25 31 42 22",
    "latitude": 12.351,
    "longitude": -1.521,
    "is_on_duty": false
  },
  {
    "external_id": 104,
    "name": "Pharmacie AIMEVO",
    "address": "Situé à côté de l'ONEA de Karpalla",
    "city": "Ouagadougou",
    "phone": "+226 25 39 63 99",
    "latitude": 12.339,
    "longitude": -1.48,
    "is_on_duty": true
  },
  {
    "external_id": 82,
    "name": "Pharmacie AMARO",
    "address": "Av. du Kadiogo Gounghin Petit Paris entre le service passeport et le pont Kadiogo",
    "city": "Ouagadougou",
    "phone": "+226 25 34 33 28",
    "latitude": 12.361,
    "longitude": -1.54,
    "is_on_duty": false
  },
  {
    "external_id": 74796,
    "name": "Pharmacie AMINA",
    "address": "Située à Wemtenga, sur le même alignement que le maquis YING YANG",
    "city": "Ouagadougou",
    "phone": "+226 25 36 76 65",
    "latitude": 12.37,
    "longitude": -1.484,
    "is_on_duty": false
  },
  {
    "external_id": 1054,
    "name": "Pharmacie AMINE",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 19 97",
    "latitude": 11.199,
    "longitude": -4.323,
    "is_on_duty": false
  },
  {
    "external_id": 1078,
    "name": "Pharmacie AMIRBOUBA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 98 27 95",
    "latitude": 11.205,
    "longitude": -4.311,
    "is_on_duty": true
  },
  {
    "external_id": 71,
    "name": "Pharmacie AMITIE MIYOUGOU",
    "address": "Boulevard de la circulaire, sect. 25 Cissin, à 200m du marché de Paagla yiri",
    "city": "Ouagadougou",
    "phone": "+226 25 38 52 36",
    "latitude": 12.335,
    "longitude": -1.535,
    "is_on_duty": false
  },
  {
    "external_id": 65,
    "name": "Pharmacie ANGELE",
    "address": "Tampouy côté sud du Centre Médical Paul VI, face au monument des Martyrs.",
    "city": "Ouagadougou",
    "phone": "+226 25 35 07 17",
    "latitude": 12.39,
    "longitude": -1.563,
    "is_on_duty": false
  },
  {
    "external_id": 19145,
    "name": "Pharmacie AOUDI",
    "address": "CENTRE - VILLE SECTEUR 6",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 08 50",
    "latitude": 11.163,
    "longitude": -4.292,
    "is_on_duty": false
  },
  {
    "external_id": 94,
    "name": "Pharmacie AR-RAHMA",
    "address": "Av. Yatenga à Tampouy, face à la Caisse Populaire",
    "city": "Ouagadougou",
    "phone": "+226 25 35 09 86",
    "latitude": 12.39,
    "longitude": -1.574,
    "is_on_duty": false
  },
  {
    "external_id": 19081,
    "name": "Pharmacie ARCHANGES",
    "address": "Située à Sondogo, OUAGADOUGOU",
    "city": "Ouagadougou",
    "phone": "+226 79 20 01 83",
    "latitude": 12.33184289,
    "longitude": -1.58468243,
    "is_on_duty": false
  },
  {
    "external_id": 18918,
    "name": "Pharmacie ARZOUMA",
    "address": "Quartier Pissy, à 100m de la clinique du Plateau, non loin de la salle de ciné de Pissy",
    "city": "Ouagadougou",
    "phone": "+226 25 48 01 53",
    "latitude": 12.333,
    "longitude": -1.575,
    "is_on_duty": true
  },
  {
    "external_id": 58014,
    "name": "Pharmacie AUBE NOUVELLE",
    "address": "Située à côté du CSPS de Sarfalao",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 78 78",
    "latitude": 11.159,
    "longitude": -4.269,
    "is_on_duty": false
  },
  {
    "external_id": 1065,
    "name": "Pharmacie AUDREY",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 44 69",
    "latitude": 11.1668502,
    "longitude": -4.2420372,
    "is_on_duty": false
  },
  {
    "external_id": 47,
    "name": "Pharmacie AUGUSTINE",
    "address": "Sise à Ouaga 2000 à environ 300m de l’échangeur en partance vers le monument des martyres",
    "city": "Ouagadougou",
    "phone": "+226 25 37 61 00",
    "latitude": 12.326,
    "longitude": -1.503,
    "is_on_duty": false
  },
  {
    "external_id": 67352,
    "name": "Pharmacie BAANI",
    "address": "Arrondissement 12, Secteur 55, quartier Kossyam à 300m au nord de la colline de Tanwaka",
    "city": "Ouagadougou",
    "phone": "+226 77 52 00 36",
    "latitude": 12.271,
    "longitude": -1.49,
    "is_on_duty": false
  },
  {
    "external_id": 60452,
    "name": "Pharmacie BADENYA",
    "address": "Bobo 2010, côté nord mosquée d'Hadja, marché du soir et face à la station super oil",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 78 95",
    "latitude": 11.237,
    "longitude": -4.302,
    "is_on_duty": false
  },
  {
    "external_id": 112,
    "name": "Pharmacie BALKUY",
    "address": "Route de Pô, non loin de la Station Total",
    "city": "Ouagadougou",
    "phone": "+226 25 37 51 36",
    "latitude": 12.31,
    "longitude": -1.482,
    "is_on_duty": true
  },
  {
    "external_id": 18920,
    "name": "Pharmacie BAO NEERE",
    "address": "A Rimkiéta, non loin du marché de Songpélsé",
    "city": "Ouagadougou",
    "phone": "+226 25 45 88 88",
    "latitude": 12.374,
    "longitude": -1.586,
    "is_on_duty": false
  },
  {
    "external_id": 67,
    "name": "Pharmacie BAOWENDSOM",
    "address": "Tampouy sur le nouveau goudron du collège Notre Dame de l'Espérance non loin de \"La Roche\"",
    "city": "Ouagadougou",
    "phone": "+226 25 41 44 99",
    "latitude": 12.404,
    "longitude": -1.577,
    "is_on_duty": false
  },
  {
    "external_id": 18922,
    "name": "Pharmacie BASSINKO",
    "address": "A Rimkiéta, non loin du marché de Songpélsé",
    "city": "Ouagadougou",
    "phone": "+226 25 41 71 50",
    "latitude": 12.389,
    "longitude": -1.635,
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
