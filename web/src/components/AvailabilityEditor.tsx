"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

type Slot = {
  id: string;
  start: string;
  durationMinutes: number;
  status: "open" | "blocked";
  appointmentStatus: string | null;
};

const APPOINTMENT_LABELS: Record<string, string> = {
  scheduled: "Demande à confirmer",
  confirmed: "Rendez-vous confirmé",
  in_progress: "Consultation en cours",
};

function defaultDateTime() {
  const date = new Date();
  date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5, 0, 0);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function AvailabilityEditor() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [startsAt, setStartsAt] = useState(defaultDateTime);
  const [duration, setDuration] = useState(30);
  const [repeat, setRepeat] = useState(false);
  const [repeatWeeks, setRepeatWeeks] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/availability?as=psychologue");
    const data = await res.json();
    if (res.ok) setSlots(data.slots ?? []);
    else setMessage(data.error ?? "Erreur de chargement");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => {
    const grouped = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = new Date(slot.start).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Africa/Ouagadougou",
      });
      grouped.set(key, [...(grouped.get(key) ?? []), slot]);
    }
    return [...grouped.entries()];
  }, [slots]);

  async function publish() {
    if (!startsAt) return;
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startsAt: new Date(startsAt).toISOString(),
        durationMinutes: duration,
        repeatWeeks: repeat ? repeatWeeks : 0,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(
        data.created > 1
          ? `${data.created} créneaux publiés avec succès`
          : "Créneau publié avec succès"
      );
      setStartsAt(defaultDateTime());
      load();
    } else {
      setMessage(data.error ?? "Impossible de publier");
    }
    setSaving(false);
  }

  async function toggleSlot(slot: Slot) {
    const status = slot.status === "open" ? "blocked" : "open";
    const res = await fetch("/api/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: slot.id, status }),
    });
    if (res.ok) load();
  }

  async function removeSlot(slot: Slot) {
    if (slot.appointmentStatus) {
      setMessage("Ce créneau est réservé. Annulez d'abord le rendez-vous dans l'onglet RDV.");
      return;
    }
    if (!window.confirm("Supprimer ce créneau ?")) return;
    setMessage(null);
    const res = await fetch(`/api/availability?id=${encodeURIComponent(slot.id)}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMessage("Créneau supprimé");
      load();
    } else {
      setMessage(data.error ?? "Suppression impossible");
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-5">
        <h2 className="flex items-center gap-2 font-semibold text-slate-900">
          <CalendarDays className="h-5 w-5 text-emerald-600" /> Publier mes créneaux
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Chaque créneau correspond à une date précise. La répétition est facultative.
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.5fr)_minmax(120px,.7fr)_auto] sm:items-end">
          <label className="block min-w-0">
            <span className="text-sm font-medium text-slate-700">Date et heure</span>
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(event) => setStartsAt(event.target.value)}
              className="mt-1 w-full min-w-0 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Durée</span>
            <select
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:outline-none"
            >
              {[15, 30, 45, 60, 90, 120].map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes < 60 ? `${minutes} min` : `${minutes / 60} h`}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={publish}
            disabled={saving || !startsAt}
            className="flex h-[42px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Publier
          </button>
        </div>

        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={repeat}
              onChange={(event) => setRepeat(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Copy className="h-4 w-4 text-emerald-600" /> Répéter ce créneau chaque semaine
              </span>
              <span className="block text-xs text-slate-500">
                Pratique si vous êtes disponible à la même heure plusieurs semaines.
              </span>
            </span>
          </label>
          {repeat && (
            <label className="mt-3 flex flex-wrap items-center gap-2 pl-7 text-sm text-slate-600">
              Répéter pendant
              <select
                value={repeatWeeks}
                onChange={(event) => setRepeatWeeks(Number(event.target.value))}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
              >
                {[1, 2, 3, 4, 6, 8, 12].map((weeks) => (
                  <option key={weeks} value={weeks}>
                    {weeks} semaine{weeks > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-400">
                ({repeatWeeks + 1} créneaux au total, aujourd’hui inclus)
              </span>
            </label>
          )}
        </div>

        {message && (
          <p
            className={`mt-3 rounded-lg px-3 py-2 text-sm ${
              message.includes("succès") ||
              message.includes("publié") ||
              message.includes("supprimé")
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="border-t border-slate-100 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900">Créneaux à venir</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
            {slots.length} créneau{slots.length !== 1 ? "x" : ""}
          </span>
        </div>

        {loading ? (
          <p className="flex items-center gap-2 py-4 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
          </p>
        ) : groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Aucun créneau publié. Choisissez une date et une heure ci-dessus.
          </div>
        ) : (
          <div className="max-h-[430px] space-y-4 overflow-y-auto pr-1">
            {groups.map(([date, dateSlots]) => (
              <div key={date}>
                <p className="mb-2 text-xs font-semibold capitalize text-slate-500">{date}</p>
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {dateSlots.map((slot) => {
                    const booked = Boolean(slot.appointmentStatus);
                    return (
                      <div
                        key={slot.id}
                        className={`rounded-xl border p-3 ${
                          booked
                            ? "border-amber-200 bg-amber-50"
                            : slot.status === "blocked"
                              ? "border-slate-200 bg-slate-100 opacity-75"
                              : "border-emerald-100 bg-emerald-50/60"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="flex items-center gap-1.5 font-semibold text-slate-900">
                              <Clock className="h-4 w-4 text-emerald-600" />
                              {new Date(slot.start).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Africa/Ouagadougou",
                              })}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {slot.durationMinutes} minutes
                            </p>
                          </div>
                          {booked ? (
                            <CheckCircle2 className="h-5 w-5 text-amber-600" />
                          ) : slot.status === "blocked" ? (
                            <XCircle className="h-5 w-5 text-slate-500" />
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <p className={`mt-2 text-xs font-medium ${
                          booked
                            ? "text-amber-700"
                            : slot.status === "blocked"
                              ? "text-slate-500"
                              : "text-emerald-700"
                        }`}>
                          {booked
                            ? APPOINTMENT_LABELS[slot.appointmentStatus!] ?? "Réservé"
                            : slot.status === "blocked"
                              ? "Masqué aux patients"
                              : "Disponible"}
                        </p>
                        <div className="mt-2 flex gap-1.5">
                          {!booked && (
                            <button
                              type="button"
                              onClick={() => toggleSlot(slot)}
                              className="flex-1 rounded-lg border bg-white px-2 py-1.5 text-xs text-slate-600"
                            >
                              {slot.status === "open" ? "Masquer" : "Réactiver"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeSlot(slot)}
                            disabled={booked}
                            title={
                              booked
                                ? "Annulez d'abord le rendez-vous"
                                : "Supprimer le créneau"
                            }
                            className={`flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium ${
                              booked
                                ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                                : "border-red-200 bg-white text-red-600 hover:bg-red-50"
                            } ${booked ? "" : "flex-1"}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
