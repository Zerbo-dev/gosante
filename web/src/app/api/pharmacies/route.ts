import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Liste des pharmacies depuis Supabase + groupes actuellement de garde
 * (via pharmacy_duty_rotations si renseignée, sinon is_on_duty).
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Africa/Ouagadougou",
  });

  const [{ data: pharmacies, error }, { data: rotations }] = await Promise.all([
    supabase
      .from("pharmacies")
      .select(
        "id, external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label, duty_group"
      )
      .not("external_id", "is", null)
      .order("name"),
    supabase
      .from("pharmacy_duty_rotations")
      .select("duty_group")
      // ends_on = jour de relève (exclu) : starts_on ≤ today < ends_on
      .lte("starts_on", today)
      .gt("ends_on", today),
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const activeGroups = new Set(
    (rotations ?? []).map((r) => r.duty_group).filter(Boolean)
  );
  const useRotations = activeGroups.size > 0;

  const enriched = (pharmacies ?? []).map((p) => {
    const onDuty = useRotations
      ? Boolean(p.duty_group && activeGroups.has(p.duty_group))
      : Boolean(p.is_on_duty);
    return {
      ...p,
      is_on_duty: onDuty,
      status_label: onDuty ? "De garde" : p.status_label,
      opening_hours:
        p.opening_hours ||
        "Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)",
    };
  });

  const cities = [...new Set(enriched.map((p) => p.city))].sort((a, b) =>
    a.localeCompare(b, "fr")
  );
  const dutyGroups = [
    ...new Set(enriched.map((p) => p.duty_group).filter(Boolean) as string[]),
  ].sort();

  return NextResponse.json({
    pharmacies: enriched,
    count: enriched.length,
    cities,
    dutyGroups,
    activeDutyGroups: [...activeGroups].sort(),
    dutySource: useRotations ? "rotations" : "legacy",
    timezone: "Africa/Ouagadougou",
  });
}
