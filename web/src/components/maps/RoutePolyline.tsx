"use client";

import { Polyline } from "react-leaflet";
import type { LatLng } from "@/lib/routing";
import { MAP_COLORS } from "./mapTheme";

/** Itinéraire style Maps : bordure claire + trait brand */
export function RoutePolyline({
  geometry,
  color = MAP_COLORS.route,
}: {
  geometry: LatLng[];
  color?: string;
}) {
  if (geometry.length < 2) return null;
  const positions = geometry.map((p) => [p.lat, p.lng] as [number, number]);

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: MAP_COLORS.routeCasing,
          weight: 10,
          opacity: 0.95,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color,
          weight: 5,
          opacity: 0.95,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </>
  );
}
