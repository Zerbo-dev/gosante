"use client";

import dynamic from "next/dynamic";
import { Loader2, LocateFixed, MapPin } from "lucide-react";
import type { LatLng } from "@/lib/routing";

const DeliveryLocationPickerInner = dynamic(() => import("./DeliveryLocationPickerInner"), {
  ssr: false,
  loading: () => (
    <div className="gs-map-skeleton flex h-full min-h-[240px] items-center justify-center text-sm text-slate-500">
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-600" /> Carte…
    </div>
  ),
});

export function DeliveryLocationPicker({
  value,
  onChange,
  userLocation,
  onLocate,
  locating,
}: {
  value: LatLng | null;
  onChange: (loc: LatLng) => void;
  userLocation: LatLng | null;
  onLocate: () => void;
  locating?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-emerald-900">Lieu de livraison</p>
          <p className="text-xs text-emerald-800/90">
            Touchez la carte pour placer le pin, puis glissez-le pour affiner.
          </p>
        </div>
        <button
          type="button"
          onClick={onLocate}
          disabled={locating}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LocateFixed className="h-3.5 w-3.5" />
          )}
          Ma position
        </button>
      </div>

      <div className="gs-map-shell relative h-[min(42dvh,280px)] w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-slate-100 shadow-sm sm:h-[320px]">
        {!value && (
          <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] flex justify-center px-3">
            <span className="rounded-full bg-slate-900/85 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm">
              Touchez pour placer le point de livraison
            </span>
          </div>
        )}
        <DeliveryLocationPickerInner
          value={value}
          onChange={onChange}
          userLocation={userLocation}
        />
      </div>

      {value ? (
        <p className="flex items-center gap-1.5 text-xs text-emerald-800">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-600" />
          Point confirmé · {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </p>
      ) : (
        <p className="text-xs text-amber-800">
          Aucun pin — touchez la carte ou utilisez votre position GPS.
        </p>
      )}
    </div>
  );
}
