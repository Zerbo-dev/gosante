"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  fetchRoute,
  formatDistance,
  formatDuration,
  type LatLng,
  type RouteInfo,
} from "@/lib/routing";
import { Loader2, Navigation } from "lucide-react";

const NavigationMapInner = dynamic(() => import("./NavigationMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl bg-slate-900 text-sm text-slate-400">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carte…
    </div>
  ),
});

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  color?: "emerald" | "blue" | "amber" | "red";
};

export function NavigationMap({
  origin,
  destination,
  waypoints = [],
  extraMarkers = [],
  followUser = true,
  className = "h-[min(50dvh,380px)] sm:h-[min(55vh,420px)]",
}: {
  origin?: LatLng | null;
  destination: LatLng;
  waypoints?: LatLng[];
  extraMarkers?: MapMarker[];
  followUser?: boolean;
  className?: string;
}) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("GPS indisponible");
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        if (pos.coords.heading != null && !Number.isNaN(pos.coords.heading)) {
          setHeading(pos.coords.heading);
        }
        setGeoError(null);
      },
      () => setGeoError("Autorisez la localisation pour la navigation"),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  const routeFrom = origin ?? userLocation;
  useEffect(() => {
    if (!routeFrom) return;
    let cancelled = false;
    fetchRoute(routeFrom, destination).then((r) => {
      if (!cancelled) {
        setRoute(r);
        setStepIndex(0);
      }
    });
    const interval = setInterval(() => {
      if (!routeFrom) return;
      fetchRoute(routeFrom, destination).then((r) => {
        if (!cancelled) setRoute(r);
      });
    }, 45_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [routeFrom?.lat, routeFrom?.lng, destination.lat, destination.lng]);

  const currentStep = route?.steps[stepIndex];

  const markers = useMemo(
    () => [
      ...extraMarkers,
      {
        id: "dest",
        lat: destination.lat,
        lng: destination.lng,
        label: "Destination",
        color: "red" as const,
      },
    ],
    [extraMarkers, destination]
  );

  return (
    <div className="space-y-3">
      <div className={`overflow-hidden rounded-2xl ${className}`}>
        <NavigationMapInner
          userLocation={userLocation}
          heading={heading}
          followUser={followUser}
          routeGeometry={route?.geometry ?? []}
          markers={markers}
          waypoints={waypoints}
        />
      </div>

      {geoError && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{geoError}</p>
      )}

      {route && (
        <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-semibold">
              {formatDistance(route.distanceMeters)} · {formatDuration(route.durationSeconds)}
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Navigation className="h-4 w-4" /> Navigation active
            </span>
          </div>
          {currentStep && (
            <p className="mt-2 text-base font-medium leading-snug">{currentStep.instruction}</p>
          )}
          {route.steps.length > 1 && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                disabled={stepIndex <= 0}
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs disabled:opacity-40"
              >
                Précédent
              </button>
              <button
                type="button"
                disabled={stepIndex >= route.steps.length - 1}
                onClick={() => setStepIndex((i) => Math.min(route.steps.length - 1, i + 1))}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs disabled:opacity-40"
              >
                Suivant
              </button>
              <span className="self-center text-xs text-slate-400">
                Étape {stepIndex + 1}/{route.steps.length}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
