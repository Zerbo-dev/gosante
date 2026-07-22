"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/routing";
import type { Pharmacy } from "@/types";
import "leaflet/dist/leaflet.css";

const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "user-marker",
});

const pharmacyIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#059669;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const selectedIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#dc2626;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function MapController({
  userLocation,
  selected,
}: {
  userLocation: LatLng | null;
  selected: Pharmacy | null;
}) {
  const map = useMap();

  useEffect(() => {
    // Carte souvent montée hors écran (mobile liste) — recalcule la taille
    const t = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(t);
  }, [map]);

  useEffect(() => {
    const valid =
      selected &&
      Number.isFinite(selected.latitude) &&
      Number.isFinite(selected.longitude);
    const userOk =
      userLocation &&
      Number.isFinite(userLocation.lat) &&
      Number.isFinite(userLocation.lng);

    if (valid && userOk) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [selected.latitude, selected.longitude],
      ]);
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });
    } else if (valid) {
      map.flyTo([selected.latitude, selected.longitude], 15, { duration: 0.8 });
    } else if (userOk) {
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 0.8 });
    }
  }, [map, userLocation, selected]);

  return null;
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
  userLocation: LatLng | null;
  selected: Pharmacy | null;
  routeGeometry: LatLng[];
  onSelect: (pharmacy: Pharmacy) => void;
}

function pKey(p: Pharmacy) {
  return String(p.external_id ?? p.id ?? p.name);
}

export default function PharmacyMapInner({
  pharmacies,
  userLocation,
  selected,
  routeGeometry,
  onSelect,
}: PharmacyMapProps) {
  const center: LatLng = userLocation ?? { lat: 12.3714, lng: -1.5197 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="h-full w-full rounded-xl"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController userLocation={userLocation} selected={selected} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
      )}

      {pharmacies
        .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
        .map((p) => (
        <Marker
          key={pKey(p)}
          position={[p.latitude, p.longitude]}
          icon={selected && pKey(selected) === pKey(p) ? selectedIcon : pharmacyIcon}
          eventHandlers={{ click: () => onSelect(p) }}
        />
      ))}

      {routeGeometry.length > 1 && (
        <Polyline
          positions={routeGeometry.map((p) => [p.lat, p.lng] as [number, number])}
          pathOptions={{ color: "#059669", weight: 5, opacity: 0.85 }}
        />
      )}
    </MapContainer>
  );
}
