"use client";

import dynamic from "next/dynamic";
import { Loader2, LocateFixed, MapPin } from "lucide-react";
import type { LatLng } from "@/lib/routing";

const DeliveryLocationPickerInner = dynamic(() => import("./DeliveryLocationPickerInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-52 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carte…
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
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-emerald-900">Lieu de livraison sur la carte</p>
          <p className="text-xs text-emerald-800">
            Appuyez sur la carte pour placer le pin, ou glissez-le pour ajuster.
          </p>
        </div>
        <button
          type="button"
          onClick={onLocate}
          disabled={locating}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LocateFixed className="h-3.5 w-3.5" />
          )}
          Ma position
        </button>
      </div>

      <div className="h-52 w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-emerald-200 sm:h-56">
        <DeliveryLocationPickerInner
          value={value}
          onChange={onChange}
          userLocation={userLocation}
        />
      </div>

      {value ? (
        <p className="flex items-center gap-1.5 text-xs text-emerald-700">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          Pin placé : {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </p>
      ) : (
        <p className="text-xs text-amber-700">
          Aucun pin — touchez la carte ou utilisez votre position GPS.
        </p>
      )}
    </div>
  );
}
