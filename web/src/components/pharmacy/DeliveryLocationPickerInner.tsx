"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, CircleMarker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/routing";
import "leaflet/dist/leaflet.css";

const deliveryIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapViewController({
  value,
  userLocation,
}: {
  value: LatLng | null;
  userLocation: LatLng | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (value) {
      map.flyTo([value.lat, value.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
    } else if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 0.6 });
    }
  }, [map, value?.lat, value?.lng, userLocation?.lat, userLocation?.lng]);

  return null;
}

function MapClickHandler({ onPick }: { onPick: (loc: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function DeliveryLocationPickerInner({
  value,
  onChange,
  userLocation,
}: {
  value: LatLng | null;
  onChange: (loc: LatLng) => void;
  userLocation: LatLng | null;
}) {
  const center = value ?? userLocation ?? { lat: 12.3714, lng: -1.5197 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={14}
      className="h-full w-full rounded-xl"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewController value={value} userLocation={userLocation} />
      <MapClickHandler onPick={onChange} />

      {userLocation && (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={9}
          pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.85, weight: 2 }}
        />
      )}

      {value && (
        <Marker
          position={[value.lat, value.lng]}
          icon={deliveryIcon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              onChange({ lat, lng });
            },
          }}
        />
      )}
    </MapContainer>
  );
}
