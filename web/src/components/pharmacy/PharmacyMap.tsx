"use client";

import dynamic from "next/dynamic";
import type { LatLng } from "@/lib/routing";
import type { Pharmacy } from "@/types";

const PharmacyMapInner = dynamic(() => import("./PharmacyMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500 sm:min-h-[320px]">
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
    <div className="h-[min(52dvh,360px)] w-full min-w-0 max-w-full overflow-hidden rounded-2xl sm:h-[380px] lg:h-[480px]">
      <PharmacyMapInner {...props} />
    </div>
  );
}
