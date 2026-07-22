import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(dir, "../src/data/pharmacies.json"), "utf8"));
const pharmacies = data.pharmacies;

const OPENING_HOURS = "Lun\u2013Ven 8h\u201320h \u00b7 Sam 8h\u201312h \u00b7 Dim ferm\u00e9 (sauf garde)";
const BATCH_SIZE = 40;

function esc(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") {
    if (Number.isNaN(value)) return "NULL";
    return String(value);
  }
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  return "'" + String(value).replace(/'/g, "''") + "'";
}

function normalizeCity(city) {
  if (city === null || city === undefined) return city;
  const raw = String(city).trim();
  const lower = raw.toLowerCase();
  if (lower.startsWith("bobo")) return "Bobo-Dioulasso";
  if (lower === "koudougou") return "Koudougou";
  if (lower === "ouagadougou") return "Ouagadougou";
  return raw;
}

function statusLabel(p) {
  if (p.is_on_duty) {
    return p.status_label != null && p.status_label !== "" ? p.status_label : "De garde";
  }
  return null;
}

const statements = pharmacies.map((p) => {
  const values = [
    esc(p.external_id),
    esc(p.name),
    esc(p.address),
    esc(normalizeCity(p.city)),
    esc(p.phone),
    esc(p.latitude),
    esc(p.longitude),
    esc(Boolean(p.is_on_duty)),
    esc(OPENING_HOURS),
    esc(statusLabel(p)),
    "NULL",
  ].join(", ");

  return (
    "INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group)\n" +
    "VALUES (" + values + ")\n" +
    "ON CONFLICT (external_id) WHERE external_id IS NOT NULL DO UPDATE SET\n" +
    "  name = EXCLUDED.name,\n" +
    "  address = EXCLUDED.address,\n" +
    "  city = EXCLUDED.city,\n" +
    "  phone = EXCLUDED.phone,\n" +
    "  latitude = EXCLUDED.latitude,\n" +
    "  longitude = EXCLUDED.longitude,\n" +
    "  is_on_duty = EXCLUDED.is_on_duty,\n" +
    "  opening_hours = EXCLUDED.opening_hours,\n" +
    "  status_label = EXCLUDED.status_label;"
  );
});

const outPath = join(dir, "pharmacies-upsert.sql");
writeFileSync(outPath, statements.join("\n\n") + "\n", "utf8");
console.log("Wrote " + pharmacies.length + " rows to " + outPath);

const batchPaths = [];
for (let i = 0; i < statements.length; i += BATCH_SIZE) {
  const batchIndex = Math.floor(i / BATCH_SIZE) + 1;
  const chunk = statements.slice(i, i + BATCH_SIZE);
  const batchPath = join(dir, "pharmacies-batch-" + batchIndex + ".sql");
  writeFileSync(batchPath, chunk.join("\n\n") + "\n", "utf8");
  batchPaths.push(batchPath);
  console.log(
    "Wrote batch " + batchIndex + ": " + chunk.length + " statements -> " + batchPath
  );
}

console.log("Total batches: " + batchPaths.length);