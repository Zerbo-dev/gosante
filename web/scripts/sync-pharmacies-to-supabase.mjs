/**
 * Sync pharmacies from src/data/pharmacies.json into Supabase.
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY).
 *
 * Usage: node scripts/sync-pharmacies-to-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const OPENING_HOURS =
  "Lun\u2013Ven 8h\u201320h \u00b7 Sam 8h\u201312h \u00b7 Dim ferm\u00e9 (sauf garde)";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env) || !process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));
loadEnvFile(join(root, ".env.vercel.tmp"));

function normalizeCity(city) {
  if (city == null) return city;
  const raw = String(city).trim();
  const lower = raw.toLowerCase();
  if (lower.startsWith("bobo")) return "Bobo-Dioulasso";
  if (lower.includes("koudougou") || lower === "koudougou") return "Koudougou";
  if (lower === "ouagadougou") return "Ouagadougou";
  return raw;
}

function mapPharmacy(p) {
  const onDuty = Boolean(p.is_on_duty);
  return {
    external_id: p.external_id,
    name: p.name,
    address: p.address ?? null,
    city: normalizeCity(p.city),
    phone: p.phone ?? null,
    latitude: p.latitude ?? null,
    longitude: p.longitude ?? null,
    is_on_duty: onDuty,
    opening_hours: OPENING_HOURS,
    duty_group: null,
    status_label: onDuty ? "De garde" : null,
  };
}

async function upsertOne(supabase, row) {
  const { error } = await supabase
    .from("pharmacies")
    .upsert(row, { onConflict: "external_id" });

  if (!error) return { ok: true, mode: "upsert" };

  const msg = (error.message || "") + " " + (error.details || "") + " " + (error.hint || "");
  const needFallback =
    /onConflict|unique|constraint|partial|external_id|42P10|23505/i.test(msg) ||
    error.code === "42P10" ||
    error.code === "PGRST204";

  if (!needFallback && error.code !== "23505") {
    // Still try select/update/insert for partial unique index cases
  }

  const { data: existing, error: selErr } = await supabase
    .from("pharmacies")
    .select("id")
    .eq("external_id", row.external_id)
    .maybeSingle();

  if (selErr) {
    return { ok: false, mode: "select", error: selErr, upsertError: error };
  }

  if (existing?.id) {
    const { error: updErr } = await supabase
      .from("pharmacies")
      .update(row)
      .eq("id", existing.id);
    if (updErr) return { ok: false, mode: "update", error: updErr, upsertError: error };
    return { ok: true, mode: "update", upsertError: error };
  }

  const { error: insErr } = await supabase.from("pharmacies").insert(row);
  if (insErr) return { ok: false, mode: "insert", error: insErr, upsertError: error };
  return { ok: true, mode: "insert", upsertError: error };
}

async function upsertBatch(supabase, rows) {
  const { error } = await supabase
    .from("pharmacies")
    .upsert(rows, { onConflict: "external_id" });

  if (!error) return { ok: true, mode: "batch-upsert", count: rows.length };

  // Fallback row-by-row (partial unique index / onConflict unsupported)
  const results = [];
  for (const row of rows) {
    results.push(await upsertOne(supabase, row));
  }
  const failed = results.filter((r) => !r.ok);
  return {
    ok: failed.length === 0,
    mode: "row-fallback",
    count: rows.length,
    failed,
    firstUpsertError: error,
  };
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!url) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL).");
    process.exit(1);
  }
  if (!key) {
    console.error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY. Cannot sync via API."
    );
    process.exit(2);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const raw = JSON.parse(
    readFileSync(join(root, "src/data/pharmacies.json"), "utf8")
  );
  const list = Array.isArray(raw) ? raw : raw.pharmacies || [];
  const rows = list.map(mapPharmacy);

  console.log(`Syncing ${rows.length} pharmacies...`);

  const BATCH = 50;
  let synced = 0;
  let modes = {};
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    const result = await upsertBatch(supabase, chunk);
    if (!result.ok) {
      console.error("Batch failed at offset", i);
      if (result.firstUpsertError) {
        console.error("upsert error:", result.firstUpsertError.message || result.firstUpsertError);
      }
      if (result.failed?.length) {
        const f = result.failed[0];
        console.error("first row error:", f.error?.message || f.error, "mode", f.mode);
      }
      process.exit(3);
    }
    modes[result.mode] = (modes[result.mode] || 0) + result.count;
    synced += result.count;
    console.log(`  ${synced}/${rows.length} (${result.mode})`);
  }

  // Counts
  const { count: total, error: totalErr } = await supabase
    .from("pharmacies")
    .select("*", { count: "exact", head: true });
  if (totalErr) {
    console.error("count total error:", totalErr.message);
    process.exit(4);
  }

  const { data: cityRows, error: cityErr } = await supabase
    .from("pharmacies")
    .select("city");
  if (cityErr) {
    console.error("city query error:", cityErr.message);
    process.exit(4);
  }
  const byCity = {};
  for (const r of cityRows || []) {
    const c = r.city || "(null)";
    byCity[c] = (byCity[c] || 0) + 1;
  }

  const { count: onDuty, error: dutyErr } = await supabase
    .from("pharmacies")
    .select("*", { count: "exact", head: true })
    .eq("is_on_duty", true);
  if (dutyErr) {
    console.error("on_duty count error:", dutyErr.message);
    process.exit(4);
  }

  console.log("\n=== SYNC COMPLETE ===");
  console.log("modes:", JSON.stringify(modes));
  console.log("total:", total);
  console.log("by_city:", JSON.stringify(byCity, null, 2));
  console.log("on_duty:", onDuty);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
