"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationMap } from "@/components/maps/NavigationMap";
import { DeliveryLocationPicker } from "@/components/pharmacy/DeliveryLocationPicker";
import { PharmacyMap } from "@/components/pharmacy/PharmacyMap";
import { CartPanel, MedicationSearch } from "@/components/pharmacy/MedicationSearch";
import { useCart } from "@/lib/cart";
import {
  DEFAULT_HOURS,
  fetchPharmaciesMeta,
  getPharmacyOpenState,
  sortPharmaciesByDistance,
} from "@/lib/pharmacies";
import {
  fetchRoute,
  formatDistance,
  formatDuration,
  estimateDrivingDuration,
  googleMapsDirectionsUrl,
  haversineDistance,
  type LatLng,
  type RouteInfo,
} from "@/lib/routing";
import type { Pharmacy } from "@/types";
import {
  CreditCard,
  Clock,
  ExternalLink,
  Filter,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  Pill,
  Search,
  Shield,
  X,
} from "lucide-react";

type Tab = "carte" | "medicaments";
type ViewMode = "liste" | "carte";
type PaymentMethod = "mobile_money" | "card" | "cash";
type UrgencyLevel = "normal" | "urgent" | "emergency";

function pharmacyKey(p: Pharmacy): string {
  return String(p.external_id ?? p.id ?? p.name);
}

function geoErrorMessage(code: number): string {
  switch (code) {
    case 1:
      return "Permission refusée. Sur iPhone : Réglages → Safari → Localisation → Autoriser.";
    case 2:
      return "Position indisponible. Activez le GPS.";
    case 3:
      return "Délai dépassé. Réessayez avec le GPS activé.";
    default:
      return "Impossible d'obtenir votre position.";
  }
}

export function PharmacyModule() {
  const [tab, setTab] = useState<Tab>("carte");
  const [view, setView] = useState<ViewMode>("liste");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeDutyGroups, setActiveDutyGroups] = useState<string[]>([]);
  const [dutySource, setDutySource] = useState<"rotations" | "legacy" | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [selected, setSelected] = useState<Pharmacy | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [onDutyOnly, setOnDutyOnly] = useState(false);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile_money");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>("normal");
  const [deliveryLocation, setDeliveryLocation] = useState<LatLng | null>(null);
  const [showNav, setShowNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [confirmNoLivreur, setConfirmNoLivreur] = useState(false);
  const { items, clear, total } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    fetchPharmaciesMeta()
      .then((data) => {
        setPharmacies(data.pharmacies);
        setActiveDutyGroups(data.activeDutyGroups ?? []);
        setDutySource(data.dutySource ?? null);
        setLoaded(true);
      })
      .catch((e) => {
        setLoadError(e instanceof Error ? e.message : "Erreur chargement");
        setLoaded(true);
      });
  }, []);

  const cities = useMemo(
    () => [...new Set(pharmacies.map((p) => p.city))].sort((a, b) => a.localeCompare(b, "fr")),
    [pharmacies]
  );
  const dutyGroups = useMemo(
    () =>
      [...new Set(pharmacies.map((p) => p.duty_group).filter(Boolean) as string[])].sort(),
    [pharmacies]
  );

  const requestLocation = useCallback((onSuccess: (loc: LatLng) => void) => {
    if (typeof window === "undefined") return;
    if (!window.isSecureContext) {
      setGeoError("HTTPS requis pour la géolocalisation (utilisez ngrok).");
      return;
    }
    if (!navigator.geolocation) {
      setGeoError("Géolocalisation non supportée.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        onSuccess(loc);
        setLocating(false);
      },
      (err) => {
        setGeoError(geoErrorMessage(err.code));
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 120000 }
    );
  }, []);

  const locateUser = useCallback(() => {
    requestLocation((loc) => setUserLocation(loc));
  }, [requestLocation]);

  const locateDelivery = useCallback(() => {
    requestLocation((loc) => {
      setUserLocation(loc);
      setDeliveryLocation(loc);
    });
  }, [requestLocation]);

  const handleSelect = useCallback(
    (pharmacy: Pharmacy) => {
      if (!Number.isFinite(pharmacy.latitude) || !Number.isFinite(pharmacy.longitude)) {
        setCheckoutMsg("Cette pharmacie n'a pas de coordonnées GPS valides.");
        return;
      }
      setSelected(pharmacy);
      setSelectedKey(pharmacyKey(pharmacy));
      setShowNav(false);
      setRoute(null);

      if (!userLocation) {
        // Sans GPS : on demande la position pour calculer durée / distance
        requestLocation((loc) => setUserLocation(loc));
      }
    },
    [userLocation, requestLocation]
  );

  // Calcule / recalcule l'itinéraire dès qu'une pharmacie + GPS sont dispo
  useEffect(() => {
    if (!selected || !userLocation) return;
    if (!Number.isFinite(selected.latitude) || !Number.isFinite(selected.longitude)) return;
    let cancelled = false;
    setLoadingRoute(true);
    fetchRoute(userLocation, { lat: selected.latitude, lng: selected.longitude })
      .then((r) => {
        if (!cancelled) {
          setRoute(r);
          setLoadingRoute(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRoute(null);
          setLoadingRoute(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [userLocation, selected?.id, selected?.external_id, selected?.latitude, selected?.longitude]);

  async function submitOrder() {
    if (!selected || !deliveryLocation) return;
    setCheckoutLoading(true);
    setCheckoutMsg(null);
    setConfirmNoLivreur(false);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            dci: i.medication.dci,
            designation: i.medication.designation,
            dosage: i.medication.dosage,
            quantity: i.quantity,
            unitPrice: i.medication.pvp ?? 0,
          })),
          pharmacyId: selected?.id ?? null,
          pharmacyExternalId: selected?.external_id ?? null,
          pharmacyName: selected?.name,
          pharmacyCity: selected?.city,
          pharmacyAddress: selected?.address,
          pharmacyPhone: selected?.phone,
          pharmacyLat: selected?.latitude,
          pharmacyLng: selected?.longitude,
          deliveryAddress: deliveryAddress.trim() || undefined,
          customerPhone,
          deliveryLat: deliveryLocation.lat,
          deliveryLng: deliveryLocation.lng,
          urgencyLevel,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur commande");
      clear();
      setDeliveryLocation(null);
      setDeliveryAddress("");
      const codeMsg = data.deliveryCode
        ? `Commande enregistrée ! Paiement: ${data.paymentStatus === "paid" ? "confirmé" : "à encaisser"} · Code livraison : ${data.deliveryCode}.`
        : (data.message ?? "Commande enregistrée !");
      setCheckoutMsg(
        data.deliveryNotice ? `${codeMsg} ${data.deliveryNotice}` : codeMsg
      );
    } catch (e) {
      setCheckoutMsg(e instanceof Error ? e.message : "Erreur");
    } finally {
      setCheckoutLoading(false);
    }
  }

  async function handleCheckout() {
    if (!selected) {
      setCheckoutMsg("Sélectionnez une pharmacie avant de commander.");
      setTab("carte");
      return;
    }
    if (!deliveryLocation) {
      setCheckoutMsg("Placez le pin de livraison sur la carte ou utilisez votre position.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutMsg(null);
    try {
      const availRes = await fetch("/api/livreurs/availability", { cache: "no-store" });
      const avail = await availRes.json().catch(() => ({ online: 0, available: false }));
      if (availRes.ok && !avail.available) {
        setCheckoutLoading(false);
        setConfirmNoLivreur(true);
        return;
      }
    } catch {
      // Si le check échoue, on laisse commander (le backend gérera)
    }

    await submitOrder();
  }

  const filtered = useMemo(() => {
    return pharmacies.filter((p) => {
      if (onDutyOnly && !p.is_on_duty) return false;
      if (openNowOnly && !getPharmacyOpenState(p).isOpen) return false;
      if (cityFilter && p.city !== cityFilter) return false;
      if (groupFilter && p.duty_group !== groupFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.address?.toLowerCase().includes(q) ?? false) ||
          (p.duty_group?.toLowerCase().includes(q) ?? false);
        if (!hit) return false;
      }
      return true;
    });
  }, [pharmacies, onDutyOnly, openNowOnly, cityFilter, groupFilter, search]);

  const sorted = userLocation
    ? sortPharmaciesByDistance(filtered, userLocation)
    : filtered.map((p) => ({ ...p, straightDistance: 0 }));

  const activeFilterCount =
    (onDutyOnly ? 1 : 0) +
    (openNowOnly ? 1 : 0) +
    (cityFilter ? 1 : 0) +
    (groupFilter ? 1 : 0);

  function clearFilters() {
    setOnDutyOnly(false);
    setOpenNowOnly(false);
    setCityFilter("");
    setGroupFilter("");
    setSearch("");
  }

  return (
      <div className="min-w-0 max-w-full space-y-4 overflow-x-clip">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Pharmacie</h1>
            <p className="break-words text-sm text-slate-600 sm:text-base">
              {loaded
                ? `${pharmacies.length} pharmacies · stock démo · commandes & paiement`
                : "Chargement des pharmacies…"}
            </p>
          </div>
          {tab === "carte" && (
            <button
              type="button"
              onClick={locateUser}
              disabled={locating}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white sm:px-4"
            >
              {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
              <span className="sm:hidden">GPS</span>
              <span className="hidden sm:inline">Ma position</span>
            </button>
          )}
        </div>

        <div className="grid w-full min-w-0 grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1 sm:inline-flex sm:w-auto">
          {(
            [
              { id: "carte" as Tab, label: "Pharmacies", icon: MapPin },
              { id: "medicaments" as Tab, label: "Médicaments", icon: Pill },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-medium sm:gap-2 sm:px-4 sm:text-sm ${
                tab === id ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        {loadError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </div>
        )}
        {tab === "carte" && activeDutyGroups.length > 0 && dutySource === "rotations" && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-950">
            <Shield className="h-4 w-4 shrink-0 text-orange-600" />
            <span>
              Cette semaine : groupe{" "}
              <span className="font-semibold">{activeDutyGroups.join(", ")}</span> de garde
              (programme 2026)
            </span>
            <button
              type="button"
              onClick={() => {
                setOnDutyOnly(true);
                setShowFilters(true);
              }}
              className="ml-auto text-xs font-medium text-orange-800 underline"
            >
              Voir les pharmacies de garde
            </button>
          </div>
        )}
        {geoError && tab === "carte" && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {geoError}
          </div>
        )}
        {checkoutMsg && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            {checkoutMsg}
          </div>
        )}

        {tab === "carte" ? (
          <div className="space-y-3">
            {/* Recherche + filtres */}
            <div className="min-w-0 max-w-full rounded-2xl bg-white p-3 shadow-sm sm:p-4">
              <div className="flex min-w-0 gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2">
                  <Search className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nom, quartier, ville…"
                    className="min-w-0 w-full text-sm outline-none"
                  />
                  {search && (
                    <button type="button" onClick={() => setSearch("")} aria-label="Effacer">
                      <X className="h-4 w-4 text-slate-400" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters((v) => !v)}
                  className={`relative flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium ${
                    showFilters || activeFilterCount > 0
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "bg-white text-slate-700"
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtres</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {showFilters && (
                <div className="mt-3 grid grid-cols-1 gap-3 border-t pt-3 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="block text-xs font-medium text-slate-600">
                    Ville
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    >
                      <option value="">Toutes</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Groupe de garde
                    <select
                      value={groupFilter}
                      onChange={(e) => setGroupFilter(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                      disabled={dutyGroups.length === 0}
                    >
                      <option value="">
                        {dutyGroups.length === 0 ? "À définir plus tard" : "Tous"}
                      </option>
                      {dutyGroups.map((g) => (
                        <option key={g} value={g}>
                          Groupe {g}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm sm:mt-5">
                    <input
                      type="checkbox"
                      checked={onDutyOnly}
                      onChange={(e) => setOnDutyOnly(e.target.checked)}
                    />
                    De garde uniquement
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm sm:mt-5">
                    <input
                      type="checkbox"
                      checked={openNowOnly}
                      onChange={(e) => setOpenNowOnly(e.target.checked)}
                    />
                    Ouvertes maintenant
                  </label>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm text-emerald-700 underline sm:col-span-2 lg:col-span-4"
                    >
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{sorted.length}</span>
                  {" / "}
                  {pharmacies.length} affichée{sorted.length > 1 ? "s" : ""}
                </p>
                {/* Toggle liste / carte — surtout utile mobile */}
                <div className="flex rounded-lg bg-slate-100 p-0.5 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setView("liste")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      view === "liste" ? "bg-white shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Liste
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("carte")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      view === "carte" ? "bg-white shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Carte
                  </button>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
              {/* Carte — montée seulement si visible (évite bug Leaflet hors écran) */}
              <div className={`min-w-0 space-y-4 ${view === "liste" ? "hidden lg:block" : "block"}`}>
                {(isDesktop || view === "carte") && (
                  <PharmacyMap
                    key="pharmacy-main-map"
                    pharmacies={filtered}
                    userLocation={userLocation}
                    selected={selected}
                    routeGeometry={route?.geometry ?? []}
                    onSelect={handleSelect}
                  />
                )}
                {selected && (
                  <PharmacyDetail
                    selected={selected}
                    userLocation={userLocation}
                    route={route}
                    loadingRoute={loadingRoute}
                    onStartNav={
                      userLocation
                        ? () => setShowNav(true)
                        : undefined
                    }
                  />
                )}
                {selected && userLocation && showNav && (
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                        <Navigation className="h-4 w-4 text-emerald-600" />
                        Navigation vers la pharmacie
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowNav(false)}
                        className="text-xs text-slate-500 underline"
                      >
                        Fermer
                      </button>
                    </div>
                    <NavigationMap
                      key={`nav-${selectedKey}`}
                      destination={{ lat: selected.latitude, lng: selected.longitude }}
                      className="h-[min(50vh,360px)]"
                    />
                  </div>
                )}
              </div>

              {/* Liste — desktop toujours ; mobile selon toggle */}
              <div className={`min-w-0 ${view === "carte" ? "hidden lg:block" : "block"}`}>
                <PharmacyList
                  loaded={loaded}
                  sorted={sorted}
                  selectedKey={selectedKey}
                  userLocation={userLocation}
                  onSelect={(p) => {
                    handleSelect(p);
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      setView("carte");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <div className="min-w-0 rounded-2xl bg-white p-3 shadow-sm sm:p-5">
              <h2 className="mb-1 font-semibold">Médicaments en stock</h2>
              <p className="mb-4 text-xs text-slate-500">
                Démo : recherche dans le stock des pharmacies pilotes (pas la LNME).
              </p>
              <MedicationSearch pharmacyId={selected?.id ?? null} />
            </div>
            <div className="min-w-0 space-y-4">
              <div className="rounded-xl border bg-white p-3 text-sm sm:p-4">
                <label className="mb-2 block font-medium text-slate-900">
                  Pharmacie de retrait <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedKey ?? ""}
                  onChange={(e) => {
                    const p = pharmacies.find((ph) => pharmacyKey(ph) === e.target.value);
                    if (p) handleSelect(p);
                  }}
                  className="max-w-full w-full rounded-lg border px-3 py-2"
                  required
                >
                  <option value="">— Choisir une pharmacie —</option>
                  {pharmacies.map((p) => (
                    <option key={pharmacyKey(p)} value={pharmacyKey(p)}>
                      {p.name} — {p.city}
                      {p.is_on_duty ? " (garde)" : ""}
                    </option>
                  ))}
                </select>
                {selected && (
                  <p className="mt-2 break-words text-xs text-emerald-700">
                    ✓ {selected.name}, {selected.city}
                  </p>
                )}
                {!selected && (
                  <p className="mt-2 text-xs text-amber-700">
                    Obligatoire pour que le pharmacien reçoive votre commande.
                  </p>
                )}
              </div>
              <CartPanel
                onCheckout={handleCheckout}
                checkoutLoading={checkoutLoading}
                disabled={!selected}
              />
              <div className="rounded-xl border bg-white p-4 text-sm">
                <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <DeliveryLocationPicker
                    value={deliveryLocation}
                    onChange={setDeliveryLocation}
                    userLocation={userLocation}
                    onLocate={locateDelivery}
                    locating={locating}
                  />
                </div>
                <label className="mb-2 block font-medium">
                  Précision (optionnel)
                  <span className="ml-1 font-normal text-slate-500">immeuble, porte, repère…</span>
                </label>
                <input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="mb-3 w-full rounded-lg border px-3 py-2"
                  placeholder="Ex. portail vert, 2ᵉ maison à gauche"
                />
                <label className="mb-3 block font-medium">
                  Téléphone du patient
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    placeholder="+226 70 00 00 00"
                  />
                </label>
                <label className="mb-2 block font-medium">Niveau d'urgence</label>
                <select
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value as UrgencyLevel)}
                  className="mb-3 w-full rounded-lg border px-3 py-2"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Urgence vitale</option>
                </select>
                <label className="mb-2 block font-medium">Paiement test GoSanté</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="mobile_money">Mobile Money (Orange / Moov)</option>
                  <option value="card">Carte bancaire</option>
                  <option value="cash">Espèces à la livraison</option>
                </select>
                <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <CreditCard className="mt-0.5 h-4 w-4 shrink-0" />
                  Les paiements sont simulés pour les tests. Mobile Money et carte passent en payé,
                  espèces restent à encaisser par le livreur.
                </div>
                {total > 0 && (
                  <p className="mt-2 text-xs text-slate-500">
                    Total estimé : {total.toLocaleString("fr-FR")} FCFA
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {confirmNoLivreur && (
          <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-slate-900">Aucun livreur disponible</h3>
              <p className="mt-2 text-sm text-slate-600">
                Aucun livreur n’est en ligne pour le moment. La livraison pourra être retardée
                jusqu’à ce qu’un livreur se connecte. Voulez-vous commander quand même ?
              </p>
              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={checkoutLoading}
                  onClick={() => setConfirmNoLivreur(false)}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-700"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={checkoutLoading}
                  onClick={() => submitOrder()}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {checkoutLoading ? "Envoi…" : "Oui, commander quand même"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

function PharmacyDetail({
  selected,
  userLocation,
  route,
  loadingRoute,
  onStartNav,
}: {
  selected: Pharmacy;
  userLocation: LatLng | null;
  route: RouteInfo | null;
  loadingRoute: boolean;
  onStartNav?: () => void;
}) {
  const openState = getPharmacyOpenState(selected);
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-base font-semibold sm:text-lg">{selected.name}</h2>
          <p className="break-words text-sm text-slate-600">
            {selected.address}, {selected.city}
          </p>
          {selected.duty_group && (
            <p className="mt-1 text-xs text-slate-500">Groupe de garde : {selected.duty_group}</p>
          )}
        </div>
        <div className="flex max-w-full flex-wrap gap-1.5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              openState.isOpen
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {openState.label}
          </span>
          {selected.is_on_duty && (
            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
              <Shield className="h-3 w-3" />
              De garde
            </span>
          )}
        </div>
      </div>
      <p className="mt-2 break-words text-xs text-slate-500">{openState.detail}</p>
      <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-3">
        <Stat
          icon={MapPin}
          label="Distance"
          value={
            loadingRoute
              ? "…"
              : route
                ? formatDistance(route.distanceMeters)
                : userLocation
                  ? `${formatDistance(haversineDistance(userLocation, { lat: selected.latitude, lng: selected.longitude }))} (vol d'oiseau)`
                  : "—"
          }
        />
        <Stat
          icon={Clock}
          label="Durée"
          value={
            loadingRoute
              ? "…"
              : route
                ? formatDuration(route.durationSeconds)
                : userLocation
                  ? `~${formatDuration(
                      estimateDrivingDuration(
                        haversineDistance(userLocation, {
                          lat: selected.latitude,
                          lng: selected.longitude,
                        })
                      )
                    )}`
                  : "—"
          }
        />
        <Stat icon={Clock} label="Horaires" value={selected.opening_hours || DEFAULT_HOURS} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {selected.phone && (
          <a
            href={`tel:${selected.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm sm:px-4"
          >
            <Phone className="h-4 w-4 shrink-0" />
            Appeler
          </a>
        )}
        {userLocation && (
          <a
            href={googleMapsDirectionsUrl(userLocation, {
              lat: selected.latitude,
              lng: selected.longitude,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white sm:px-4"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Itinéraire Maps
          </a>
        )}
        {onStartNav && (
          <button
            type="button"
            onClick={onStartNav}
            className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 sm:px-4"
          >
            <Navigation className="h-4 w-4 shrink-0" />
            Navigation in-app
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {label}
      </div>
      <div className="mt-1 break-words text-sm font-semibold leading-snug">{value}</div>
    </div>
  );
}

function PharmacyList({
  loaded,
  sorted,
  selectedKey,
  userLocation,
  onSelect,
}: {
  loaded: boolean;
  sorted: (Pharmacy & { straightDistance: number })[];
  selectedKey: string | null;
  userLocation: LatLng | null;
  onSelect: (p: Pharmacy) => void;
}) {
  return (
    <aside className="min-w-0 overflow-hidden rounded-2xl bg-white p-3 shadow-sm sm:p-4">
      <div className="max-h-[min(70vh,560px)] space-y-2 overflow-y-auto overflow-x-clip">
        {!loaded && (
          <p className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
          </p>
        )}
        {loaded && sorted.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            Aucune pharmacie ne correspond aux filtres.
          </p>
        )}
        {sorted.map((p) => {
          const key = pharmacyKey(p);
          const openState = getPharmacyOpenState(p);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(p)}
              className={`w-full min-w-0 max-w-full rounded-xl border p-3 text-left transition ${
                selectedKey === key
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="flex min-w-0 items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-900">{p.name}</div>
                  <div className="truncate text-xs text-slate-500">{p.city}</div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    openState.isOpen
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {openState.label}
                </span>
              </div>
              <div className="mt-1.5 min-w-0 text-[11px] text-slate-500">
                <span className="line-clamp-2 break-words">{p.opening_hours || DEFAULT_HOURS}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                {p.is_on_duty && (
                  <span className="flex items-center gap-0.5 text-amber-700">
                    <Shield className="h-3 w-3" /> De garde
                  </span>
                )}
                {p.duty_group && (
                  <span className="text-slate-400">Groupe {p.duty_group}</span>
                )}
                {userLocation && p.straightDistance > 0 && (
                  <span className="text-emerald-700">{formatDistance(p.straightDistance)}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
