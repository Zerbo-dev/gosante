import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createJitsiRoomId } from "@/lib/jitsi";
import { checkVisioAccess } from "@/lib/visio-access";

async function getMyPsychologistId(
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

const CANCELLATION_NOTICE_MS = 24 * 60 * 60_000;

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const asPsychologue = request.nextUrl.searchParams.get("as") === "psychologue";

  if (asPsychologue) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "psychologue" && profile?.role !== "admin") {
      return NextResponse.json({ error: "Accès réservé aux psychologues" }, { status: 403 });
    }

    const psy = await getMyPsychologistId(supabase, user.id);
    if (!psy && profile?.role === "psychologue") {
      return NextResponse.json({
        appointments: [],
        psychologist: null,
        error:
          "Fiche psychologue en cours de création — actualisez la page dans un instant",
      });
    }

    let query = supabase
      .from("appointments")
      .select("*, profiles:user_id(full_name, phone)")
      .order("scheduled_at", { ascending: true });

    if (psy) {
      query = query.eq("psychologist_id", psy.id);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ appointments: data ?? [], psychologist: psy });
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*, psychologists(id, full_name, specialty, city, phone, user_id)")
    .eq("user_id", user.id)
    .order("scheduled_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const appointments = data ?? [];
  const apptIds = appointments.map((a) => a.id);
  const { data: ratings } = apptIds.length
    ? await supabase
        .from("service_ratings")
        .select("appointment_id, score, comment, created_at")
        .eq("rater_id", user.id)
        .in("appointment_id", apptIds)
    : { data: [] };

  const ratingByAppt = new Map(
    (ratings ?? []).map((r) => [
      r.appointment_id as string,
      {
        score: Number(r.score),
        comment: (r.comment as string | null) ?? null,
        created_at: r.created_at as string,
      },
    ])
  );

  const enriched = appointments.map((a) => ({
    ...a,
    my_rating: ratingByAppt.get(a.id) ?? null,
  }));

  return NextResponse.json({ appointments: enriched });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = await request.json();
  const { psychologistId, slotId, reason, isAnonymous } = body as {
    psychologistId: string;
    slotId: string;
    reason?: string;
    isAnonymous?: boolean;
  };

  if (!psychologistId || !slotId) {
    return NextResponse.json({ error: "Psychologue et créneau requis" }, { status: 400 });
  }

  const { data: psy, error: psyErr } = await supabase
    .from("psychologists")
    .select("id, user_id, is_available")
    .eq("id", psychologistId)
    .single();

  if (psyErr || !psy?.user_id || !psy.is_available) {
    return NextResponse.json(
      { error: "Ce psychologue n'est pas disponible (compte non lié)" },
      { status: 400 }
    );
  }

  const { data: slot, error: slotError } = await supabase
    .from("psychologist_slots")
    .select("id, psychologist_id, starts_at, duration_minutes, status")
    .eq("id", slotId)
    .eq("psychologist_id", psychologistId)
    .single();
  if (
    slotError ||
    !slot ||
    slot.status !== "open" ||
    new Date(slot.starts_at).getTime() <= Date.now()
  ) {
    return NextResponse.json({ error: "Ce créneau n'est plus disponible" }, { status: 409 });
  }

  const jitsiRoom = createJitsiRoomId();
  const anonymous = Boolean(isAnonymous);

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      user_id: user.id,
      psychologist_id: psychologistId,
      slot_id: slot.id,
      scheduled_at: slot.starts_at,
      duration_minutes: slot.duration_minutes,
      reason: reason?.trim() || null,
      is_anonymous: anonymous,
      jitsi_room: jitsiRoom,
      status: "scheduled",
    })
    .select("*, psychologists(full_name, specialty, city, phone)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "appointment_created",
    resource: `appointments/${data.id}`,
    metadata: { psychologistId, slotId, isAnonymous: anonymous },
  });

  return NextResponse.json({ appointment: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = await request.json();
  const { appointmentId, status, isAnonymous, action, sessionNotes } = body as {
    appointmentId: string;
    status?: string;
    isAnonymous?: boolean;
    action?: "heartbeat" | "join";
    sessionNotes?: string;
  };

  if (!appointmentId) {
    return NextResponse.json({ error: "appointmentId requis" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const { data: appointment, error: lookupError } = await supabase
    .from("appointments")
    .select("id, user_id, psychologist_id, scheduled_at, duration_minutes, status, psychologist_last_seen_at")
    .eq("id", appointmentId)
    .single();
  if (lookupError || !appointment) {
    return NextResponse.json({ error: "Rendez-vous introuvable" }, { status: 404 });
  }

  const psy = await getMyPsychologistId(supabase, user.id);
  const isPsychologist = Boolean(psy && appointment.psychologist_id === psy.id);
  const isPatient = appointment.user_id === user.id;
  const isAdmin = profile?.role === "admin";
  if (!isPsychologist && !isPatient && !isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (action === "heartbeat") {
    if (!isPsychologist && !isAdmin) {
      return NextResponse.json({ error: "Accès réservé au psychologue" }, { status: 403 });
    }
    const access = checkVisioAccess({
      status: appointment.status,
      scheduledAt: appointment.scheduled_at,
    });
    if (!access.ok) {
      return NextResponse.json({ error: access.reason }, { status: 409 });
    }
    const now = new Date().toISOString();
    const { error } = await supabase
      .from("appointments")
      .update({
        status: "in_progress",
        psychologist_last_seen_at: now,
        updated_at: now,
      })
      .eq("id", appointmentId)
      .eq("psychologist_id", appointment.psychologist_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, psychologistOnline: true });
  }

  if (action === "join") {
    if (!isPatient && !isAdmin) {
      return NextResponse.json({ error: "Accès réservé au patient" }, { status: 403 });
    }
    const access = checkVisioAccess({
      status: appointment.status,
      scheduledAt: appointment.scheduled_at,
    });
    if (!access.ok) {
      return NextResponse.json({ error: access.reason }, { status: 409 });
    }
    return NextResponse.json({ ok: true, psychologistOnline: true });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof isAnonymous === "boolean" && isPatient && appointment.status === "scheduled") {
    updates.is_anonymous = isAnonymous;
  }
  if (typeof sessionNotes === "string") {
    if (!isPsychologist && !isAdmin) {
      return NextResponse.json({ error: "Notes réservées au psychologue" }, { status: 403 });
    }
    updates.session_notes = sessionNotes.trim() || null;
  }

  if (status) {
    // Priorité au psychologue / admin (évite le blocage si le même compte a aussi réservé)
    if (isPsychologist || isAdmin) {
      if (!["confirmed", "completed", "cancelled"].includes(status)) {
        return NextResponse.json({ error: "Changement de statut interdit" }, { status: 400 });
      }
    } else if (isPatient) {
      if (status !== "cancelled") {
        return NextResponse.json(
          { error: "Le patient peut uniquement annuler son rendez-vous" },
          { status: 403 }
        );
      }
      if (new Date(appointment.scheduled_at).getTime() - Date.now() < CANCELLATION_NOTICE_MS) {
        return NextResponse.json(
          { error: "L'annulation doit être faite au moins 24 heures avant le rendez-vous" },
          { status: 409 }
        );
      }
    } else {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    updates.status = status;
    if (status === "cancelled") {
      updates.cancelled_at = new Date().toISOString();
      updates.cancelled_by = user.id;
    }
  }

  const { data, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", appointmentId)
    .select("*, psychologists(id, full_name, specialty, city, phone), profiles:user_id(full_name, phone)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ appointment: data });
}
