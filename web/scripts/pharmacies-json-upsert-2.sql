WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 133,
    "name": "Pharmacie EL SHADDAI",
    "address": "Non loin du pont Anayele",
    "city": "Ouagadougou",
    "phone": "+226 25 41 00 02",
    "latitude": 12.414,
    "longitude": -1.463,
    "is_on_duty": false
  },
  {
    "external_id": 110,
    "name": "Pharmacie ELITE",
    "address": "Avenue Yennega route de Yagma",
    "city": "Ouagadougou",
    "phone": "+226 71 68 45 55",
    "latitude": 12.398,
    "longitude": -1.613,
    "is_on_duty": false
  },
  {
    "external_id": 20036,
    "name": "Pharmacie ESPERANCE",
    "address": "02 BP 1804 BOBO-DIOULASSO 02",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 47 17",
    "latitude": 11.189,
    "longitude": -4.27,
    "is_on_duty": false
  },
  {
    "external_id": 1041,
    "name": "Pharmacie FAAG-YONRE",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 02 30",
    "latitude": 12.25,
    "longitude": -2.363,
    "is_on_duty": false
  },
  {
    "external_id": 17730,
    "name": "Pharmacie FABERE",
    "address": "Sis à Tampouy, à 200m du complexe scolaire la sagesse sur la voie du collège Avé Maria en Direction du château d'eau de l'ONEA",
    "city": "Ouagadougou",
    "phone": "+226 25 41 05 75",
    "latitude": 12.413,
    "longitude": -1.571,
    "is_on_duty": true
  },
  {
    "external_id": 59,
    "name": "Pharmacie FASO",
    "address": "Blvd France - Afrique à 300m de l’agence BOA France Afrique, Pa e-d’oie",
    "city": "Ouagadougou",
    "phone": "+226 25 38 19 29",
    "latitude": 12.322198,
    "longitude": -1.5280526,
    "is_on_duty": false
  },
  {
    "external_id": 5,
    "name": "Pharmacie FRATERNITE",
    "address": "100m de ENAREF, côté ECOBANK",
    "city": "Ouagadougou",
    "phone": "+226 78 83 63 98",
    "latitude": 12.39,
    "longitude": -1.482,
    "is_on_duty": false
  },
  {
    "external_id": 19090,
    "name": "Pharmacie GALIAM",
    "address": "Tampouy, route de la mairie de Sig-Nonghin, non loin du rond point de la Cité AZIMO",
    "city": "Ouagadougou",
    "phone": "+226 25 65 31 65",
    "latitude": 12.4,
    "longitude": -1.566,
    "is_on_duty": true
  },
  {
    "external_id": 1039,
    "name": "Pharmacie GALYS",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 05 07",
    "latitude": 12.254,
    "longitude": -2.383,
    "is_on_duty": false
  },
  {
    "external_id": 68,
    "name": "Pharmacie GEORGETTE",
    "address": "Bassinko, route de Ouahigouya, à côté de la boulangerie Baraka",
    "city": "Ouagadougou",
    "phone": "+226 25 50 05 28",
    "latitude": 12.41,
    "longitude": -1.632,
    "is_on_duty": true
  },
  {
    "external_id": 69143,
    "name": "Pharmacie GOVA",
    "address": "Située au pied de l'échangeur du Nord en venant de Tanghin",
    "city": "Ouagadougou",
    "phone": "+226 74 44 42 09",
    "latitude": 12.392,
    "longitude": -1.551,
    "is_on_duty": false
  },
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
  },
  {
    "external_id": 132,
    "name": "Pharmacie KADIOGO",
    "address": "1207, avenue Kwamé N’krumah, immeuble CNSS ; Face à Coris Bank siège",
    "city": "Ouagadougou",
    "phone": "+226 25 31 87 88",
    "latitude": 12.36,
    "longitude": -1.517,
    "is_on_duty": false
  },
  {
    "external_id": 52910,
    "name": "Pharmacie KALIFA TRAORE",
    "address": "Située à Pissy",
    "city": "Ouagadougou",
    "phone": "+226 25 43 21 21",
    "latitude": 12.316,
    "longitude": -1.564,
    "is_on_duty": true
  },
  {
    "external_id": 19175,
    "name": "Pharmacie KAMIN",
    "address": "Sect. 06 Gounghin, côté est du marché de Gounghin",
    "city": "Ouagadougou",
    "phone": "+226 25 34 30 28",
    "latitude": 12.358,
    "longitude": -1.546,
    "is_on_duty": true
  },
  {
    "external_id": 1060,
    "name": "Pharmacie KANTA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 66 10 51",
    "latitude": 11.184,
    "longitude": -4.33,
    "is_on_duty": false
  },
  {
    "external_id": 129,
    "name": "Pharmacie KARPALA",
    "address": "Route CFAO-KARPALA (Hopital ex-Sect 30)",
    "city": "Ouagadougou",
    "phone": "+226 25 37 14 14",
    "latitude": 12.332,
    "longitude": -1.493,
    "is_on_duty": false
  },
  {
    "external_id": 39,
    "name": "Pharmacie KATRA",
    "address": "Située à Kalgondé après la gare RAHIMO",
    "city": "Ouagadougou",
    "phone": "+226 25 37 20 13",
    "latitude": 12.3469307,
    "longitude": -1.5030307,
    "is_on_duty": false
  },
  {
    "external_id": 76,
    "name": "Pharmacie KAWSAR",
    "address": "Karpala à 600m de la division scale (impôts)",
    "city": "Ouagadougou",
    "phone": "+226 73 20 77 87",
    "latitude": 12.343,
    "longitude": -1.469,
    "is_on_duty": false
  },
  {
    "external_id": 12411,
    "name": "Pharmacie KO-VIIGA",
    "address": "RIMKIETA, 10030 BV 35005 OUAGADOUGOU Arrondissement 8, secteur 35",
    "city": "Ouagadougou",
    "phone": "+226 54 10 21 02",
    "latitude": 12.385,
    "longitude": -1.608,
    "is_on_duty": false
  },
  {
    "external_id": 12,
    "name": "Pharmacie KOSSODO",
    "address": "En face de l’abattoir de Kossodo, après la BOA",
    "city": "Ouagadougou",
    "phone": "+226 25 35 63 04",
    "latitude": 12.417,
    "longitude": -1.473,
    "is_on_duty": false
  },
  {
    "external_id": 32,
    "name": "Pharmacie KOULOUBA",
    "address": "Koulouba à 200m côté Ouest du marché de Boins-Yaaré",
    "city": "Ouagadougou",
    "phone": "+226 25 31 19 18",
    "latitude": 12.367,
    "longitude": -1.51,
    "is_on_duty": false
  },
  {
    "external_id": 48329,
    "name": "Pharmacie KOUMA",
    "address": "Boulevard de l'Insurrection populaire (Ex-France-Afrique) Ouaga 2000, à 100m de Ouaga FM",
    "city": "Ouagadougou",
    "phone": "+226 25 38 57 42",
    "latitude": 12.313,
    "longitude": -1.529,
    "is_on_duty": false
  },
  {
    "external_id": 1043,
    "name": "Pharmacie KUILIG NOORE",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 11 88",
    "latitude": 12.251,
    "longitude": -2.374,
    "is_on_duty": false
  },
  {
    "external_id": 57,
    "name": "Pharmacie LA CROIX",
    "address": "Gounghin, En face du LNBTP, à côté de ESCO-IGES",
    "city": "Ouagadougou",
    "phone": "+226 25 34 12 64",
    "latitude": 12.362,
    "longitude": -1.544,
    "is_on_duty": false
  },
  {
    "external_id": 70,
    "name": "Pharmacie LA ROCHE",
    "address": "A 100M de la CNSS de TAMPUY, en Face de l'ecole NAKIEMZANGA",
    "city": "Ouagadougou",
    "phone": "+226 25 39 51 32",
    "latitude": 12.396,
    "longitude": -1.582,
    "is_on_duty": false
  },
  {
    "external_id": 1040,
    "name": "Pharmacie LAAFIA",
    "address": "KOUDOUGOU",
    "city": "KOUDOUGOU",
    "phone": "+226 25 44 00 00",
    "latitude": 12.252,
    "longitude": -2.362,
    "is_on_duty": false
  },
  {
    "external_id": 1529,
    "name": "Pharmacie LAFIA",
    "address": "SECT 10 ROUTE DE FARAMANA (VERS BOBO 2010)",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 54 37",
    "latitude": 11.215,
    "longitude": -4.31,
    "is_on_duty": true
  },
  {
    "external_id": 19114,
    "name": "Pharmacie LAKARI",
    "address": "SECTEUR 3 YOROKOKO 691",
    "city": "Bobo Dioulasso",
    "phone": "+226 53 68 18 18",
    "latitude": 11.176,
    "longitude": -4.288,
    "is_on_duty": false
  },
  {
    "external_id": 40064,
    "name": "Pharmacie LAME",
    "address": "Route de Bama, 200m de la station Ola Énergie",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 95 76 75",
    "latitude": 11.226,
    "longitude": -4.315,
    "is_on_duty": false
  },
  {
    "external_id": 68425,
    "name": "Pharmacie LAMOUSSA DAVID",
    "address": "Av. du Général De Gaulles, en face du BUMIGEB",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 21 72",
    "latitude": 11.171,
    "longitude": -4.282,
    "is_on_duty": false
  },
  {
    "external_id": 33711,
    "name": "Pharmacie LANIBOUGNA",
    "address": "Tanghin, quartier Nonghin, non loin de la Station Radar",
    "city": "Ouagadougou",
    "phone": "+226 25 48 07 97",
    "latitude": 12.416,
    "longitude": -1.524,
    "is_on_duty": false
  },
  {
    "external_id": 19721,
    "name": "Pharmacie LANZANE",
    "address": "En face de l’Auto-Ecole Magni cat à la Zone Une (1)",
    "city": "Ouagadougou",
    "phone": "+226 25 47 10 65",
    "latitude": 12.364,
    "longitude": -1.458,
    "is_on_duty": false
  },
  {
    "external_id": 9756,
    "name": "Pharmacie LAURIERS",
    "address": "Située sur le goudron de Karpalla allant de NACO vers Gira Imana, située avant la station Shell",
    "city": "Ouagadougou",
    "phone": "+226 25 48 37 55",
    "latitude": 12.336,
    "longitude": -1.472,
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
