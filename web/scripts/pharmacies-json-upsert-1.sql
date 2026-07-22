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
  },
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
    "address": "Av. Charles De Gaule - Hôtel des nances de Dassasgho",
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
  },
  {
    "external_id": 18929,
    "name": "Pharmacie DANOUMA",
    "address": "300m avant le rond-point de la transition en partant à Komsilga, à gauche",
    "city": "Ouagadougou",
    "phone": "+226 25 39 55 54",
    "latitude": 12.297,
    "longitude": -1.565,
    "is_on_duty": false
  },
  {
    "external_id": 126,
    "name": "Pharmacie DAPOYA",
    "address": "Dapoya",
    "city": "Ouagadougou",
    "phone": "+226 25 31 84 31",
    "latitude": 12.38,
    "longitude": -1.523,
    "is_on_duty": false
  },
  {
    "external_id": 7,
    "name": "Pharmacie DELWINDE",
    "address": "Sect. 42 de l'Arrdt. 10, à 700m de l'échangeur de l’EST (Kossodo) RN3",
    "city": "Ouagadougou",
    "phone": "+226 25 36 72 80",
    "latitude": 12.401,
    "longitude": -1.472,
    "is_on_duty": false
  },
  {
    "external_id": 51254,
    "name": "Pharmacie DES CITES",
    "address": "Situé à Bassinko, sur le nouveau goudron allant à la zone des cités",
    "city": "Ouagadougou",
    "phone": "+226 73 92 97 02",
    "latitude": 12.416,
    "longitude": -1.64,
    "is_on_duty": false
  },
  {
    "external_id": 109,
    "name": "Pharmacie DESA",
    "address": "Côté Hôtel Ricardo (Tanghin)",
    "city": "Ouagadougou",
    "phone": "+226 25 47 50 50",
    "latitude": 12.391,
    "longitude": -1.524,
    "is_on_duty": false
  },
  {
    "external_id": 41,
    "name": "Pharmacie DIABY",
    "address": "A côté du laboratoire du Centre à Koulouba",
    "city": "Ouagadougou",
    "phone": "+226 25 33 50 00",
    "latitude": 12.3654022,
    "longitude": -1.5163808,
    "is_on_duty": false
  },
  {
    "external_id": 19287,
    "name": "Pharmacie DINIE",
    "address": "Sortie Banfora, kuadeni, Bobo-Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 56 89 89 12",
    "latitude": 11.1344723,
    "longitude": -4.3200125,
    "is_on_duty": true
  },
  {
    "external_id": 50443,
    "name": "Pharmacie DIVINE",
    "address": "Située à KILWIN, sur la route menant à Marcoussi",
    "city": "Ouagadougou",
    "phone": "+226 69 00 07 77",
    "latitude": 12.398,
    "longitude": -1.593,
    "is_on_duty": false
  },
  {
    "external_id": 18932,
    "name": "Pharmacie DJIMBIA",
    "address": "400m après le rond-point du Rotary, Tanghin",
    "city": "Ouagadougou",
    "phone": "+226 78 83 62 74",
    "latitude": 12.401,
    "longitude": -1.514,
    "is_on_duty": true
  },
  {
    "external_id": 43,
    "name": "Pharmacie DOMINIQUE KABORE",
    "address": "200 mètres du rond-point de la Pa e d’oie, sur le blvd des Martyrs (ou blvd France - Afrique)",
    "city": "Ouagadougou",
    "phone": "+226 25 38 48 84",
    "latitude": 12.33,
    "longitude": -1.526,
    "is_on_duty": false
  },
  {
    "external_id": 29,
    "name": "Pharmacie DUNIA",
    "address": "Avenue des Arts/ face au rond-point des Artistes ex sect. 14, 1200 logts",
    "city": "Ouagadougou",
    "phone": "+226 25 36 20 51",
    "latitude": 12.359,
    "longitude": -1.495,
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
