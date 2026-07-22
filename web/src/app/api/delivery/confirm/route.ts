import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { orderId, code } = (await request.json()) as { orderId: string; code: string };

  if (!orderId || !code?.trim()) {
    return NextResponse.json({ error: "Commande et code requis" }, { status: 400 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "livreur" && profile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("id, status, livreur_id, delivery_code")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  if (profile.role === "livreur" && order.livreur_id !== user.id) {
    return NextResponse.json({ error: "Cette livraison ne vous est pas assignée" }, { status: 403 });
  }

  if (order.status === "completed") {
    return NextResponse.json({ ok: true, alreadyCompleted: true });
  }

  if (order.status !== "delivering") {
    return NextResponse.json(
      {
        error:
          order.status === "ready"
            ? "Démarrez d'abord la livraison avant de saisir le code"
            : "La livraison doit être en cours",
      },
      { status: 400 }
    );
  }

  const expected = String(order.delivery_code ?? "").trim();
  const given = String(code).trim();
  if (!expected || expected !== given) {
    return NextResponse.json({ error: "Code incorrect — demandez le code au patient" }, { status: 400 });
  }

  const { data: updated, error } = await supabase
    .from("orders")
    .update({ status: "completed", updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .eq("status", "delivering")
    .select("id, status")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!updated) {
    return NextResponse.json(
      { error: "Impossible de clôturer la mission (droits ou statut modifié)" },
      { status: 409 }
    );
  }

  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "delivery_confirmed",
    resource: `orders/${orderId}`,
    metadata: { code_verified: true },
  });

  return NextResponse.json({ ok: true, status: updated.status });
}
