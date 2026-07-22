import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase } = auth;

  const body = (await request.json()) as {
    orderId: string;
    livreurId?: string | null;
    status?: string;
  };

  const { orderId, livreurId, status } = body;

  if (!orderId) {
    return NextResponse.json({ error: "orderId requis" }, { status: 400 });
  }

  const updates: { livreur_id?: string | null; status?: string } = {};

  if (livreurId !== undefined) {
    updates.livreur_id = livreurId;
  }
  if (status) {
    updates.status = status;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Aucune modification" }, { status: 400 });
  }

  const { error } = await supabase.from("orders").update(updates).eq("id", orderId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("audit_logs").insert({
    user_id: auth.user!.id,
    action: livreurId === null ? "livreur_unassigned" : "livreur_assigned",
    resource: `orders/${orderId}`,
    metadata: { livreurId, status },
  });

  return NextResponse.json({ ok: true });
}
