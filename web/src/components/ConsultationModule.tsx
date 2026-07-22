"use client";

import { useEffect, useMemo, useState } from "react";
import { RatingForm } from "@/components/RatingForm";
import { MyRatingDisplay, type MyRating } from "@/components/MyRatingDisplay";
import { VisioRoom } from "@/components/VisioRoom";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Loader2,
  MapPin,
  Phone,
  Shield,
  UserRound,
  Video,
  X,
  Star,
} from "lucide-react";
import { checkVisioAccess } from "@/lib/visio-access";

type Tab = "psychologues" | "rdv";

interface Psychologist {
  id: string;
  full_name: string;
  specialty: string;
  city: string;
  phone: string | null;
  bio: string | null;
  languages: string[];
  consultation_fee: number | null;
  rating_avg?: number | null;
  rating_count?: number;
}

interface Appointment {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  reason: string | null;
  is_anonymous: boolean;
  jitsi_room: string;
  psychologist_last_seen_at: string | null;
  psychologists: {
    id?: string;
    full_name: string;
    specialty: string;
    city: string;
    phone: string | null;
  } | null;
  patient_rated_at?: string | null;
  my_rating?: MyRating | null;
}

type AvailableSlot = { id: string; start: string; durationMinutes: number };

const STATUS_META: Record<string, { label: string; className: string }> = {
  scheduled: { label: "En attente de confirmation", className: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmé", className: "bg-emerald-100 text-emerald-800" },
  in_progress: { label: "En cours", className: "bg-sky-100 text-sky-800" },
  completed: { label: "Terminé", className: "bg-slate-100 text-slate-600" },
  cancelled: { label: "Annulé", className: "bg-red-100 text-red-700" },
};

function formatSlot(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Ouagadougou",
  });
}

export function ConsultationModule() {
  const [tab, setTab] = useState<Tab>("psychologues");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Réservation
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [reason, setReason] = useState("");
  const [wantAnonymous, setWantAnonymous] = useState(false);
  const [booking, setBooking] = useState(false);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Visio (overlay plein écran)
  const [activeAppt, setActiveAppt] = useState<Appointment | null>(null);
  const [visioAnonymous, setVisioAnonymous] = useState(false);
  const [visioStarted, setVisioStarted] = useState(false);
  const [displayName, setDisplayName] = useState("Patient GoSanté");

  const load = async (opts?: { silent?: boolean }) => {
    // silent = rafraîchissement en arrière-plan, sans spinner plein écran
    if (!opts?.silent) setLoading(true);
    if (!opts?.silent) setError(null);
    try {
      const [pRes, aRes] = await Promise.all([
        fetch("/api/psychologists"),
        fetch("/api/appointments"),
      ]);
      const pData = await pRes.json();
      const aData = await aRes.json();
      if (!pRes.ok) throw new Error(pData.error ?? "Erreur psychologues");
      if (!aRes.ok) throw new Error(aData.error ?? "Erreur RDV");
      setPsychologists(pData.psychologists ?? []);
      setAppointments(aData.appointments ?? []);
    } catch (e) {
      if (!opts?.silent) setError(e instanceof Error ? e.message : "Erreur chargement");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    // Jamais de rafraîchissement pendant un appel : cela couperait la visio.
    if (visioStarted) return;
    const timer = window.setInterval(() => {
      if (tab === "rdv") load({ silent: true });
    }, 15_000);
    return () => window.clearInterval(timer);
  }, [tab, visioStarted]);

  const upcoming = useMemo(
    () =>
      appointments.filter(
        (a) => a.status !== "cancelled" && a.status !== "completed"
      ),
    [appointments]
  );
  const past = useMemo(
    () =>
      appointments.filter((a) => a.status === "cancelled" || a.status === "completed"),
    [appointments]
  );

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!bookingId || !selectedSlotId) return;
    setBooking(true);
    setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          psychologistId: bookingId,
          slotId: selectedSlotId,
          reason,
          isAnonymous: wantAnonymous,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur RDV");
      setMsg(
        wantAnonymous
          ? "Demande envoyée en mode anonyme. Le psychologue sera notifié — il doit confirmer."
          : "Demande envoyée. Le psychologue sera notifié — vous serez alerté(e) à la confirmation."
      );
      setBookingId(null);
      setSelectedSlotId("");
      setReason("");
      setWantAnonymous(false);
      await load();
      setTab("rdv");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBooking(false);
    }
  }

  async function loadSlots(psychologistId: string) {
    setBookingId(psychologistId);
    setSelectedSlotId("");
    setWantAnonymous(false);
    setMsg(null);
    setSlotsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/availability?psychologistId=${psychologistId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur disponibilités");
      setSlots(data.slots ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur disponibilités");
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  async function openVisio(appt: Appointment) {
    setError(null);
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: appt.id, action: "join" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Le psychologue n'est pas encore dans la salle");
      return;
    }
    setActiveAppt(appt);
    setVisioAnonymous(appt.is_anonymous);
    setVisioStarted(false);
    setDisplayName(appt.is_anonymous ? "Patient anonyme" : "Patient GoSanté");
  }

  function closeVisio() {
    setVisioStarted(false);
    setActiveAppt(null);
    load({ silent: true });
  }

  async function cancelAppt(id: string) {
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: id, status: "cancelled" }),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("RDV annulé");
      load();
    } else {
      setError(data.error ?? "Annulation impossible");
    }
  }

  function psychologistIsOnline(appt: Appointment) {
    if (appt.status !== "in_progress" || !appt.psychologist_last_seen_at) return false;
    return Date.now() - new Date(appt.psychologist_last_seen_at).getTime() <= 90_000;
  }

  function canCancel(appt: Appointment) {
    return new Date(appt.scheduled_at).getTime() - Date.now() >= 24 * 60 * 60_000;
  }

  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        {/* En-tête */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Consultation</h1>
            <p className="text-sm text-slate-600 sm:text-base">
              Prenez rendez-vous avec un psychologue et consultez en visio sécurisée.
            </p>
          </div>
        </div>

        {msg && (
          <div className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800 ring-1 ring-emerald-100">
            {msg}
          </div>
        )}
        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </div>
        )}

        {/* Onglets — pleine largeur sur mobile */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-200/70 p-1 sm:inline-flex sm:w-auto">
          <button
            type="button"
            onClick={() => setTab("psychologues")}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:py-2 ${
              tab === "psychologues" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
            }`}
          >
            <UserRound className="h-4 w-4" /> Psychologues
          </button>
          <button
            type="button"
            onClick={() => setTab("rdv")}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:py-2 ${
              tab === "rdv" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
            }`}
          >
            <Calendar className="h-4 w-4" /> Mes RDV
            {upcoming.length > 0 && (
              <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {upcoming.length}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 py-8 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        ) : tab === "psychologues" ? (
          /* ---------- Onglet Psychologues ---------- */
          <div className="space-y-4">
            {psychologists.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                <UserRound className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                Aucun psychologue disponible pour le moment.
              </div>
            ) : (
              psychologists.map((p) => (
                <div key={p.id} className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700">
                        {p.full_name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-semibold text-slate-900">{p.full_name}</h2>
                        <p className="text-sm text-emerald-700">{p.specialty}</p>
                        {p.rating_count && p.rating_count > 0 && p.rating_avg != null ? (
                          <p className="mt-1 flex items-center gap-1 text-sm text-amber-700">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{p.rating_avg.toFixed(1)}</span>
                            <span className="text-slate-500">
                              ({p.rating_count} avis)
                            </span>
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-slate-400">Pas encore d’avis</p>
                        )}
                      </div>
                    </div>
                    {p.consultation_fee != null && (
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                        {Number(p.consultation_fee).toLocaleString("fr-FR")} FCFA
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {p.city}
                    </span>
                    {p.phone && (
                      <a
                        href={`tel:${p.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-1 text-emerald-700"
                      >
                        <Phone className="h-4 w-4" /> {p.phone}
                      </a>
                    )}
                  </div>
                  {p.bio && <p className="mt-2 text-sm text-slate-600">{p.bio}</p>}
                  {p.languages && p.languages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.languages.map((lang) => (
                        <span key={lang} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}

                  {bookingId !== p.id ? (
                    <button
                      type="button"
                      onClick={() => loadSlots(p.id)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 sm:w-auto"
                    >
                      <CalendarPlus className="h-4 w-4" /> Voir les créneaux
                    </button>
                  ) : (
                    <form
                      onSubmit={submitBooking}
                      className="mt-4 space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 sm:p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          Choisissez un créneau
                        </p>
                        {slotsLoading ? (
                          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin" /> Chargement des créneaux…
                          </div>
                        ) : slots.length === 0 ? (
                          <p className="mt-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-500">
                            Aucun créneau publié dans les 30 prochains jours.
                          </p>
                        ) : (
                          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {slots.map((slot) => (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedSlotId(slot.id)}
                                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                                  selectedSlotId === slot.id
                                    ? "border-emerald-600 bg-emerald-600 text-white shadow"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                                }`}
                              >
                                <span className="block font-medium capitalize">
                                  {formatSlot(slot.start)}
                                </span>
                                <span
                                  className={`text-xs ${
                                    selectedSlotId === slot.id ? "text-emerald-100" : "text-slate-500"
                                  }`}
                                >
                                  {slot.durationMinutes} minutes
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <label className="block text-sm font-medium text-slate-800">
                        Motif (optionnel)
                        <input
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Stress, anxiété, écoute…"
                          className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
                        />
                      </label>

                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-amber-900">
                              Souhaitez-vous rester anonyme ?
                            </p>
                            <p className="mt-1 text-xs text-amber-800">
                              Si oui, votre caméra sera désactivée et votre nom affiché sera
                              « Patient anonyme ».
                            </p>
                            <div className="mt-3 grid grid-cols-1 gap-2 sm:flex">
                              <button
                                type="button"
                                onClick={() => setWantAnonymous(true)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                                  wantAnonymous
                                    ? "bg-amber-700 text-white"
                                    : "border border-amber-300 bg-white text-amber-900"
                                }`}
                              >
                                Oui, anonyme (cam off)
                              </button>
                              <button
                                type="button"
                                onClick={() => setWantAnonymous(false)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                                  !wantAnonymous
                                    ? "bg-emerald-600 text-white"
                                    : "border border-slate-200 bg-white text-slate-700"
                                }`}
                              >
                                Non, avec caméra
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="submit"
                          disabled={booking || !selectedSlotId}
                          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
                        >
                          {booking ? "Envoi…" : "Demander ce rendez-vous"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingId(null)}
                          className="rounded-xl border bg-white px-4 py-2.5 text-sm"
                        >
                          Fermer
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          /* ---------- Onglet Mes RDV ---------- */
          <div className="space-y-6">
            <div className="space-y-3">
              {upcoming.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                  <Calendar className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                  Aucun rendez-vous à venir.
                  <button
                    type="button"
                    onClick={() => setTab("psychologues")}
                    className="mx-auto mt-3 block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Trouver un psychologue
                  </button>
                </div>
              ) : (
                upcoming.map((a) => {
                  const online = psychologistIsOnline(a);
                  const meta = STATUS_META[a.status] ?? {
                    label: a.status,
                    className: "bg-slate-100 text-slate-600",
                  };
                  return (
                    <div key={a.id} className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {a.psychologists?.full_name ?? "Professionnel"}
                          </div>
                          <div className="text-sm text-slate-500">
                            {a.psychologists?.specialty}
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
                        >
                          {meta.label}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {new Date(a.scheduled_at).toLocaleString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {a.is_anonymous && (
                          <span className="flex items-center gap-1 text-amber-700">
                            <Shield className="h-4 w-4" /> Anonyme
                          </span>
                        )}
                      </div>
                      {a.reason && (
                        <p className="mt-1.5 text-sm text-slate-500">Motif : {a.reason}</p>
                      )}

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                        {(() => {
                          const access = checkVisioAccess({
                            status: a.status,
                            scheduledAt: a.scheduled_at,
                          });
                          return (
                            <>
                              <button
                                type="button"
                                onClick={() => openVisio(a)}
                                disabled={!access.ok}
                                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                              >
                                <Video className="h-4 w-4" /> Rejoindre la visio
                              </button>
                              {!access.ok && (
                                <span className="text-xs text-amber-700">{access.reason}</span>
                              )}
                            </>
                          );
                        })()}
                        {online && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Le psychologue est dans la salle
                          </span>
                        )}
                        <div className="sm:ml-auto">
                          {canCancel(a) ? (
                            <button
                              type="button"
                              onClick={() => cancelAppt(a.id)}
                              className="w-full rounded-xl border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 sm:w-auto"
                            >
                              Annuler
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">
                              Annulation fermée à moins de 24 h
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {past.length > 0 && (
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Historique
                </h2>
                <div className="space-y-3">
                  {past.map((a) => {
                    const meta = STATUS_META[a.status] ?? {
                      label: a.status,
                      className: "bg-slate-100 text-slate-600",
                    };
                    return (
                      <div
                        key={a.id}
                        className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-medium text-slate-700">
                              {a.psychologists?.full_name ?? "Professionnel"}
                            </span>
                            <span className="ml-2 text-slate-400">
                              {new Date(a.scheduled_at).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
                          >
                            {meta.label}
                          </span>
                        </div>
                        {a.status === "completed" && !a.patient_rated_at && a.psychologists?.id && (
                          <div className="mt-3">
                            <RatingForm
                              title="Comment s'est passée la consultation ?"
                              targetType="psychologist"
                              targetId={a.psychologists.id}
                              appointmentId={a.id}
                              onRated={(rating) => {
                                setAppointments((prev) =>
                                  prev.map((appt) =>
                                    appt.id === a.id
                                      ? {
                                          ...appt,
                                          patient_rated_at: new Date().toISOString(),
                                          my_rating: rating,
                                        }
                                      : appt
                                  )
                                );
                              }}
                            />
                          </div>
                        )}
                        {a.my_rating && (
                          <MyRatingDisplay rating={a.my_rating} label="Votre avis sur cette séance" />
                        )}
                        {a.status === "completed" && a.patient_rated_at && !a.my_rating && (
                          <p className="mt-2 text-xs text-slate-500">Vous avez déjà noté cette séance.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- Overlay visio plein écran ---------- */}
      {activeAppt && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 text-white">
              <p className="truncate text-sm font-semibold">
                {activeAppt.psychologists?.full_name ?? "Consultation"}
              </p>
              <p className="truncate text-xs text-slate-400">Visio GoSanté</p>
            </div>
            <button
              type="button"
              onClick={closeVisio}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15 hover:bg-white/20"
            >
              <X className="h-4 w-4" /> Fermer
            </button>
          </div>

          <div className="flex flex-1 items-start justify-center overflow-y-auto px-3 pb-4 sm:items-center sm:px-6">
            {!visioStarted ? (
              <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Avant de rejoindre la salle
                </h2>
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  Le psychologue est déjà dans la salle. Vérifiez vos réglages puis entrez.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-medium text-amber-900">Mode anonyme ?</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Si oui, votre caméra ne sera pas activée et votre nom sera
                    « Patient anonyme ».
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => {
                        setVisioAnonymous(true);
                        setDisplayName("Patient anonyme");
                      }}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${
                        visioAnonymous ? "bg-amber-700 text-white" : "border bg-white"
                      }`}
                    >
                      Oui — anonyme, cam off
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVisioAnonymous(false);
                        setDisplayName("Patient GoSanté");
                      }}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${
                        !visioAnonymous ? "bg-emerald-600 text-white" : "border bg-white"
                      }`}
                    >
                      Non — avec caméra
                    </button>
                  </div>
                </div>

                {!visioAnonymous && (
                  <label className="block text-sm font-medium text-slate-800">
                    Nom affiché dans la visio
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                    />
                  </label>
                )}

                <button
                  type="button"
                  onClick={async () => {
                    await fetch("/api/appointments", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        appointmentId: activeAppt.id,
                        status: "in_progress",
                        isAnonymous: visioAnonymous,
                      }),
                    });
                    setVisioStarted(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-500"
                >
                  <Video className="h-5 w-5" /> Rejoindre la visio
                </button>
              </div>
            ) : (
              <div className="w-full max-w-4xl space-y-3">
                {visioAnonymous && (
                  <span className="flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-3 py-2 text-sm text-amber-300 ring-1 ring-amber-500/30">
                    <Shield className="h-4 w-4" /> Mode anonyme — caméra désactivée
                  </span>
                )}
                <VisioRoom
                  roomId={activeAppt.jitsi_room}
                  role="guest"
                  displayName={
                    visioAnonymous ? "Patient anonyme" : displayName || "Patient GoSanté"
                  }
                  startWithVideoMuted={visioAnonymous}
                  onLeave={closeVisio}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
