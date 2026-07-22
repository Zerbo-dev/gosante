WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
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
  },
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
  },
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
