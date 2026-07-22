import type { Pharmacy } from "@/types";
import { haversineDistance, type LatLng } from "@/lib/routing";

const DEFAULT_HOURS =
  "Lun–Ven 8h–20h · Sam 8h–12h · Dim fermé (sauf garde)";

/** Horaires standards Ouagadougou / BF — calculé en fuseau Africa/Ouagadougou */
export function getPharmacyOpenState(
  pharmacy: Pick<Pharmacy, "is_on_duty">,
  at: Date = new Date()
): { isOpen: boolean; label: string; detail: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Ouagadougou",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(at);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const mins = hour * 60 + minute;

  // Sun=Dim, Sat=Sam ; en-GB short: Mon Tue Wed Thu Fri Sat Sun
  const isSunday = weekday === "Sun";
  const isSaturday = weekday === "Sat";
  const isWeekday = !isSaturday && !isSunday;

  if (pharmacy.is_on_duty) {
    return {
      isOpen: true,
      label: "De garde",
      detail: "Ouverte (tour de garde)",
    };
  }

  if (isSunday) {
    return {
      isOpen: false,
      label: "Fermée",
      detail: "Dimanche — fermée (sauf garde)",
    };
  }

  if (isSaturday) {
    const open = mins >= 8 * 60 && mins < 12 * 60;
    return {
      isOpen: open,
      label: open ? "Ouverte" : "Fermée",
      detail: open ? "Samedi 8h–12h" : "Samedi : 8h–12h",
    };
  }

  if (isWeekday) {
    const open = mins >= 8 * 60 && mins < 20 * 60;
    return {
      isOpen: open,
      label: open ? "Ouverte" : "Fermée",
      detail: open ? "Lun–Ven 8h–20h" : "Lun–Ven : 8h–20h",
    };
  }

  return { isOpen: false, label: "Fermée", detail: DEFAULT_HOURS };
}

export async function fetchPharmacies(): Promise<Pharmacy[]> {
  const res = await fetch("/api/pharmacies", { cache: "no-store" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Impossible de charger les pharmacies");
  }
  const data = await res.json();
  return (data.pharmacies ?? []) as Pharmacy[];
}

export function sortPharmaciesByDistance(
  pharmacies: Pharmacy[],
  userLocation: LatLng
): (Pharmacy & { straightDistance: number })[] {
  return pharmacies
    .map((p) => ({
      ...p,
      straightDistance: haversineDistance(userLocation, {
        lat: p.latitude,
        lng: p.longitude,
      }),
    }))
    .sort((a, b) => a.straightDistance - b.straightDistance);
}

export { DEFAULT_HOURS };
