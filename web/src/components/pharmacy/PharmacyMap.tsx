"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { LatLng } from "@/lib/routing";
import type { Pharmacy } from "@/types";

const PharmacyMapInner = dynamic(() => import("./PharmacyMapInner"), {
  ssr: false,
  loading: () => (
    <div className="gs-map-skeleton flex h-full min-h-[280px] items-center justify-center text-sm text-slate-500 sm:min-h-[360px]">
      <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-600" />
      Chargement de la carte…
    </div>
  ),
});

interface Props {
  pharmacies: Pharmacy[];
  userLocation: LatLng | null;
  selected: Pharmacy | null;
  routeGeometry: LatLng[];
  onSelect: (pharmacy: Pharmacy) => void;
}

export function PharmacyMap(props: Props) {
  return (
    <div className="gs-map-shell relative h-[min(58dvh,420px)] w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm sm:h-[420px] lg:h-[520px]">
      <PharmacyMapInner {...props} />
      <div className="gs-map-legend pointer-events-none absolute bottom-3 left-3 z-[500] flex flex-wrap gap-2">
        <span className="gs-legend-chip">
          <i className="gs-legend-dot bg-teal-600" /> Pharmacie
        </span>
        <span className="gs-legend-chip">
          <i className="gs-legend-dot bg-orange-500" /> De garde
        </span>
        <span className="gs-legend-chip">
          <i className="gs-legend-dot bg-blue-600" /> Vous
        </span>
      </div>
    </div>
  );
}
