import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

async function ownPsychologist(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const { data } = await supabase
    .from("psychologists")
    .select("id, full_name")
    .eq("user_id", userId)
    .maybeSingle();
  return data;
}

/** Supprime les créneaux déjà terminés (fin < maintenant). */
async function cleanupPastSlots(supabase: SupabaseClient) {
  await supabase.rpc("cleanup_past_psychologist_slots");
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  await cleanupPastSlots(supabase);

  const own = request.nextUrl.searchParams.get("as") === "psychologue";
  let psychologistId = request.nextUrl.searchParams.get("psychologistId");

  if (own) {
    const psychologist = await ownPsychologist(supabase, user.id);
    if (!psychologist) {
      return NextResponse.json({ error: "Fiche psychologue manquante" }, { status: 403 });
    }
    psychologistId = psychologist.id;
  }

  if (!psychologistId) {
    return NextResponse.json({ error: "psychologistId requis" }, { status: 400 });
  }

  const { data: slots, error } = await supabase
    .from("psychologist_slots")
    .select("*")
    .eq("psychologist_id", psychologistId)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const slotIds = (slots ?? []).map((slot) => slot.id);
  const { data: appointments } = slotIds.length
    ? await supabase
        .from("appointments")
        .select("slot_id, status")
        .in("slot_id", slotIds)
        .in("status", ["scheduled", "confirmed", "in_progress"])
    : { data: [] };
  const booked = new Map((appointments ?? []).map((item) => [item.slot_id, item.status]));

  const enriched = (slots ?? []).map((slot) => ({
    id: slot.id,
    start: slot.starts_at,
    durationMinutes: slot.duration_minutes,
    status: slot.status,
    appointmentStatus: booked.get(slot.id) ?? null,
  }));

  return NextResponse.json({
    slots: own
      ? enriched
      : enriched.filter((slot) => slot.status === "open" && !slot.appointmentStatus),
    timezone: "Africa/Ouagadougou",
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const psychologist = await ownPsychologist(supabase, user.id);
  if (!psychologist) {
    return NextResponse.json({ error: "Accès réservé aux psychologues" }, { status: 403 });
  }

  await cleanupPastSlots(supabase);

  const { startsAt, durationMinutes, repeatWeeks } = (await request.json()) as {
    startsAt: string;
    durationMinutes: number;
    repeatWeeks?: number;
  };
  const start = new Date(startsAt);
  const duration = Number(durationMinutes);
  const repeats = Math.min(Math.max(Number(repeatWeeks ?? 0), 0), 12);

  if (
    Number.isNaN(start.getTime()) ||
    ![15, 30, 45, 60, 90, 120].includes(duration) ||
    !Number.isInteger(repeats)
  ) {
    return NextResponse.json(
      { error: "Date, durée ou répétition invalide." },
      { status: 400 }
    );
  }

  const rows = Array.from({ length: repeats + 1 }, (_, index) => ({
    psychologist_id: psychologist.id,
    starts_at: new Date(start.getTime() + index * 7 * 24 * 60 * 60_000).toISOString(),
    duration_minutes: duration,
    status: "open",
  }));

  // Refuse les chevauchements avec les créneaux déjà publiés.
  const first = rows[0].starts_at;
  const lastEnd = new Date(
    new Date(rows.at(-1)!.starts_at).getTime() + duration * 60_000
  ).toISOString();
  const { data: existing } = await supabase
    .from("psychologist_slots")
    .select("starts_at, duration_minutes")
    .eq("psychologist_id", psychologist.id)
    .eq("status", "open")
    .gte("starts_at", new Date(new Date(first).getTime() - 2 * 60 * 60_000).toISOString())
    .lte("starts_at", lastEnd);

  const conflicts = rows.some((row) => {
    const rowStart = new Date(row.starts_at).getTime();
    const rowEnd = rowStart + duration * 60_000;
    return (existing ?? []).some((slot) => {
      const slotStart = new Date(slot.starts_at).getTime();
      const slotEnd = slotStart + Number(slot.duration_minutes) * 60_000;
      return rowStart < slotEnd && rowEnd > slotStart;
    });
  });
  if (conflicts) {
    return NextResponse.json(
      { error: "Un des créneaux chevauche une disponibilité existante" },
      { status: 409 }
    );
  }

  const { data, error } = await supabase.from("psychologist_slots").insert(rows).select();
  if (error) {
    const duplicate = error.code === "23505";
    return NextResponse.json(
      { error: duplicate ? "Un de ces créneaux existe déjà" : error.message },
      { status: duplicate ? 409 : 500 }
    );
  }

  return NextResponse.json({ slots: data ?? [], created: data?.length ?? 0 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const psychologist = await ownPsychologist(supabase, user.id);
  if (!psychologist) {
    return NextResponse.json({ error: "Accès réservé aux psychologues" }, { status: 403 });
  }

  const { id, status } = (await request.json()) as { id: string; status: "open" | "blocked" };
  if (!id || !["open", "blocked"].includes(status)) {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }
  const { error } = await supabase
    .from("psychologist_slots")
    .update({ status })
    .eq("id", id)
    .eq("psychologist_id", psychologist.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const psychologist = await ownPsychologist(supabase, user.id);
  if (!psychologist) {
    return NextResponse.json({ error: "Accès réservé aux psychologues" }, { status: 403 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });

  // Vérifie que le créneau appartient bien au psychologue
  const { data: slot } = await supabase
    .from("psychologist_slots")
    .select("id")
    .eq("id", id)
    .eq("psychologist_id", psychologist.id)
    .maybeSingle();
  if (!slot) {
    return NextResponse.json({ error: "Créneau introuvable" }, { status: 404 });
  }

  const { data: appointment } = await supabase
    .from("appointments")
    .select("id")
    .eq("slot_id", id)
    .in("status", ["scheduled", "confirmed", "in_progress"])
    .maybeSingle();
  if (appointment) {
    return NextResponse.json(
      { error: "Ce créneau est réservé. Annulez d'abord le rendez-vous." },
      { status: 409 }
    );
  }

  const { error, count } = await supabase
    .from("psychologist_slots")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("psychologist_id", psychologist.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!count) {
    return NextResponse.json({ error: "Suppression impossible" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
