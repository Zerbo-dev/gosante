WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
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
