import { NextRequest, NextResponse } from "next/server";
import { assignPendingReadyOrders } from "@/lib/delivery-assignment";
import { createClient } from "@/lib/supabase/server";

/** Met à jour présence livreur (en ligne + GPS obligatoire pour être actif). */
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "livreur" && profile?.role !== "admin") {
    return NextResponse.json({ error: "Accès réservé aux livreurs" }, { status: 403 });
  }

  const body = (await request.json()) as {
    online?: boolean;
    lat?: number;
    lng?: number;
    heading?: number;
  };

  const updates: Record<string, unknown> = {};
  if (body.online !== undefined) updates.livreur_online = body.online;
  if (body.lat != null && body.lng != null) {
    updates.livreur_lat = body.lat;
    updates.livreur_lng = body.lng;
    updates.livreur_location_at = new Date().toISOString();
  }
  if (body.heading != null) updates.livreur_heading = body.heading;

  if (body.online === true && (body.lat == null || body.lng == null)) {
    return NextResponse.json(
      { error: "Activez le GPS pour passer en ligne" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Réplique la position sur les commandes en cours pour le suivi patient
  if (body.lat != null && body.lng != null) {
    await supabase
      .from("orders")
      .update({
        livreur_lat: body.lat,
        livreur_lng: body.lng,
        livreur_location_at: new Date().toISOString(),
      })
      .eq("livreur_id", user.id)
      // Quand la commande est en `ready`, le patient voit le livreur en temps réel.
      // Le passage en `delivering` continue le suivi.
      .in("status", ["ready", "delivering"]);
  }

  let pendingAssigned = 0;
  if (body.online === true) {
    const result = await assignPendingReadyOrders(supabase);
    pendingAssigned = result.assigned;
  }

  return NextResponse.json({
    ok: true,
    online: body.online ?? undefined,
    pendingAssigned,
  });
}
