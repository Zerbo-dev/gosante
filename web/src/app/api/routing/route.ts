import { NextRequest, NextResponse } from "next/server";

type OsrmRouteResponse = {
  code?: string;
  routes?: {
    distance: number;
    duration: number;
    geometry?: { coordinates: [number, number][] };
    legs?: {
      steps?: {
        distance: number;
        duration: number;
        name?: string;
        maneuver?: { type?: string; modifier?: string };
      }[];
    }[];
  }[];
};

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

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

export async function GET(request: NextRequest) {
  const fromLat = Number(request.nextUrl.searchParams.get("fromLat"));
  const fromLng = Number(request.nextUrl.searchParams.get("fromLng"));
  const toLat = Number(request.nextUrl.searchParams.get("toLat"));
  const toLng = Number(request.nextUrl.searchParams.get("toLng"));

  if (![fromLat, fromLng, toLat, toLng].every(Number.isFinite)) {
    return NextResponse.json({ error: "Coordonnées invalides" }, { status: 400 });
  }

  const url = `${OSRM_BASE}/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&steps=true`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "GoSante/1.0" },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Service itinéraire indisponible" }, { status: 502 });
    }
    const data = (await res.json()) as OsrmRouteResponse;
    const route = data.routes?.[0];
    if (!route) {
      return NextResponse.json({ error: "Aucun itinéraire trouvé" }, { status: 404 });
    }

    const rawSteps = route.legs?.flatMap((leg) => leg.steps ?? []) ?? [];
    return NextResponse.json({
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: (route.geometry?.coordinates ?? []).map(([lng, lat]) => ({ lat, lng })),
      steps: rawSteps.map((s) => ({
        instruction: stepInstruction(s),
        distanceMeters: s.distance,
        durationSeconds: s.duration,
      })),
      estimated: false,
    });
  } catch {
    return NextResponse.json({ error: "Erreur itinéraire" }, { status: 502 });
  }
}
