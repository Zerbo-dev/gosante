"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import type { LatLng } from "@/lib/routing";
import {
  BaseTileLayer,
  InvalidateSizeOnMount,
  MapFloatingControls,
} from "@/components/maps/MapChrome";
import {
  DEFAULT_CENTER,
  MAP_COLORS,
  dropPinIcon,
  userLocationIcon,
} from "@/components/maps/mapTheme";
import "leaflet/dist/leaflet.css";

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
      map.flyTo([value.lat, value.lng], Math.max(map.getZoom(), 16), { duration: 0.55 });
    } else if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 0.55 });
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
  const center = value ?? userLocation ?? DEFAULT_CENTER;
  const deliveryIcon = useMemo(() => dropPinIcon(MAP_COLORS.delivery), []);
  const userIcon = useMemo(() => userLocationIcon(null), []);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      className="gs-map h-full w-full"
      scrollWheelZoom
      zoomControl={false}
    >
      <BaseTileLayer />
      <InvalidateSizeOnMount deps={[value?.lat, value?.lng]} />
      <MapViewController value={value} userLocation={userLocation} />
      <MapClickHandler onPick={onChange} />
      <PickerControls userLocation={userLocation} onChange={onChange} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} zIndexOffset={300}>
          <Tooltip direction="top" offset={[0, -12]}>
            Votre position
          </Tooltip>
        </Marker>
      )}

      {value && (
        <Marker
          position={[value.lat, value.lng]}
          icon={deliveryIcon}
          draggable
          zIndexOffset={500}
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              onChange({ lat, lng });
            },
          }}
        >
          <Tooltip permanent direction="top" offset={[0, -36]} className="gs-tooltip-strong">
            Glissez pour ajuster
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
}

function PickerControls({
  userLocation,
  onChange,
}: {
  userLocation: LatLng | null;
  onChange: (loc: LatLng) => void;
}) {
  const map = useMap();
  return (
    <MapFloatingControls
      onLocate={
        userLocation
          ? () => {
              onChange(userLocation);
              map.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 0.5 });
            }
          : undefined
      }
      locateDisabled={!userLocation}
    />
  );
}
