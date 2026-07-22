"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BLOOD_TYPES } from "@/lib/gosante";
import { exportCarnetPdf } from "@/lib/carnet-pdf";
import type { MedicalHistoryEntry, MedicalRecord } from "@/types";
import {
  Activity,
  AlertTriangle,
  Building2,
  CalendarDays,
  Download,
  Droplets,
  FileText,
  HeartPulse,
  Loader2,
  Phone,
  Pill,
  Plus,
  Save,
  Stethoscope,
  Syringe,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

const emptyRecord = (): Omit<MedicalRecord, "id" | "user_id"> => ({
  blood_type: null,
  allergies: [],
  chronic_conditions: [],
  current_treatments: [],
  vaccines: [],
  emergency_contact_name: null,
  emergency_contact_phone: null,
  notes: null,
});

const ENTRY_TYPES: { value: MedicalHistoryEntry["entry_type"]; label: string; icon: typeof Stethoscope }[] = [
  { value: "consultation", label: "Consultation", icon: Stethoscope },
  { value: "examen", label: "Examen", icon: Activity },
  { value: "hospitalisation", label: "Hospitalisation", icon: Building2 },
  { value: "autre", label: "Autre", icon: FileText },
];

function TagInput({
  label,
  icon: Icon,
  values,
  placeholder,
  accent,
  onChange,
}: {
  label: string;
  icon: typeof Pill;
  values: string[];
  placeholder: string;
  accent: "rose" | "amber" | "emerald";
  onChange: (values: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const styles = {
    rose: { chip: "bg-rose-100 text-rose-800", btn: "bg-rose-600 hover:bg-rose-700", icon: "text-rose-600" },
    amber: { chip: "bg-amber-100 text-amber-800", btn: "bg-amber-600 hover:bg-amber-700", icon: "text-amber-600" },
    emerald: { chip: "bg-emerald-100 text-emerald-800", btn: "bg-emerald-600 hover:bg-emerald-700", icon: "text-emerald-600" },
  }[accent];

  function add() {
    const value = input.trim();
    if (!value || values.includes(value)) return;
    onChange([...values, value]);
    setInput("");
  }

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <Icon className={`h-4 w-4 ${styles.icon}`} /> {label}
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={add}
          className={`shrink-0 rounded-lg px-3 text-white ${styles.btn}`}
          aria-label={`Ajouter ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${styles.chip}`}
            >
              {value}
              <button
                type="button"
                onClick={() => onChange(values.filter((item) => item !== value))}
                className="opacity-60 hover:opacity-100"
                aria-label={`Retirer ${value}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function MedicalRecordModule() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [patient, setPatient] = useState<{ fullName: string | null; phone: string | null }>({
    fullName: null,
    phone: null,
  });
  const [record, setRecord] = useState(emptyRecord());
  const [history, setHistory] = useState<MedicalHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [historyForm, setHistoryForm] = useState({
    entry_type: "consultation" as MedicalHistoryEntry["entry_type"],
    title: "",
    description: "",
    facility_name: "",
    entry_date: "",
  });

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const histQuery = () =>
        supabase
          .from("medical_history_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("entry_date", { ascending: false });

      let histRes = await histQuery().is("deleted_at", null);
      if (histRes.error && /deleted_at|does not exist/i.test(histRes.error.message)) {
        histRes = await histQuery();
      }

      const [{ data: profile }, { data: rec }] = await Promise.all([
        supabase.from("profiles").select("full_name, phone").eq("id", user.id).single(),
        supabase.from("medical_records").select("*").eq("user_id", user.id).maybeSingle(),
      ]);
      const hist = histRes.data;

      if (profile) setPatient({ fullName: profile.full_name, phone: profile.phone });
      if (rec) {
        setRecord({
          blood_type: rec.blood_type,
          allergies: rec.allergies ?? [],
          chronic_conditions: rec.chronic_conditions ?? [],
          current_treatments: rec.current_treatments ?? [],
          vaccines: rec.vaccines ?? [],
          emergency_contact_name: rec.emergency_contact_name,
          emergency_contact_phone: rec.emergency_contact_phone,
          notes: rec.notes,
        });
      }
      setHistory((hist as MedicalHistoryEntry[]) ?? []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const completeness = useMemo(() => {
    const checks = [
      Boolean(record.blood_type),
      record.allergies.length > 0 || record.chronic_conditions.length > 0,
      record.current_treatments.length > 0 || Boolean(record.notes),
      record.vaccines.length > 0,
      Boolean(record.emergency_contact_name && record.emergency_contact_phone),
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [record]);

  async function saveRecord() {
    if (!userId) return;
    setSaving(true);
    const payload = { ...record, user_id: userId, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("medical_records").upsert(payload, {
      onConflict: "user_id",
    });
    setSaving(false);
    setSaved(!error);
    setTimeout(() => setSaved(false), 2500);
  }

  function addVaccine() {
    if (!vaccineName.trim()) return;
    setRecord((r) => ({
      ...r,
      vaccines: [...r.vaccines, { name: vaccineName.trim(), date: vaccineDate || undefined }],
    }));
    setVaccineName("");
    setVaccineDate("");
  }

  async function addHistory() {
    if (!userId || !historyForm.title.trim()) return;
    const { data, error } = await supabase
      .from("medical_history_entries")
      .insert({
        ...historyForm,
        entry_date: historyForm.entry_date || null,
        user_id: userId,
      })
      .select()
      .single();
    if (!error && data) {
      setHistory((h) =>
        [data as MedicalHistoryEntry, ...h].sort((a, b) =>
          (b.entry_date ?? "").localeCompare(a.entry_date ?? "")
        )
      );
      setHistoryForm({
        entry_type: "consultation",
        title: "",
        description: "",
        facility_name: "",
        entry_date: "",
      });
      setShowHistoryForm(false);
    }
  }

  async function deleteHistory(id: string) {
    if (!window.confirm("Retirer cette entrée de votre historique ?")) return;
    const res = await fetch("/api/patient/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "medical_history", id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Impossible de supprimer cette entrée.");
      return;
    }
    setHistory((h) => h.filter((x) => x.id !== id));
  }

  async function exportPdf() {
    setExporting(true);
    try {
      exportCarnetPdf(patient, record, history);
    } finally {
      setTimeout(() => setExporting(false), 600);
    }
  }

  if (loading) {
    return (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Chargement du carnet…
        </div>
    );
  }

  return (
      <div className="space-y-5 sm:space-y-6">
        {/* En-tête */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white shadow-md sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <HeartPulse className="h-6 w-6 shrink-0" />
                Carnet médical
              </h1>
              <p className="mt-1 text-sm text-emerald-50">
                {patient.fullName || "Votre profil santé"} — confidentiel et sécurisé
              </p>
            </div>
            <button
              onClick={exportPdf}
              disabled={exporting}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 disabled:opacity-60 sm:px-4"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span className="sm:hidden">PDF</span>
              <span className="hidden sm:inline">Exporter en PDF</span>
            </button>
          </div>

          {/* Barre de complétude */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-emerald-50">
              <span>Complétude du carnet</span>
              <span className="font-semibold">{completeness}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cartes vitales */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-600">
              <Droplets className="h-4 w-4" /> Groupe sanguin
            </div>
            <select
              className="mt-2 w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-lg font-bold text-rose-700 focus:outline-none"
              value={record.blood_type ?? ""}
              onChange={(e) => setRecord((r) => ({ ...r, blood_type: e.target.value || null }))}
            >
              <option value="">Non renseigné</option>
              {BLOOD_TYPES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 sm:col-span-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
              <Phone className="h-4 w-4" /> Contact d&apos;urgence
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2">
                <UserRound className="h-4 w-4 shrink-0 text-amber-500" />
                <input
                  className="w-full min-w-0 bg-transparent text-sm focus:outline-none"
                  placeholder="Nom du contact"
                  value={record.emergency_contact_name ?? ""}
                  onChange={(e) =>
                    setRecord((r) => ({ ...r, emergency_contact_name: e.target.value || null }))
                  }
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                <input
                  type="tel"
                  className="w-full min-w-0 bg-transparent text-sm focus:outline-none"
                  placeholder="+226 70 00 00 00"
                  value={record.emergency_contact_phone ?? ""}
                  onChange={(e) =>
                    setRecord((r) => ({ ...r, emergency_contact_phone: e.target.value || null }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Profil médical */}
          <section className="space-y-5 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <FileText className="h-5 w-5 text-emerald-600" /> Profil médical
            </h2>

            <TagInput
              label="Allergies"
              icon={AlertTriangle}
              values={record.allergies}
              placeholder="Ex : Pénicilline, arachide…"
              accent="rose"
              onChange={(allergies) => setRecord((r) => ({ ...r, allergies }))}
            />

            <TagInput
              label="Maladies chroniques"
              icon={Activity}
              values={record.chronic_conditions}
              placeholder="Ex : Diabète, hypertension…"
              accent="amber"
              onChange={(chronic_conditions) => setRecord((r) => ({ ...r, chronic_conditions }))}
            />

            <TagInput
              label="Traitements en cours"
              icon={Pill}
              values={record.current_treatments}
              placeholder="Ex : Metformine 500 mg matin…"
              accent="emerald"
              onChange={(current_treatments) => setRecord((r) => ({ ...r, current_treatments }))}
            />

            {/* Vaccins */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Syringe className="h-4 w-4 text-emerald-600" /> Vaccinations
              </label>
              <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                <input
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  placeholder="Nom du vaccin"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={vaccineDate}
                    onChange={(e) => setVaccineDate(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none sm:flex-none"
                  />
                  <button
                    type="button"
                    onClick={addVaccine}
                    className="shrink-0 rounded-lg bg-emerald-600 px-3 text-white hover:bg-emerald-700"
                    aria-label="Ajouter un vaccin"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {record.vaccines.length > 0 && (
                <div className="mt-2 divide-y divide-emerald-100 overflow-hidden rounded-xl border border-emerald-100">
                  {record.vaccines.map((v, i) => (
                    <div
                      key={`${v.name}-${i}`}
                      className="flex items-center justify-between gap-2 bg-emerald-50/50 px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 truncate font-medium text-slate-800">{v.name}</span>
                      <span className="flex shrink-0 items-center gap-3">
                        {v.date && (
                          <span className="text-xs text-slate-500">
                            {new Date(`${v.date}T00:00:00`).toLocaleDateString("fr-FR")}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setRecord((r) => ({
                              ...r,
                              vaccines: r.vaccines.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="text-slate-400 hover:text-red-600"
                          aria-label={`Supprimer ${v.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Notes complémentaires</label>
              <textarea
                rows={3}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                placeholder="Antécédents familiaux, remarques pour le médecin…"
                value={record.notes ?? ""}
                onChange={(e) => setRecord((r) => ({ ...r, notes: e.target.value || null }))}
              />
            </div>

            <button
              onClick={saveRecord}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 sm:w-auto"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Enregistrement…" : saved ? "Enregistré ✓" : "Enregistrer le carnet"}
            </button>
          </section>

          {/* Historique */}
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                <CalendarDays className="h-5 w-5 text-emerald-600" /> Historique médical
              </h2>
              <button
                type="button"
                onClick={() => setShowHistoryForm((s) => !s)}
                className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                {showHistoryForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {showHistoryForm ? "Fermer" : "Ajouter"}
              </button>
            </div>

            {showHistoryForm && (
              <div className="mb-4 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ENTRY_TYPES.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setHistoryForm((f) => ({ ...f, entry_type: value }))}
                      className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs font-medium transition ${
                        historyForm.entry_type === value
                          ? "border-emerald-500 bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <input
                  placeholder="Titre (ex : Consultation cardiologie)"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  value={historyForm.title}
                  onChange={(e) => setHistoryForm((f) => ({ ...f, title: e.target.value }))}
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                    value={historyForm.entry_date}
                    onChange={(e) => setHistoryForm((f) => ({ ...f, entry_date: e.target.value }))}
                  />
                  <input
                    placeholder="Établissement"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                    value={historyForm.facility_name}
                    onChange={(e) => setHistoryForm((f) => ({ ...f, facility_name: e.target.value }))}
                  />
                </div>
                <textarea
                  placeholder="Description, résultats, prescriptions…"
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  value={historyForm.description}
                  onChange={(e) => setHistoryForm((f) => ({ ...f, description: e.target.value }))}
                />
                <button
                  onClick={addHistory}
                  disabled={!historyForm.title.trim()}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                >
                  Ajouter à l&apos;historique
                </button>
              </div>
            )}

            {history.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                <CalendarDays className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                Aucun événement — ajoutez vos consultations, examens et hospitalisations.
              </div>
            ) : (
              <ol className="relative space-y-3 border-l-2 border-emerald-100 pl-4">
                {history.map((h) => {
                  const entryType = ENTRY_TYPES.find((t) => t.value === h.entry_type);
                  const Icon = entryType?.icon ?? FileText;
                  return (
                    <li key={h.id} className="relative">
                      <span className="absolute -left-[1.4rem] top-2 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                              <Icon className="h-3 w-3" />
                              {entryType?.label ?? h.entry_type}
                            </span>
                            <h3 className="mt-1.5 font-medium text-slate-900">{h.title}</h3>
                            <p className="text-xs text-slate-500">
                              {h.entry_date
                                ? new Date(`${h.entry_date}T00:00:00`).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : "Date inconnue"}
                              {h.facility_name && ` — ${h.facility_name}`}
                            </p>
                            {h.description && (
                              <p className="mt-1.5 text-sm text-slate-600">{h.description}</p>
                            )}
                          </div>
                          <button
                            onClick={() => deleteHistory(h.id)}
                            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                            aria-label={`Supprimer ${h.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        </div>
      </div>
  );
}
