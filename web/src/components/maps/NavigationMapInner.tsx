"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/routing";
import type { MapMarker } from "./NavigationMap";
import {
  BaseTileLayer,
  FitToPoints,
  InvalidateSizeOnMount,
  MapFloatingControls,
} from "@/components/maps/MapChrome";
import { RoutePolyline } from "@/components/maps/RoutePolyline";
import {
  DEFAULT_CENTER,
  MAP_COLORS,
  dropPinIcon,
  popupHtml,
  stopBadgeIcon,
  toneDotIcon,
  userLocationIcon,
} from "@/components/maps/mapTheme";
import "leaflet/dist/leaflet.css";

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
      map.setView([userLocation.lat, userLocation.lng], Math.max(map.getZoom(), 15), {
        animate: true,
      });
    }
  }, [map, userLocation, followUser]);
  return null;
}

function FitRouteOnLoad({
  routeGeometry,
  userLocation,
  markers,
}: {
  routeGeometry: LatLng[];
  userLocation: LatLng | null;
  markers: MapMarker[];
}) {
  const map = useMap();
  useEffect(() => {
    if (routeGeometry.length > 1) {
      const bounds = L.latLngBounds(
        routeGeometry.map((p) => [p.lat, p.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [48, 72], maxZoom: 16 });
      return;
    }
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 14);
    } else if (markers[0]) {
      map.setView([markers[0].lat, markers[0].lng], 14);
    }
  }, [map, routeGeometry, userLocation, markers]);
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
  const center = userLocation ?? markers[0] ?? DEFAULT_CENTER;
  const [fitKey, setFitKey] = useState(0);
  const userIcon = useMemo(() => userLocationIcon(heading), [heading]);

  const fitPoints = useMemo(() => {
    if (routeGeometry.length > 1) return routeGeometry;
    const pts: LatLng[] = [];
    if (userLocation) pts.push(userLocation);
    markers.forEach((m) => pts.push({ lat: m.lat, lng: m.lng }));
    waypoints.forEach((w) => pts.push(w));
    return pts;
  }, [routeGeometry, userLocation, markers, waypoints]);

  const onFit = useCallback(() => setFitKey((k) => k + 1), []);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={14}
      className="gs-map h-full w-full"
      scrollWheelZoom
      zoomControl={false}
    >
      <BaseTileLayer />
      <InvalidateSizeOnMount deps={[routeGeometry.length, markers.length]} />
      <MapFollow userLocation={userLocation} followUser={followUser} />
      <FitRouteOnLoad
        routeGeometry={routeGeometry}
        userLocation={userLocation}
        markers={markers}
      />
      <FitToPoints
        points={fitPoints}
        enabled={fitKey > 0}
        trigger={fitKey}
        padding={56}
        maxZoom={16}
      />
      <NavControls userLocation={userLocation} onFit={onFit} showFit={fitPoints.length >= 2} />

      <RoutePolyline geometry={routeGeometry} color={MAP_COLORS.brand} />

      {waypoints.map((wp, i) => (
        <Marker
          key={`wp-${i}`}
          position={[wp.lat, wp.lng]}
          icon={stopBadgeIcon(i + 1, MAP_COLORS.waypoint)}
          zIndexOffset={250}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            Étape {i + 1}
          </Tooltip>
        </Marker>
      ))}

      {markers.map((m) => {
        const isDest = m.id === "dest" || m.color === "red";
        const icon = isDest
          ? dropPinIcon(MAP_COLORS.red, undefined)
          : toneDotIcon(m.color ?? "emerald");
        return (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={icon}
            zIndexOffset={isDest ? 350 : 200}
          >
            {m.label && (
              <Popup className="gs-leaflet-popup" closeButton={false}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: popupHtml(m.label),
                  }}
                />
              </Popup>
            )}
          </Marker>
        );
      })}

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userIcon}
          zIndexOffset={600}
        >
          <Tooltip direction="top" offset={[0, -14]}>
            Votre position
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
}

function NavControls({
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
              map.flyTo([userLocation.lat, userLocation.lng], Math.max(map.getZoom(), 16), {
                duration: 0.5,
              })
          : undefined
      }
      locateDisabled={!userLocation}
      showFit={showFit}
      onFit={onFit}
    />
  );
}
