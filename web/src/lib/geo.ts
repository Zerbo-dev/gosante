/** Distance en km entre deux points GPS (formule haversine). */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Rayon (km) pour considérer deux livraisons sur le « même trajet ». */
export const SAME_ROUTE_KM = 2.5;

/** Nombre max de missions actives (ready+delivering) pour un livreur. */
export const MAX_ACTIVE_DELIVERIES = 3;

export type RoutePoint = {
  pharmacyId?: string | null;
  pharmacyLat?: number | null;
  pharmacyLng?: number | null;
  deliveryLat?: number | null;
  deliveryLng?: number | null;
};

/**
 * Même trajet si : même pharmacie, ou destinations à ≤ SAME_ROUTE_KM,
 * ou nouvelle pharmacie proche d’une destination / pharmacie déjà en cours.
 */
export function isSameRoute(active: RoutePoint, candidate: RoutePoint): boolean {
  if (
    active.pharmacyId &&
    candidate.pharmacyId &&
    active.pharmacyId === candidate.pharmacyId
  ) {
    return true;
  }

  const pointsA: { lat: number; lng: number }[] = [];
  const pointsB: { lat: number; lng: number }[] = [];

  if (active.pharmacyLat != null && active.pharmacyLng != null) {
    pointsA.push({ lat: active.pharmacyLat, lng: active.pharmacyLng });
  }
  if (active.deliveryLat != null && active.deliveryLng != null) {
    pointsA.push({ lat: active.deliveryLat, lng: active.deliveryLng });
  }
  if (candidate.pharmacyLat != null && candidate.pharmacyLng != null) {
    pointsB.push({ lat: candidate.pharmacyLat, lng: candidate.pharmacyLng });
  }
  if (candidate.deliveryLat != null && candidate.deliveryLng != null) {
    pointsB.push({ lat: candidate.deliveryLat, lng: candidate.deliveryLng });
  }

  for (const a of pointsA) {
    for (const b of pointsB) {
      if (haversineKm(a, b) <= SAME_ROUTE_KM) return true;
    }
  }
  return false;
}

export function isSameRouteAsAny(
  actives: RoutePoint[],
  candidate: RoutePoint
): boolean {
  return actives.some((a) => isSameRoute(a, candidate));
}
