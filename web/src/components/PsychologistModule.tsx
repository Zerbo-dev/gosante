"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { VisioRoom } from "@/components/VisioRoom";
import { AvailabilityEditor } from "@/components/AvailabilityEditor";
import { APPOINTMENT_STATUS_LABELS } from "@/lib/auth-shared";
import { checkVisioAccess } from "@/lib/visio-access";
import {
  AlertTriangle,
  BadgeCheck,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  IdCard,
  Loader2,
  NotebookPen,
  RefreshCw,
  UserRound,
  Video,
  X,
  XCircle,
} from "lucide-react";

type Tab = "rdv" | "creneaux" | "profil";

interface ApptRow {
  id: string;
  scheduled_at: string;
  status: string;
  reason: string | null;
  is_anonymous: boolean;
  jitsi_room: string;
  notes: string | null;
  session_notes: string | null;
  patient_rated_at?: string | null;
  profiles: { full_name: string | null; phone: string | null } | null;
}

interface PsyProfile {
  id: string;
  full_name: string;
  specialty: string;
  city: string;
  phone: string | null;
  bio: string | null;
  languages: string[];
  consultation_fee: number | null;
  is_available: boolean;
  profile_completed: boolean;
}

export function PsychologistModule() {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("rdv");
  const [appointments, setAppointments] = useState<ApptRow[]>([]);
  const [profile, setProfile] = useState<PsyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [activeVisio, setActiveVisio] = useState<ApptRow | null>(null);
  const profileLoaded = useRef(false);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    const silent = Boolean(opts?.silent);
    if (silent) setRefreshing(true);
    else setLoading(true);
    if (!silent) setError(null);
    try {
      if (!profileLoaded.current) {
        const profRes = await fetch("/api/psychologist/profile");
        const profData = await profRes.json();
        if (!profRes.ok) throw new Error(profData.error ?? "Erreur profil");
        const psy = profData.psychologist as PsyProfile;
        setProfile(psy);
        profileLoaded.current = true;
        if (!psy.profile_completed) setTab("profil");
      }

      const res = await fetch("/api/appointments?as=psychologue");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur chargement");
      setAppointments(data.appointments ?? []);
    } catch (e) {
      if (!silent) setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const channel = supabase
      .channel("psy-appointments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => {
          void load({ silent: true });
        }
      )
      .subscribe();

    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void load({ silent: true });
    }, 25_000);

    return () => {
      supabase.removeChannel(channel);
      window.clearInterval(poll);
    };
  }, [supabase, load]);

  useEffect(() => {
    if (!activeVisio) return;
    const heartbeat = () =>
      fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: activeVisio.id, action: "heartbeat" }),
      });
    heartbeat();
    const timer = window.setInterval(heartbeat, 30_000);
    return () => window.clearInterval(timer);
  }, [activeVisio]);

  async function setStatus(appointmentId: string, status: string) {
    setMsg(null);
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status } : a))
    );
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId, status }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Erreur");
      void load({ silent: true });
      return;
    }
    setMsg(`RDV → ${APPOINTMENT_STATUS_LABELS[status] ?? status}`);
    if (data.appointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, ...data.appointment } : a))
      );
    }
  }

  function patchLocalNotes(appointmentId: string, sessionNotes: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, session_notes: sessionNotes } : a))
    );
  }

  async function openVisio(appt: ApptRow) {
    setMsg(null);
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: appt.id, action: "heartbeat" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "La salle n'est pas encore accessible");
      return;
    }
    setActiveVisio(appt);
  }

  const upcoming = appointments.filter(
    (a) => a.status !== "cancelled" && a.status !== "completed"
  );
  const past = appointments.filter(
    (a) => a.status === "cancelled" || a.status === "completed"
  );
  const pendingCount = appointments.filter((a) => a.status === "scheduled").length;

  if (activeVisio) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Visio consultation</h1>
            <p className="text-sm text-slate-600">
              {activeVisio.is_anonymous
                ? "Patient anonyme"
                : activeVisio.profiles?.full_name || "Patient"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveVisio(null);
              void load({ silent: true });
            }}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm"
          >
            <X className="h-4 w-4" /> Fermer
          </button>
        </div>
        <VisioRoom
          roomId={activeVisio.jitsi_room}
          role="host"
          displayName={profile?.full_name || "Psychologue GoSanté"}
          startWithVideoMuted={false}
          onLeave={() => {
            setActiveVisio(null);
            void load({ silent: true });
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Espace psychologue</h1>
          <p className="text-sm text-slate-600 sm:text-base">
            {profile ? profile.full_name : "Gérez vos rendez-vous, créneaux et profil"}
            {refreshing && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs text-slate-400">
                <Loader2 className="h-3 w-3 animate-spin" /> maj…
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load({ silent: true })}
          className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Actualiser
        </button>
      </div>

        {profile && !profile.profile_completed && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-medium text-amber-900">
                  Complétez votre profil professionnel
                </p>
                <p className="text-sm text-amber-800">
                  Spécialité, ville, tarif, langues… Ces informations sont affichées aux
                  patients qui choisissent leur psychologue.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTab("profil")}
              className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500"
            >
              Compléter maintenant
            </button>
          </div>
        )}

        {msg && (
          <p className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800 ring-1 ring-emerald-100">
            {msg}
          </p>
        )}
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </p>
        )}

        {/* Onglets */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-200/70 p-1 sm:inline-flex sm:w-auto">
          {(
            [
              { id: "rdv" as const, label: "Rendez-vous", short: "RDV", icon: Calendar, badge: pendingCount },
              { id: "creneaux" as const, label: "Mes créneaux", short: "Créneaux", icon: CalendarClock, badge: 0 },
              { id: "profil" as const, label: "Mon profil", short: "Profil", icon: IdCard, badge: 0 },
            ] as const
          ).map(({ id, label, short, icon: Icon, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-[11px] font-medium transition sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm ${
                tab === id ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate sm:hidden">{short}</span>
              <span className="hidden truncate sm:inline">{label}</span>
              {badge > 0 && (
                <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 py-8 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        ) : tab === "rdv" ? (
          <div className="space-y-6">
            {upcoming.length === 0 && past.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                <Calendar className="mx-auto mb-2 h-10 w-10 text-slate-300" />
                <p>Aucun rendez-vous pour le moment.</p>
                <p className="mt-2 text-sm">
                  Publiez vos créneaux pour que les patients puissent réserver.
                </p>
                <button
                  type="button"
                  onClick={() => setTab("creneaux")}
                  className="mx-auto mt-3 block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
                >
                  Publier des créneaux
                </button>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="font-semibold text-slate-900">À venir ({upcoming.length})</h2>
                    {upcoming.map((a) => (
                      <ApptCard
                        key={a.id}
                        appt={a}
                        onStatus={setStatus}
                        onVisio={openVisio}
                        onNotesSaved={patchLocalNotes}
                      />
                    ))}
                  </section>
                )}
                {past.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      Historique
                    </h2>
                    {past.map((a) => (
                      <ApptCard
                        key={a.id}
                        appt={a}
                        onStatus={setStatus}
                        onNotesSaved={patchLocalNotes}
                      />
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        ) : tab === "creneaux" ? (
          <AvailabilityEditor />
        ) : (
          profile && (
            <ProfileEditor
              profile={profile}
              onSaved={(updated) => {
                setProfile(updated);
                setMsg("Profil enregistré — il est visible par les patients.");
                setTab("rdv");
              }}
            />
          )
        )}
      </div>
  );
}

/* ---------- Formulaire profil professionnel ---------- */

function ProfileEditor({
  profile,
  onSaved,
}: {
  profile: PsyProfile;
  onSaved: (updated: PsyProfile) => void;
}) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [specialty, setSpecialty] = useState(profile.specialty);
  const [city, setCity] = useState(profile.city);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [languages, setLanguages] = useState<string[]>(profile.languages ?? []);
  const [langInput, setLangInput] = useState("");
  const [fee, setFee] = useState(
    profile.consultation_fee != null ? String(profile.consultation_fee) : ""
  );
  const [isAvailable, setIsAvailable] = useState(profile.is_available);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addLanguage() {
    const value = langInput.trim();
    if (!value || languages.includes(value)) {
      setLangInput("");
      return;
    }
    setLanguages([...languages, value]);
    setLangInput("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/psychologist/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          specialty,
          city,
          phone: phone || null,
          bio: bio || null,
          languages,
          consultationFee: fee === "" ? null : Number(fee),
          isAvailable,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur enregistrement");
      onSaved(data.psychologist as PsyProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-emerald-600" />
        <div>
          <h2 className="font-semibold text-slate-900">Profil professionnel</h2>
          <p className="text-sm text-slate-500">
            Ces informations sont affichées aux patients dans l&apos;onglet Consultation.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Nom complet *
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Spécialité *
          <input
            required
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Psychologie clinique, thérapie familiale…"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Ville *
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ouagadougou, Bobo-Dioulasso…"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Téléphone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+226 70 00 00 00"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Tarif consultation (FCFA)
          <input
            type="number"
            min={0}
            step={500}
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            placeholder="15000"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <div className="block text-sm font-medium text-slate-800">
          Langues parlées *
          <div className="mt-1 flex gap-2">
            <input
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLanguage();
                }
              }}
              placeholder="Français, Mooré, Dioula…"
              className="w-full rounded-lg border px-3 py-2"
            />
            <button
              type="button"
              onClick={addLanguage}
              className="shrink-0 rounded-lg border px-3 py-2 text-sm"
            >
              Ajouter
            </button>
          </div>
          {languages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => setLanguages(languages.filter((l) => l !== lang))}
                    className="text-emerald-600 hover:text-emerald-900"
                    aria-label={`Retirer ${lang}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-800">
        Biographie
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Présentez votre parcours, vos approches, vos domaines d'intervention…"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
        Visible par les patients (disponible pour de nouvelles consultations)
      </label>

      <button
        type="submit"
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-500 disabled:opacity-50 sm:w-auto sm:px-6"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
        Enregistrer mon profil
      </button>
    </form>
  );
}

/* ---------- Carte rendez-vous ---------- */

function ApptCard({
  appt,
  onStatus,
  onVisio,
  readonly,
  onNotesSaved,
}: {
  appt: ApptRow;
  onStatus: (id: string, status: string) => void;
  onVisio?: (appt: ApptRow) => void;
  readonly?: boolean;
  onNotesSaved?: (id: string, notes: string) => void;
}) {
  const hasNotes = Boolean(appt.session_notes?.trim());
  const [notesOpen, setNotesOpen] = useState(false);
  const [sessionNotes, setSessionNotes] = useState(appt.session_notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesMsg, setNotesMsg] = useState<string | null>(null);
  const patientLabel = appt.is_anonymous
    ? "Patient anonyme"
    : appt.profiles?.full_name || "Patient";
  const when = new Date(appt.scheduled_at).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  useEffect(() => {
    setSessionNotes(appt.session_notes ?? "");
  }, [appt.id, appt.session_notes]);

  const canWriteNotes = ["confirmed", "in_progress", "completed"].includes(appt.status);
  const visioAccess = checkVisioAccess({
    status: appt.status,
    scheduledAt: appt.scheduled_at,
  });

  async function saveNotes() {
    setSavingNotes(true);
    setNotesMsg(null);
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: appt.id, sessionNotes }),
    });
    const data = await res.json();
    setSavingNotes(false);
    if (res.ok) {
      setNotesMsg("Enregistré");
      onNotesSaved?.(appt.id, sessionNotes);
      window.setTimeout(() => setNotesMsg(null), 2000);
    } else {
      setNotesMsg(data.error ?? "Erreur d'enregistrement");
    }
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-semibold text-slate-900">
            <UserRound className="h-4 w-4 text-emerald-600" />
            {patientLabel}
          </p>
          <p className="mt-1 text-sm text-slate-600">{when}</p>
          {appt.reason && !appt.is_anonymous && (
            <p className="mt-1 text-sm text-slate-500">Motif : {appt.reason}</p>
          )}
          <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            {APPOINTMENT_STATUS_LABELS[appt.status] ?? appt.status}
          </span>
        </div>
        {!readonly && (
          <div className="flex flex-wrap gap-2">
            {appt.status === "scheduled" && (
              <button
                type="button"
                onClick={() => onStatus(appt.id, "confirmed")}
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white"
              >
                <CheckCircle2 className="h-4 w-4" /> Confirmer
              </button>
            )}
            {(appt.status === "confirmed" || appt.status === "in_progress") && (
              <button
                type="button"
                onClick={() => onStatus(appt.id, "completed")}
                className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white"
              >
                Terminer
              </button>
            )}
            {appt.status !== "cancelled" && appt.status !== "completed" && (
              <button
                type="button"
                onClick={() => onStatus(appt.id, "cancelled")}
                className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700"
              >
                <XCircle className="h-4 w-4" /> Annuler
              </button>
            )}
            {onVisio && (
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => onVisio(appt)}
                  disabled={!visioAccess.ok}
                  title={!visioAccess.ok ? visioAccess.reason : undefined}
                  className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <Video className="h-4 w-4" /> Visio
                </button>
                {!visioAccess.ok && appt.status !== "cancelled" && appt.status !== "completed" && (
                  <span className="max-w-[14rem] text-[11px] leading-snug text-amber-700">
                    {visioAccess.reason}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {canWriteNotes && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setNotesOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 rounded-xl px-1 py-1.5 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <NotebookPen className="h-4 w-4 text-slate-500" />
              Notes privées
              {hasNotes ? (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Renseignées
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                  Vides
                </span>
              )}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition ${notesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {notesOpen && (
            <div className="mt-2 space-y-2">
              <textarea
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                rows={3}
                placeholder="Résumé clinique, suites, points de vigilance… (jamais partagé avec le patient)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                readOnly={readonly && appt.status === "cancelled"}
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {savingNotes ? "…" : "Enregistrer"}
                </button>
                {notesMsg && <span className="text-xs text-slate-500">{notesMsg}</span>}
                {appt.patient_rated_at && (
                  <span className="text-xs text-emerald-700">Patient a noté la séance</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
