WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 19087,
    "name": "Pharmacie SOMKETA",
    "address": "Situé à Kamboinsin",
    "city": "Ouagadougou",
    "phone": "+226 05 05 74 00",
    "latitude": 12.451,
    "longitude": -1.551,
    "is_on_duty": false
  },
  {
    "external_id": 37936,
    "name": "Pharmacie SONDOGO",
    "address": "Située à Sondogo",
    "city": "Ouagadougou",
    "phone": "+226 71 81 80 84",
    "latitude": 12.318,
    "longitude": -1.598,
    "is_on_duty": false
  },
  {
    "external_id": 3,
    "name": "Pharmacie SONG-TAABA",
    "address": "100m de la SONABEL Bendogo, Cité de l’avenir",
    "city": "Ouagadougou",
    "phone": "+226 25 36 64 62",
    "latitude": 12.395,
    "longitude": -1.46,
    "is_on_duty": false
  },
  {
    "external_id": 1080,
    "name": "Pharmacie SOULIGNE",
    "address": "SECT 1 À 20 M DE BIB",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 08 16",
    "latitude": 11.174,
    "longitude": -4.3,
    "is_on_duty": false
  },
  {
    "external_id": 23,
    "name": "Pharmacie ST FRANCOIS D'ASSISE",
    "address": "Zone du bois, en face du goudron allant vers Yalgado",
    "city": "Ouagadougou",
    "phone": "+226 25 36 85 85",
    "latitude": 12.388,
    "longitude": -1.491,
    "is_on_duty": false
  },
  {
    "external_id": 73487,
    "name": "Pharmacie ST MICHEL",
    "address": "Rimkiéta non loin de la phcie Barkwendé",
    "city": "Ouagadougou",
    "phone": "+226 79 79 18 24",
    "latitude": 12.375,
    "longitude": -1.598,
    "is_on_duty": true
  },
  {
    "external_id": 50951,
    "name": "Pharmacie STE HENRIETTE",
    "address": "Koudougou",
    "city": "KOUDOUGOU",
    "phone": "+226 70 78 66 37",
    "latitude": 12.26,
    "longitude": -2.373,
    "is_on_duty": false
  },
  {
    "external_id": 1166,
    "name": "Pharmacie STE ODILE",
    "address": "Karpala, non loin du lycée Thomas SANKARA",
    "city": "Ouagadougou",
    "phone": "+226 51 69 77 77",
    "latitude": 12.333,
    "longitude": -1.463,
    "is_on_duty": false
  },
  {
    "external_id": 1044,
    "name": "Pharmacie STE PHILOMENE",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 11 44",
    "latitude": 12.243,
    "longitude": -2.363,
    "is_on_duty": true
  },
  {
    "external_id": 67174,
    "name": "Pharmacie SŨ-MAASEM",
    "address": "Nioko 2 non loin du marché, route de Ziniaré, 500m avant la Station OLA",
    "city": "Ouagadougou",
    "phone": "+226 25 50 08 08",
    "latitude": 12.433,
    "longitude": -1.455,
    "is_on_duty": false
  },
  {
    "external_id": 19249,
    "name": "Pharmacie SYA",
    "address": "01 BP 775 BOBO-DIOULASSO 01",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 79 93",
    "latitude": 11.174,
    "longitude": -4.279,
    "is_on_duty": true
  },
  {
    "external_id": 34,
    "name": "Pharmacie TALBA",
    "address": "Av. Charles De Gaulle, face au Scolasticat, Zogona",
    "city": "Ouagadougou",
    "phone": "+226 25 36 22 25",
    "latitude": 12.376,
    "longitude": -1.491,
    "is_on_duty": false
  },
  {
    "external_id": 1002,
    "name": "Pharmacie TALE",
    "address": "Pissy",
    "city": "Ouagadougou",
    "phone": "+226 71 62 08 08",
    "latitude": 12.333,
    "longitude": -1.605,
    "is_on_duty": false
  },
  {
    "external_id": 116,
    "name": "Pharmacie TANKO",
    "address": "Face au CMA Paul VI sur la route de Kamboinsé",
    "city": "Ouagadougou",
    "phone": "+226 25 35 15 57",
    "latitude": 12.399,
    "longitude": -1.556,
    "is_on_duty": false
  },
  {
    "external_id": 14,
    "name": "Pharmacie TAOKO",
    "address": "Blvd Tansoba, à 500m de l’échangeur de l’Est",
    "city": "Ouagadougou",
    "phone": "+226 25 36 69 27",
    "latitude": 12.387,
    "longitude": -1.468,
    "is_on_duty": true
  },
  {
    "external_id": 19108,
    "name": "Pharmacie TENE",
    "address": "",
    "city": "Bobo Dioulasso",
    "phone": "+226 70 70 43 05",
    "latitude": 11.185,
    "longitude": -4.276,
    "is_on_duty": false
  },
  {
    "external_id": 19093,
    "name": "Pharmacie TENEDIA",
    "address": "À 500 m de l'Université 2IE en face du CSPS DE KAMBOINSIN",
    "city": "Ouagadougou",
    "phone": "+226 63 93 00 19",
    "latitude": 12.464,
    "longitude": -1.555,
    "is_on_duty": false
  },
  {
    "external_id": 15779,
    "name": "Pharmacie TI BANGRE",
    "address": "Située vers la sortie Ouest de Ouaga, devant la mairie de boulmiougou",
    "city": "Ouagadougou",
    "phone": "+226 25 45 45 95",
    "latitude": 12.34,
    "longitude": -1.586,
    "is_on_duty": false
  },
  {
    "external_id": 67725,
    "name": "Pharmacie TIIS-YONDO",
    "address": "Situé à sonré à 100m du Centre Médical Saint Thérèse de l'enfant Jésus",
    "city": "Ouagadougou",
    "phone": "+226 50 37 27 27",
    "latitude": 12.282,
    "longitude": -1.573,
    "is_on_duty": false
  },
  {
    "external_id": 86,
    "name": "Pharmacie TRYPANO",
    "address": "Derrière le Centre de Transfusion Sanguine (CNTS) Ouaga non loin de la Trypano",
    "city": "Ouagadougou",
    "phone": "+226 25 33 29 41",
    "latitude": 12.381,
    "longitude": -1.51,
    "is_on_duty": false
  },
  {
    "external_id": 58,
    "name": "Pharmacie UNITE",
    "address": "Gounghin, Près de l'échangeur de l'ouest face au Jardin le Challenge",
    "city": "Ouagadougou",
    "phone": "+226 25 34 39 42",
    "latitude": 12.352,
    "longitude": -1.556,
    "is_on_duty": false
  },
  {
    "external_id": 2,
    "name": "Pharmacie UNIVERS",
    "address": "Voie principale Saaba, à 500m de la Prefecture",
    "city": "Ouagadougou",
    "phone": "+226 25 41 99 65",
    "latitude": 12.383,
    "longitude": -1.426,
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
