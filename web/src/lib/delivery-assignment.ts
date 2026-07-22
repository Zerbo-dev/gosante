import type { SupabaseClient } from "@supabase/supabase-js";
import {
  haversineKm,
  isSameRouteAsAny,
  MAX_ACTIVE_DELIVERIES,
  type RoutePoint,
} from "@/lib/geo";

export type UrgencyLevel = "normal" | "urgent" | "emergency";

const URGENCY_WEIGHT: Record<UrgencyLevel, number> = {
  normal: 0,
  urgent: 15,
  emergency: 40,
};

/** Bonus score (négatif = mieux) si le livreur est déjà sur le même trajet. */
const SAME_ROUTE_BONUS = 45;

/** Plus le score est bas, meilleur est le livreur pour cette commande. */
export function scoreLivreur(opts: {
  livreurLat: number;
  livreurLng: number;
  pharmacyLat: number;
  pharmacyLng: number;
  activeDeliveries: number;
  urgency: UrgencyLevel;
  sameRoute?: boolean;
}): number {
  const dist = haversineKm(
    { lat: opts.livreurLat, lng: opts.livreurLng },
    { lat: opts.pharmacyLat, lng: opts.pharmacyLng }
  );
  return (
    dist * 35 +
    opts.activeDeliveries * 22 -
    URGENCY_WEIGHT[opts.urgency] -
    (opts.sameRoute ? SAME_ROUTE_BONUS : 0)
  );
}

export async function countOnlineLivreurs(supabase: SupabaseClient): Promise<number> {
  const staleBefore = new Date(Date.now() - 5 * 60_000).toISOString();
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "livreur")
    .eq("livreur_online", true)
    .not("livreur_lat", "is", null)
    .not("livreur_lng", "is", null)
    .gte("livreur_location_at", staleBefore);
  return count ?? 0;
}

const URGENCY_RANK: Record<UrgencyLevel, number> = {
  normal: 0,
  urgent: 1,
  emergency: 2,
};

/** Assigne les commandes prêtes sans livreur (priorité urgence puis ancienneté). */
export async function assignPendingReadyOrders(
  supabase: SupabaseClient
): Promise<{ assigned: number }> {
  const { data: pending } = await supabase
    .from("orders")
    .select("id, urgency_level, created_at")
    .eq("status", "ready")
    .is("livreur_id", null);

  const sorted = (pending ?? []).sort((a, b) => {
    const ua = URGENCY_RANK[(a.urgency_level ?? "normal") as UrgencyLevel] ?? 0;
    const ub = URGENCY_RANK[(b.urgency_level ?? "normal") as UrgencyLevel] ?? 0;
    if (ub !== ua) return ub - ua;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  let assigned = 0;
  for (const order of sorted) {
    const result = await assignBestLivreur(supabase, order.id);
    if (result.livreurId) assigned++;
  }
  return { assigned };
}

export async function assignBestLivreur(
  supabase: SupabaseClient,
  orderId: string
): Promise<{ livreurId: string | null; reason?: string }> {
  const { data: order } = await supabase
    .from("orders")
    .select(
      "id, urgency_level, pharmacy_id, livreur_id, delivery_lat, delivery_lng, pharmacies(latitude, longitude)"
    )
    .eq("id", orderId)
    .single();

  if (!order || order.livreur_id) {
    return { livreurId: order?.livreur_id ?? null };
  }

  const pharmacy = Array.isArray(order.pharmacies)
    ? order.pharmacies[0]
    : order.pharmacies;
  if (!pharmacy?.latitude || !pharmacy?.longitude) {
    return { livreurId: null, reason: "Pharmacie sans coordonnées GPS" };
  }

  const candidateRoute: RoutePoint = {
    pharmacyId: order.pharmacy_id,
    pharmacyLat: pharmacy.latitude,
    pharmacyLng: pharmacy.longitude,
    deliveryLat: order.delivery_lat,
    deliveryLng: order.delivery_lng,
  };

  const staleBefore = new Date(Date.now() - 5 * 60_000).toISOString();

  const { data: livreurs } = await supabase
    .from("profiles")
    .select("id, livreur_lat, livreur_lng, livreur_location_at")
    .eq("role", "livreur")
    .eq("livreur_online", true)
    .not("livreur_lat", "is", null)
    .not("livreur_lng", "is", null)
    .gte("livreur_location_at", staleBefore);

  if (!livreurs?.length) {
    return { livreurId: null, reason: "Aucun livreur en ligne avec GPS actif" };
  }

  const { data: activeOrders } = await supabase
    .from("orders")
    .select(
      "livreur_id, pharmacy_id, delivery_lat, delivery_lng, pharmacies(latitude, longitude)"
    )
    .in("status", ["ready", "delivering"])
    .not("livreur_id", "is", null);

  const loadMap = new Map<string, number>();
  const routesByLivreur = new Map<string, RoutePoint[]>();

  for (const o of activeOrders ?? []) {
    if (!o.livreur_id) continue;
    loadMap.set(o.livreur_id, (loadMap.get(o.livreur_id) ?? 0) + 1);
    const ph = Array.isArray(o.pharmacies) ? o.pharmacies[0] : o.pharmacies;
    const list = routesByLivreur.get(o.livreur_id) ?? [];
    list.push({
      pharmacyId: o.pharmacy_id,
      pharmacyLat: ph?.latitude ?? null,
      pharmacyLng: ph?.longitude ?? null,
      deliveryLat: o.delivery_lat,
      deliveryLng: o.delivery_lng,
    });
    routesByLivreur.set(o.livreur_id, list);
  }

  const urgency = (order.urgency_level ?? "normal") as UrgencyLevel;

  function pickBest(preferSameRouteOnly: boolean): { id: string; score: number } | null {
    let best: { id: string; score: number } | null = null;
    for (const l of livreurs!) {
      if (l.livreur_lat == null || l.livreur_lng == null) continue;
      const active = loadMap.get(l.id) ?? 0;
      if (active >= MAX_ACTIVE_DELIVERIES) continue;

      const existingRoutes = routesByLivreur.get(l.id) ?? [];
      const sameRoute =
        existingRoutes.length > 0 && isSameRouteAsAny(existingRoutes, candidateRoute);

      // 1ʳᵉ passe : livreurs libres OU déjà sur ce trajet
      if (preferSameRouteOnly && active > 0 && !sameRoute) continue;

      const score = scoreLivreur({
        livreurLat: l.livreur_lat,
        livreurLng: l.livreur_lng,
        pharmacyLat: pharmacy.latitude,
        pharmacyLng: pharmacy.longitude,
        activeDeliveries: active,
        urgency,
        sameRoute,
      });
      if (!best || score < best.score) {
        best = { id: l.id, score };
      }
    }
    return best;
  }

  // Préfère un livreur libre ou déjà sur le même trajet ; sinon repli
  const best = pickBest(true) ?? pickBest(false);

  if (!best) {
    return { livreurId: null, reason: "Aucun livreur éligible" };
  }

  const { error } = await supabase
    .from("orders")
    .update({
      livreur_id: best.id,
      assigned_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) return { livreurId: null, reason: error.message };
  return { livreurId: best.id };
}
