"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/routing";
import type { Pharmacy } from "@/types";
import {
  BaseTileLayer,
  FitToPoints,
  InvalidateSizeOnMount,
  MapFloatingControls,
} from "@/components/maps/MapChrome";
import { RoutePolyline } from "@/components/maps/RoutePolyline";
import {
  DEFAULT_CENTER,
  pharmacyPinIcon,
  popupHtml,
  userLocationIcon,
} from "@/components/maps/mapTheme";
import "leaflet/dist/leaflet.css";

function MapController({
  userLocation,
  selected,
}: {
  userLocation: LatLng | null;
  selected: Pharmacy | null;
}) {
  const map = useMap();

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
      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 15 });
    } else if (valid) {
      map.flyTo([selected.latitude, selected.longitude], 15, { duration: 0.7 });
    } else if (userOk) {
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 0.7 });
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
  const center: LatLng = userLocation ?? DEFAULT_CENTER;
  const [fitKey, setFitKey] = useState(0);

  const icons = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    const get = (selectedPin: boolean, onDuty: boolean) => {
      const key = `${selectedPin ? 1 : 0}-${onDuty ? 1 : 0}`;
      let icon = cache.get(key);
      if (!icon) {
        icon = pharmacyPinIcon({ selected: selectedPin, onDuty });
        cache.set(key, icon);
      }
      return icon;
    };
    return { get };
  }, []);

  const userIcon = useMemo(() => userLocationIcon(null), []);

  const fitPoints = useMemo(() => {
    const pts: LatLng[] = [];
    if (userLocation) pts.push(userLocation);
    if (selected) pts.push({ lat: selected.latitude, lng: selected.longitude });
    if (routeGeometry.length > 1) {
      pts.push(routeGeometry[0], routeGeometry[routeGeometry.length - 1]);
    }
    return pts;
  }, [userLocation, selected, routeGeometry]);

  const onFit = useCallback(() => setFitKey((k) => k + 1), []);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="gs-map h-full w-full"
      scrollWheelZoom
      zoomControl={false}
      attributionControl
    >
      <BaseTileLayer />
      <InvalidateSizeOnMount deps={[pharmacies.length, selected?.id]} />
      <MapController userLocation={userLocation} selected={selected} />
      <PharmacyControls userLocation={userLocation} onFit={onFit} showFit={fitPoints.length >= 2} />
      <FitToPoints
        points={fitPoints}
        enabled={fitKey > 0}
        trigger={fitKey}
        padding={64}
        maxZoom={15}
      />

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userIcon}
          zIndexOffset={400}
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            Vous êtes ici
          </Tooltip>
        </Marker>
      )}

      {pharmacies
        .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
        .map((p) => {
          const isSelected = selected != null && pKey(selected) === pKey(p);
          return (
            <Marker
              key={pKey(p)}
              position={[p.latitude, p.longitude]}
              icon={icons.get(isSelected, !!p.is_on_duty)}
              zIndexOffset={isSelected ? 500 : p.is_on_duty ? 200 : 100}
              eventHandlers={{ click: () => onSelect(p) }}
            >
              <Popup className="gs-leaflet-popup" closeButton={false}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: popupHtml(
                      p.name,
                      p.address || p.city,
                      p.is_on_duty ? "Pharmacie de garde" : p.status_label || null
                    ),
                  }}
                />
                <button
                  type="button"
                  className="gs-popup-cta"
                  onClick={() => onSelect(p)}
                >
                  Sélectionner
                </button>
              </Popup>
            </Marker>
          );
        })}

      <RoutePolyline geometry={routeGeometry} />
    </MapContainer>
  );
}

function PharmacyControls({
  userLocation,
  onFit,
  showFit,
}: {
  userLocation: LatLng | null;
  onFit: () => void;
  showFit: boolean;
}) {
  const map = useMap();
  return (
    <MapFloatingControls
      onLocate={
        userLocation
          ? () =>
              map.flyTo([userLocation.lat, userLocation.lng], Math.max(map.getZoom(), 15), {
                duration: 0.55,
              })
          : undefined
      }
      locateDisabled={!userLocation}
      showFit={showFit}
      onFit={onFit}
    />
  );
}
