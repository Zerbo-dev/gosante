"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/routing";
import type { MapMarker } from "./NavigationMap";
import "leaflet/dist/leaflet.css";

const markerColors: Record<string, string> = {
  emerald: "#059669",
  blue: "#2563eb",
  amber: "#d97706",
  red: "#dc2626",
};

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function MapFollow({
  userLocation,
  followUser,
}: {
  userLocation: LatLng | null;
  followUser: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (followUser && userLocation) {
      map.setView([userLocation.lat, userLocation.lng], map.getZoom(), { animate: true });
    }
  }, [map, userLocation, followUser]);
  return null;
}

export default function NavigationMapInner({
  userLocation,
  heading,
  followUser,
  routeGeometry,
  markers,
  waypoints,
}: {
  userLocation: LatLng | null;
  heading: number | null;
  followUser: boolean;
  routeGeometry: LatLng[];
  markers: MapMarker[];
  waypoints: LatLng[];
}) {
  const center = userLocation ?? markers[0] ?? { lat: 12.3714, lng: -1.5197 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={14}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFollow userLocation={userLocation} followUser={followUser} />

      {routeGeometry.length > 1 && (
        <Polyline
          positions={routeGeometry.map((p) => [p.lat, p.lng] as [number, number])}
          pathOptions={{ color: "#34d399", weight: 6, opacity: 0.9 }}
        />
      )}

      {waypoints.map((wp, i) => (
        <CircleMarker
          key={`wp-${i}`}
          center={[wp.lat, wp.lng]}
          radius={8}
          pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.9 }}
        />
      ))}

      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={makeIcon(markerColors[m.color ?? "emerald"])}
        />
      ))}

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={L.divIcon({
            className: "",
            html: `<div style="transform:rotate(${heading ?? 0}deg);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:18px solid #22d3ee;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))"></div>`,
            iconSize: [16, 18],
            iconAnchor: [8, 9],
          })}
        />
      )}
    </MapContainer>
  );
}
