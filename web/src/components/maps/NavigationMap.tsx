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
import { ChevronLeft, ChevronRight, Loader2, Navigation } from "lucide-react";

const NavigationMapInner = dynamic(() => import("./NavigationMapInner"), {
  ssr: false,
  loading: () => (
    <div className="gs-map-skeleton flex h-full min-h-[280px] items-center justify-center text-sm text-slate-500">
      <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-600" /> Carte…
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
  className = "h-[min(52dvh,400px)] sm:h-[min(58vh,440px)]",
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
      <div className={`gs-map-shell relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm ${className}`}>
        {route && currentStep && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] p-3">
            <div className="rounded-2xl bg-slate-950/90 px-3.5 py-3 text-white shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wide text-teal-300">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Navigation className="h-3.5 w-3.5" /> Prochaine étape
                </span>
                <span className="normal-case tracking-normal text-slate-300">
                  {formatDistance(route.distanceMeters)} · {formatDuration(route.durationSeconds)}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold leading-snug">{currentStep.instruction}</p>
            </div>
          </div>
        )}
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
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {formatDistance(route.distanceMeters)} · {formatDuration(route.durationSeconds)}
              </p>
              <p className="text-xs text-slate-500">Itinéraire calculé</p>
            </div>
            {route.steps.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={stepIndex <= 0}
                  onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40"
                  aria-label="Étape précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[4.5rem] text-center text-xs text-slate-500">
                  {stepIndex + 1} / {route.steps.length}
                </span>
                <button
                  type="button"
                  disabled={stepIndex >= route.steps.length - 1}
                  onClick={() => setStepIndex((i) => Math.min(route.steps.length - 1, i + 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40"
                  aria-label="Étape suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          {currentStep && (
            <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm leading-snug text-slate-800">
              {currentStep.instruction}
              {currentStep.distanceMeters > 0 && (
                <span className="ml-1 text-slate-500">
                  · {formatDistance(currentStep.distanceMeters)}
                </span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
