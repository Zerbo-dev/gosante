import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assignBestLivreur } from "@/lib/delivery-assignment";

/** Pharmacien : commande prête → assignation automatique du livreur. */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { orderId } = (await request.json()) as { orderId: string };
  if (!orderId) return NextResponse.json({ error: "orderId requis" }, { status: 400 });

  const { data: order } = await supabase
    .from("orders")
    .select("pharmacy_id")
    .eq("id", orderId)
    .single();

  if (!order?.pharmacy_id) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const { data: staff } = await supabase
    .from("pharmacy_staff")
    .select("pharmacy_id")
    .eq("user_id", user.id)
    .eq("pharmacy_id", order.pharmacy_id)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!staff && profile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { error: upErr } = await supabase
    .from("orders")
    .update({ status: "ready" })
    .eq("id", orderId);

  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const result = await assignBestLivreur(supabase, orderId);

  return NextResponse.json({
    ok: true,
    livreurId: result.livreurId,
    assignMessage: result.livreurId
      ? "Livreur assigné automatiquement"
      : result.reason ??
        "Commande prête — en attente d'un livreur en ligne (assignation automatique dès connexion)",
    waitingForLivreur: !result.livreurId,
  });
}
