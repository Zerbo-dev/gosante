import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = (await request.json()) as {
    targetType: "livreur" | "psychologist";
    targetUserId: string;
    orderId?: string;
    appointmentId?: string;
    score: number;
    comment?: string;
  };

  if (!body.targetType || !body.targetUserId || !body.score) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }
  if (body.score < 1 || body.score > 5) {
    return NextResponse.json({ error: "Note entre 1 et 5" }, { status: 400 });
  }

  let targetUserId = body.targetUserId;

  if (body.targetType === "livreur" && body.orderId) {
    const { data: order } = await supabase
      .from("orders")
      .select("user_id, livreur_id, status")
      .eq("id", body.orderId)
      .single();
    if (!order || order.user_id !== user.id || order.status !== "completed") {
      return NextResponse.json({ error: "Commande non éligible" }, { status: 400 });
    }
    if (!order.livreur_id) {
      return NextResponse.json({ error: "Livreur invalide" }, { status: 400 });
    }
    targetUserId = order.livreur_id;
  }

  if (body.targetType === "psychologist" && body.appointmentId) {
    const { data: appt } = await supabase
      .from("appointments")
      .select("user_id, status, psychologist_id, psychologists(user_id)")
      .eq("id", body.appointmentId)
      .single();
    if (!appt || appt.user_id !== user.id || appt.status !== "completed") {
      return NextResponse.json({ error: "RDV non éligible" }, { status: 400 });
    }
    const psyUserId = (appt.psychologists as { user_id?: string } | null)?.user_id;
    if (!psyUserId) {
      return NextResponse.json(
        { error: "Impossible d'identifier le psychologue à noter" },
        { status: 400 }
      );
    }
    targetUserId = psyUserId;
  }

  const { error } = await supabase.from("service_ratings").insert({
    rater_id: user.id,
    target_type: body.targetType,
    target_user_id: targetUserId,
    order_id: body.orderId ?? null,
    appointment_id: body.appointmentId ?? null,
    score: body.score,
    comment: body.comment?.trim() || null,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Vous avez déjà noté" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.orderId) {
    await supabase.from("orders").update({ rated_at: new Date().toISOString() }).eq("id", body.orderId);
  }
  if (body.appointmentId) {
    await supabase
      .from("appointments")
      .update({ patient_rated_at: new Date().toISOString() })
      .eq("id", body.appointmentId);
  }

  return NextResponse.json({
    ok: true,
    rating: {
      score: body.score,
      comment: body.comment?.trim() || null,
    },
  });
}
