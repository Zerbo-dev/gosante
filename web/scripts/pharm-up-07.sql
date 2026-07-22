WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
[
  {
    "external_id": 53675,
    "name": "Pharmacie NANLE",
    "address": "Située sur nouveau goudron allant de la Patte d'Oie à Cissin, devant la Pharmacie Santé Vitalité",
    "city": "Ouagadougou",
    "phone": "+226 25 47 70 80",
    "latitude": 12.329,
    "longitude": -1.543,
    "is_on_duty": false
  },
  {
    "external_id": 31,
    "name": "Pharmacie NATILGE",
    "address": "Bvd Tansoaba Waonre, en face du feu tricolore de l’IDS",
    "city": "Ouagadougou",
    "phone": "+226 25 37 28 00",
    "latitude": 12.359,
    "longitude": -1.483,
    "is_on_duty": false
  },
  {
    "external_id": 69391,
    "name": "Pharmacie NAYALGBA",
    "address": "Située en face du CSPS de KOUMDANYORE à 400m du commissariat de l’arrondissement 8",
    "city": "Ouagadougou",
    "phone": "+226 25 40 73 25",
    "latitude": 12.364,
    "longitude": -1.617,
    "is_on_duty": true
  },
  {
    "external_id": 75,
    "name": "Pharmacie NAYYIRA",
    "address": "Katre Yaar après la gare de taxis",
    "city": "Ouagadougou",
    "phone": "+226 25 48 18 41",
    "latitude": 12.347,
    "longitude": -1.474,
    "is_on_duty": false
  },
  {
    "external_id": 1527,
    "name": "Pharmacie NAZINDI-GOUBA",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 57 57",
    "latitude": 11.196,
    "longitude": -4.292,
    "is_on_duty": true
  },
  {
    "external_id": 1067,
    "name": "Pharmacie NAZOUNKI",
    "address": "SECT 22 À 300M DU STADE OMNISPORT SANGOULE LAMIZANA",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 31 00",
    "latitude": 11.19,
    "longitude": -4.326,
    "is_on_duty": true
  },
  {
    "external_id": 30,
    "name": "Pharmacie NEMADIS",
    "address": "Rue Bogodogo à 500m du Rond point SANDOF en direction de SOGEL B (vers le SIAO)",
    "city": "Ouagadougou",
    "phone": "+226 25 48 09 66",
    "latitude": 12.357,
    "longitude": -1.491,
    "is_on_duty": false
  },
  {
    "external_id": 54880,
    "name": "Pharmacie NIOKO 1",
    "address": "Située sur le nouveau goudron de Saaba, à côté de la route de Fada",
    "city": "Ouagadougou",
    "phone": "+226 61 97 70 48",
    "latitude": 12.394,
    "longitude": -1.432,
    "is_on_duty": false
  },
  {
    "external_id": 66,
    "name": "Pharmacie NONGUI",
    "address": "Tampouy vers l’école Toecin",
    "city": "Ouagadougou",
    "phone": "+226 25 40 84 88",
    "latitude": 12.386,
    "longitude": -1.575,
    "is_on_duty": false
  },
  {
    "external_id": 19141,
    "name": "Pharmacie NONSIN",
    "address": "Nonsin, Rue 19.100 à côté du rond point des rails, route de Rimkieta",
    "city": "Ouagadougou",
    "phone": "+226 25 41 77 76",
    "latitude": 12.37467922,
    "longitude": -1.5702447,
    "is_on_duty": true
  },
  {
    "external_id": 40265,
    "name": "Pharmacie OUEDRAOGO REMI",
    "address": "Av. des Tansoba KIEMA, sous l'immeuble résidence Alice face à la SONABEL Zad",
    "city": "Ouagadougou",
    "phone": "+226 25 37 16 52",
    "latitude": 12.335,
    "longitude": -1.499,
    "is_on_duty": false
  },
  {
    "external_id": 64180,
    "name": "Pharmacie OULAGNAN TRAORE",
    "address": "Située au quartier Accart ville, secteur N°9, Arrondissement N°6, non loin du marché de fruits.",
    "city": "Bobo Dioulasso",
    "phone": "+226 57 93 93 56",
    "latitude": 11.176,
    "longitude": -4.313,
    "is_on_duty": false
  },
  {
    "external_id": 32600,
    "name": "Pharmacie PINGDBA",
    "address": "Petit goudron allant vers Saaba, à côté du marché de 14 Yaar",
    "city": "Ouagadougou",
    "phone": "+226 78 37 93 81",
    "latitude": 12.3734246,
    "longitude": -1.4648036,
    "is_on_duty": false
  },
  {
    "external_id": 52,
    "name": "Pharmacie PISSY",
    "address": "Côté Est CMA de Pissy",
    "city": "Ouagadougou",
    "phone": "+226 25 43 13 35",
    "latitude": 12.337,
    "longitude": -1.564,
    "is_on_duty": true
  },
  {
    "external_id": 61079,
    "name": "Pharmacie PRIM SANTE",
    "address": "Situé non loin de l'échangeur de Gounghin, 200m du cimétière de Gounghin",
    "city": "Ouagadougou",
    "phone": "+226 50 04 89 92",
    "latitude": 12.342,
    "longitude": -1.553,
    "is_on_duty": false
  },
  {
    "external_id": 56582,
    "name": "Pharmacie PROGRES",
    "address": "Pissy, route de Bobo, face à UBIPHARM",
    "city": "Ouagadougou",
    "phone": "+226 25 43 01 62",
    "latitude": 12.343,
    "longitude": -1.569,
    "is_on_duty": false
  },
  {
    "external_id": 19139,
    "name": "Pharmacie PROVIDENCE",
    "address": "Larlé, à 200m de la gare STAF",
    "city": "Ouagadougou",
    "phone": "+226 25 31 86 48",
    "latitude": 12.373,
    "longitude": -1.539,
    "is_on_duty": false
  },
  {
    "external_id": 60555,
    "name": "Pharmacie RACHEL YAGMA",
    "address": "YAGMA, Côté Est du Sanctuaire marial, sur la nouvelle voie YAGMA - KAMBOINSIN, à 30 mètres du Groupe Scolaire EDIF, et du Centre de Formation Professionnelle de Yagma",
    "city": "Ouagadougou",
    "phone": "+226 25 40 70 09",
    "latitude": 12.439,
    "longitude": -1.601,
    "is_on_duty": false
  },
  {
    "external_id": 69,
    "name": "Pharmacie RAKISMANEGRE",
    "address": "Non loin du Chateau d’eau de Tampouy, sur la voie de la nouvelle mairie de l’arrdt 9",
    "city": "Ouagadougou",
    "phone": "+226 62 50 58 18",
    "latitude": 12.418,
    "longitude": -1.569,
    "is_on_duty": false
  },
  {
    "external_id": 34132,
    "name": "Pharmacie RAYIBTIGA",
    "address": "Av Jean-Baptiste OUEDRAOGO, 800 m au Nord de la Clinique Notre Dame de la Paix a, Somgandé",
    "city": "Ouagadougou",
    "phone": "+226 65 32 11 53",
    "latitude": 12.405,
    "longitude": -1.506,
    "is_on_duty": false
  },
  {
    "external_id": 1342,
    "name": "Pharmacie REMEDIS",
    "address": "Bobo Dioulasso",
    "city": "Bobo Dioulasso",
    "phone": "+226 20 97 09 52",
    "latitude": 11.165,
    "longitude": -4.276,
    "is_on_duty": false
  },
  {
    "external_id": 45400,
    "name": "Pharmacie RENAISSANCE (Ex-St JULIEN)",
    "address": "À 100m du rond-point de la Patte-d’oie, sur l‘avenue Bassawarga",
    "city": "Ouagadougou",
    "phone": "+226 68 91 10 10",
    "latitude": 12.334,
    "longitude": -1.529,
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
