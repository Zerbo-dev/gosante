const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "..", "src", "data", "pharmacies.json");
const CHUNK_SIZE = 22;

const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const pharmacies = Array.isArray(raw) ? raw : raw.pharmacies;

const fields = [
  "external_id",
  "name",
  "address",
  "city",
  "phone",
  "latitude",
  "longitude",
  "is_on_duty",
];

/** Strip control chars and normalize problematic unicode escapes in strings. */
function sanitizeString(value) {
  if (typeof value !== "string") return value;
  return value
    // Literal unicode escape sequences that would break SQL/JSON (e.g. "\u001f" as text)
    .replace(/\\u00[0-1][0-9a-fA-F]|\\u007[fF]/g, " ")
    // Actual control characters U+0000-U+001F and DEL U+007F
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

function sanitizeValue(value) {
  if (typeof value === "string") return sanitizeString(value);
  return value;
}

const stripped = pharmacies.map((p) => {
  const o = {};
  for (const f of fields) {
    o[f] = sanitizeValue(p[f] ?? null);
  }
  return o;
});

function buildSql(chunk) {
  const jsonArray = JSON.stringify(chunk, null, 2);
  return `WITH src AS (
  SELECT * FROM jsonb_to_recordset($PHARMACIES_JSON$
${jsonArray}
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
INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label)
SELECT external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label
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
  -- duty_group intentionnellement non écrasé (géré via rotations / seed garde)
`;
}

// Remove previous pharm-up-*.sql outputs
for (const f of fs.readdirSync(__dirname)) {
  if (/^pharm-up-\d+\.sql$/i.test(f)) {
    fs.unlinkSync(path.join(__dirname, f));
  }
}

const results = [];
const numChunks = Math.ceil(stripped.length / CHUNK_SIZE);

for (let i = 0; i < numChunks; i++) {
  const chunk = stripped.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  const outName = `pharm-up-${String(i + 1).padStart(2, "0")}.sql`;
  const outPath = path.join(__dirname, outName);
  const sql = buildSql(chunk);
  fs.writeFileSync(outPath, sql, "utf8");
  const stat = fs.statSync(outPath);
  results.push({ path: outPath, bytes: stat.size, count: chunk.length });
}

console.log(JSON.stringify({ total: stripped.length, chunks: results }, null, 2));