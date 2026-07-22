export interface LatLng {
  lat: number;
  lng: number;
}

export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
}

export interface RouteInfo {
  distanceMeters: number;
  durationSeconds: number;
  geometry: LatLng[];
  steps: RouteStep[];
}

export interface OsrmRouteResponse {
  routes?: {
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
    legs?: {
      steps?: {
        distance: number;
        duration: number;
        name?: string;
        maneuver?: { type?: string; modifier?: string; location?: [number, number] };
      }[];
    }[];
  }[];
  code?: string;
}

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

export function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.max(1, Math.round(seconds / 60));
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

/** Estimation durée voiture urbaine (~25 km/h) à partir d'une distance en mètres. */
export function estimateDrivingDuration(distanceMeters: number): number {
  const kmh = 25;
  return (distanceMeters / 1000 / kmh) * 3600;
}

export async function fetchRoute(
  from: LatLng,
  to: LatLng
): Promise<RouteInfo | null> {
  const qs = new URLSearchParams({
    fromLat: String(from.lat),
    fromLng: String(from.lng),
    toLat: String(to.lat),
    toLng: String(to.lng),
  });

  try {
    // Proxy serveur (évite blocage CORS / OSRM côté navigateur)
    const res = await fetch(`/api/routing?${qs.toString()}`);
    if (res.ok) {
      const data = (await res.json()) as RouteInfo;
      if (data?.distanceMeters != null && data?.durationSeconds != null) {
        return {
          distanceMeters: data.distanceMeters,
          durationSeconds: data.durationSeconds,
          geometry: data.geometry ?? [],
          steps: data.steps ?? [],
        };
      }
    }
  } catch {
    /* fallback direct ci-dessous */
  }

  // Fallback direct OSRM (dev / si proxy KO)
  const url = `${OSRM_BASE}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=true`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as OsrmRouteResponse;
    const route = data.routes?.[0];
    if (!route) return null;

    const rawSteps = route.legs?.flatMap((leg) => leg.steps ?? []) ?? [];
    const steps: RouteStep[] = rawSteps.map((s) => ({
      instruction: stepInstruction(s),
      distanceMeters: s.distance,
      durationSeconds: s.duration,
    }));

    return {
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng })),
      steps,
    };
  } catch {
    return null;
  }
}

function stepInstruction(step: {
  name?: string;
  maneuver?: { type?: string; modifier?: string };
}): string {
  const type = step.maneuver?.type ?? "continue";
  const mod = step.maneuver?.modifier ?? "";
  const road = step.name ? ` sur ${step.name}` : "";
  const labels: Record<string, string> = {
    depart: "Départ",
    arrive: "Arrivée",
    turn: mod === "left" ? "Tournez à gauche" : mod === "right" ? "Tournez à droite" : "Tournez",
    "new name": "Continuez",
    continue: "Continuez tout droit",
    roundabout: "Prenez le rond-point",
    merge: "Rejoignez la voie",
    fork: "À la bifurcation",
  };
  return `${labels[type] ?? "Continuez"}${road}`;
}

export function googleMapsDirectionsUrl(from: LatLng, to: LatLng): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=driving`;
}

export function googleMapsDestinationUrl(to: LatLng): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${to.lat},${to.lng}&travelmode=driving`;
}
