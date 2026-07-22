"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MentalExercisesPanel } from "@/components/MentalExercisesPanel";
import { CHAT_DISCLAIMER } from "@/lib/gosante";
import {
  DEFAULT_ITERATIONS,
  VAULT_MARKER,
  decryptJournalText,
  deriveJournalKey,
  encryptJournalText,
  randomBase64,
} from "@/lib/journal-crypto";
import type { JournalEntry } from "@/types";
import {
  AlertTriangle,
  BarChart3,
  BookHeart,
  Brain,
  ExternalLink,
  KeyRound,
  Loader2,
  Lock,
  LockOpen,
  MessageCircleHeart,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
type ChatThread = { id: string; title: string; updated_at: string };
type Tab = "journal" | "assistant" | "exercices" | "aide";
type Vault = {
  salt: string;
  verifier: string;
  verifier_iv: string;
  iterations: number;
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Salut. Dis-moi ce qui se passe — je te suis.",
};

function titleFromMessage(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 42 ? `${clean.slice(0, 42)}…` : clean || "Conversation";
}

const MOODS = [
  { value: 1, emoji: "😞", label: "Très difficile", color: "bg-rose-100 ring-rose-400" },
  { value: 2, emoji: "😕", label: "Difficile", color: "bg-orange-100 ring-orange-400" },
  { value: 3, emoji: "😐", label: "Neutre", color: "bg-amber-100 ring-amber-400" },
  { value: 4, emoji: "🙂", label: "Bien", color: "bg-lime-100 ring-lime-400" },
  { value: 5, emoji: "😊", label: "Très bien", color: "bg-emerald-100 ring-emerald-400" },
];

const BURKINA_SERVICES = [
  {
    name: "SAMU Burkina Faso",
    phone: "15",
    note: "Urgence médicale grave — appel court gratuit, 24 h/24",
    source: "https://gouvernement.gov.bf/actualites/sante-publique-le-service-daide-medicale-urgente-samu-desormais-operationnel-a-ouagadougou/",
    urgent: true,
  },
  {
    name: "Sapeurs-pompiers",
    phone: "18",
    note: "Secours d'urgence et accidents",
    source: "https://www.police.gov.bf/index.php/toute-l-actualite/item/390-police-secours",
    urgent: true,
  },
  {
    name: "Police nationale",
    phone: "17",
    note: "Police secours — numéro vert",
    source: "https://www.police.gov.bf/index.php/toute-l-actualite/item/390-police-secours",
    urgent: true,
  },
  {
    name: "Gendarmerie nationale",
    phone: "16",
    note: "Intervention et protection",
    source: "https://www.police.gov.bf/index.php/toute-l-actualite/item/390-police-secours",
    urgent: true,
  },
  {
    name: "Centre médical Général A. S. Lamisana",
    phone: "+226 25 41 90 93",
    note: "Centre ouvert au public avec service de psychiatrie",
    source: "https://www.sante.gov.bf/accueil/",
    urgent: false,
  },
  {
    name: "Ministère de la Santé",
    phone: "+226 25 25 25 25",
    note: "Standard et orientation vers une structure sanitaire",
    source: "https://www.sante.gov.bf/contact",
    urgent: false,
  },
];

function fallbackReply(text: string): string {
  const low = text.toLowerCase();
  const imminent =
    /(je (vais|veux) (me )?tuer|j['’]en finis|ce soir j['’]en finis|je vais (le|la) faire|passer à l['’]acte|me suicider)/i.test(
      low
    );
  if (imminent) {
    return "Là, j’ai vraiment peur pour toi. Si tu es en danger maintenant, appelle le 15 ou quelqu’un à côté de toi. Je reste avec toi — tu n’es pas seul(e).";
  }
  if (low.includes("suicid") || low.includes("mourir") || low.includes("finir")) {
    return "Merci de me le dire. Je t’écoute. Qu’est-ce qui te pèse le plus en ce moment ?";
  }
  if (low.includes("stress") || low.includes("anxi") || low.includes("peur")) {
    return "Ok, je vois. Raconte-moi ce qui se passe — je suis là, sans juger.";
  }
  return "Je t’entends. Continue, je suis avec toi.";
}

export function MentalHealthModule() {
  const supabase = createClient();
  const chatEnd = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("journal");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [journal, setJournal] = useState("");
  const [mood, setMood] = useState(3);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vault, setVault] = useState<Vault | null>(null);
  const [vaultKey, setVaultKey] = useState<CryptoKey | null>(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [vaultMessage, setVaultMessage] = useState<string | null>(null);
  const [vaultWorking, setVaultWorking] = useState(false);

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
      const [{ data: journalData }, { data: vaultData }, { data: threadData }] = await Promise.all([
        supabase
          .from("mental_health_journal")
          .select("*")
          .eq("user_id", user.id)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(60),
        supabase
          .from("mental_journal_vaults")
          .select("salt, verifier, verifier_iv, iterations")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("mental_chat_threads")
          .select("id, title, updated_at")
          .eq("user_id", user.id)
          .is("deleted_at", null)
          .order("updated_at", { ascending: false })
          .limit(40),
      ]);
      setEntries((journalData as JournalEntry[]) ?? []);
      setVault((vaultData as Vault | null) ?? null);
      setThreads((threadData as ChatThread[]) ?? []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!vaultKey) return;
    const timer = window.setTimeout(() => {
      setVaultKey(null);
      setEntries((current) =>
        current.map((entry) =>
          entry.encrypted_content ? { ...entry, content: null } : entry
        )
      );
      setVaultMessage("Journal verrouillé automatiquement après 10 minutes.");
    }, 10 * 60_000);
    return () => window.clearTimeout(timer);
  }, [vaultKey]);

  const moodStats = useMemo(() => {
    const recent = entries
      .filter((entry) => entry.mood)
      .slice(0, 7)
      .reverse();
    const average = recent.length
      ? recent.reduce((sum, entry) => sum + Number(entry.mood), 0) / recent.length
      : 0;
    return { recent, average };
  }, [entries]);

  async function loadThread(threadId: string) {
    setThreadsLoading(true);
    setAiError(null);
    const { data, error } = await supabase
      .from("mental_chat_messages")
      .select("role, content")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });
    if (error) {
      setAiError("Impossible de charger la conversation.");
      setThreadsLoading(false);
      return;
    }
    const loaded = (data as Message[]) ?? [];
    setActiveThreadId(threadId);
    setMessages(loaded.length ? loaded : [WELCOME_MESSAGE]);
    setThreadsLoading(false);
  }

  function startNewChat() {
    setActiveThreadId(null);
    setMessages([WELCOME_MESSAGE]);
    setAiError(null);
    setInput("");
  }

  async function deleteThread(threadId: string) {
    if (!window.confirm("Retirer cette conversation de votre historique ?")) return;
    const res = await fetch("/api/patient/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "chat_thread", id: threadId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setAiError(data.error || "Impossible de supprimer la conversation.");
      return;
    }
    setThreads((current) => current.filter((t) => t.id !== threadId));
    if (activeThreadId === threadId) startNewChat();
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || aiLoading) return;
    const userMsg = input.trim();
    const priorThreadId = activeThreadId;
    const nextMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(nextMessages);
    setInput("");
    setAiLoading(true);
    setAiError(null);
    let reply = fallbackReply(userMsg);
    try {
      const res = await fetch("/api/mental/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur IA");
      reply = data.reply as string;
    } catch {
      setAiError("Assistant indisponible — réponse locale utilisée.");
    }

    setMessages((current) => [...current, { role: "assistant", content: reply }]);
    setAiLoading(false);

    // Persistance
    if (!userId) return;
    try {
      let threadId = priorThreadId;
      const now = new Date().toISOString();
      if (!threadId) {
        const { data: thread, error } = await supabase
          .from("mental_chat_threads")
          .insert({
            user_id: userId,
            title: titleFromMessage(userMsg),
            updated_at: now,
          })
          .select("id, title, updated_at")
          .single();
        if (error || !thread) throw error ?? new Error("thread");
        threadId = thread.id;
        setActiveThreadId(thread.id);
        setThreads((current) => [thread as ChatThread, ...current]);

        await supabase.from("mental_chat_messages").insert([
          {
            thread_id: threadId,
            user_id: userId,
            role: "assistant",
            content: WELCOME_MESSAGE.content,
          },
          { thread_id: threadId, user_id: userId, role: "user", content: userMsg },
          { thread_id: threadId, user_id: userId, role: "assistant", content: reply },
        ]);
      } else {
        await supabase
          .from("mental_chat_threads")
          .update({ updated_at: now })
          .eq("id", threadId);
        setThreads((current) =>
          [...current.map((t) => (t.id === threadId ? { ...t, updated_at: now } : t))].sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
        );
        await supabase.from("mental_chat_messages").insert([
          { thread_id: threadId, user_id: userId, role: "user", content: userMsg },
          { thread_id: threadId, user_id: userId, role: "assistant", content: reply },
        ]);
      }
    } catch {
      setAiError("Conversation non enregistrée.");
    }
  }

  async function saveJournal() {
    if (!userId || !journal.trim() || (vault && !vaultKey)) return;
    setSaving(true);
    const base = { user_id: userId, mood };
    let payload: Record<string, unknown> = { ...base, content: journal.trim() };
    if (vaultKey) {
      const encrypted = await encryptJournalText(vaultKey, journal.trim());
      payload = {
        ...base,
        content: null,
        encrypted_content: encrypted.encryptedContent,
        encryption_iv: encrypted.iv,
      };
    }
    const { data, error } = await supabase
      .from("mental_health_journal")
      .insert(payload)
      .select()
      .single();
    if (!error && data) {
      setEntries((current) => [{ ...(data as JournalEntry), content: journal.trim() }, ...current]);
      setJournal("");
    }
    setSaving(false);
  }

  async function deleteEntry(id: string) {
    if (!window.confirm("Retirer cette note de votre journal ?")) return;
    const res = await fetch("/api/patient/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "journal", id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setAiError(data.error || "Impossible de supprimer la note.");
      return;
    }
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  async function enableVault() {
    if (!userId || password.length < 6 || password !== passwordConfirm) {
      setVaultMessage(
        password.length < 6
          ? "Choisissez au moins 6 caractères."
          : "Les mots de passe ne correspondent pas."
      );
      return;
    }
    setVaultWorking(true);
    try {
      const salt = randomBase64(16);
      const key = await deriveJournalKey(password, salt, DEFAULT_ITERATIONS);
      const marker = await encryptJournalText(key, VAULT_MARKER);
      const newVault: Vault = {
        salt,
        verifier: marker.encryptedContent,
        verifier_iv: marker.iv,
        iterations: DEFAULT_ITERATIONS,
      };
      const { error } = await supabase.from("mental_journal_vaults").insert({
        user_id: userId,
        ...newVault,
      });
      if (error) throw error;

      // Chiffre immédiatement les anciennes notes en clair.
      for (const entry of entries.filter((item) => item.content && !item.encrypted_content)) {
        const encrypted = await encryptJournalText(key, entry.content!);
        const { error: migrationError } = await supabase
          .from("mental_health_journal")
          .update({
            content: null,
            encrypted_content: encrypted.encryptedContent,
            encryption_iv: encrypted.iv,
          })
          .eq("id", entry.id);
        if (migrationError) throw migrationError;
        entry.encrypted_content = encrypted.encryptedContent;
        entry.encryption_iv = encrypted.iv;
      }
      setVault(newVault);
      setVaultKey(key);
      setPassword("");
      setPasswordConfirm("");
      setVaultMessage("Coffre activé. Vos notes sont maintenant chiffrées.");
    } catch {
      setVaultMessage("Impossible d'activer le coffre. Réessayez.");
    } finally {
      setVaultWorking(false);
    }
  }

  async function unlockVault() {
    if (!vault || !password) return;
    setVaultWorking(true);
    try {
      const key = await deriveJournalKey(password, vault.salt, vault.iterations);
      const marker = await decryptJournalText(key, vault.verifier, vault.verifier_iv);
      if (marker !== VAULT_MARKER) throw new Error("Mot de passe incorrect");
      const decrypted = await Promise.all(
        entries.map(async (entry) => {
          if (!entry.encrypted_content || !entry.encryption_iv) return entry;
          const content = await decryptJournalText(
            key,
            entry.encrypted_content,
            entry.encryption_iv
          );
          return { ...entry, content };
        })
      );
      setEntries(decrypted);
      setVaultKey(key);
      setPassword("");
      setVaultMessage("Journal déverrouillé pour cette session.");
    } catch {
      setVaultMessage("Mot de passe incorrect ou données illisibles.");
    } finally {
      setVaultWorking(false);
    }
  }

  function lockVault() {
    setVaultKey(null);
    setEntries((current) =>
      current.map((entry) =>
        entry.encrypted_content ? { ...entry, content: null } : entry
      )
    );
    setJournal("");
    setVaultMessage("Journal verrouillé.");
  }

  const tabs: { id: Tab; label: string; icon: typeof Brain }[] = [
    { id: "journal", label: "Journal", icon: BookHeart },
    { id: "assistant", label: "Écoute", icon: MessageCircleHeart },
    { id: "exercices", label: "Exercices", icon: Sparkles },
    { id: "aide", label: "Besoin d’aide", icon: Phone },
  ];

  return (
      <div className="space-y-5 sm:space-y-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-700 p-5 text-white shadow-lg sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-violet-200">Votre espace confidentiel</p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
                <Brain className="h-7 w-7" /> Santé mentale
              </h1>
              <p className="mt-2 max-w-xl text-sm text-indigo-100">
                Suivez votre humeur, écrivez librement et trouvez une aide adaptée au Burkina Faso.
              </p>
            </div>
            <a
              href="tel:15"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm"
            >
              <Phone className="h-4 w-4" /> Urgence : 15
            </a>
          </div>

          {moodStats.recent.length > 0 && (
            <div className="mt-5 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-indigo-200">Moyenne récente</p>
                  <p className="text-xl font-bold">{moodStats.average.toFixed(1)} / 5</p>
                </div>
                <div className="flex h-12 items-end gap-1.5">
                  {moodStats.recent.map((entry) => (
                    <div
                      key={entry.id}
                      title={`${entry.mood}/5`}
                      className="w-4 rounded-t bg-white/80 transition-all"
                      style={{ height: `${Number(entry.mood) * 20}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:text-sm ${
                tab === id
                  ? "bg-violet-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        {tab === "journal" && (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                    <BookHeart className="h-5 w-5 text-violet-600" /> Journal personnel
                  </h2>
                  <p className="text-xs text-slate-500">Les notes chiffrées ne sont lisibles qu’avec votre mot de passe.</p>
                </div>
                {vault && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      vaultKey
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {vaultKey ? <LockOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                    {vaultKey ? "Déverrouillé" : "Verrouillé"}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
                </div>
              ) : vault && !vaultKey ? (
                <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-5 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">Journal verrouillé</h3>
                  <p className="mt-1 text-sm text-slate-600">Entrez votre mot de passe privé.</p>
                  <div className="mx-auto mt-4 flex max-w-sm gap-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && unlockVault()}
                      className="min-w-0 flex-1 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                      placeholder="Mot de passe du journal"
                    />
                    <button
                      type="button"
                      onClick={unlockVault}
                      disabled={vaultWorking || !password}
                      className="rounded-lg bg-violet-600 px-4 text-sm font-medium text-white disabled:opacity-50"
                    >
                      {vaultWorking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ouvrir"}
                    </button>
                  </div>
                  {vaultMessage && <p className="mt-3 text-xs text-rose-600">{vaultMessage}</p>}
                </div>
              ) : (
                <>
                  <div className="mt-5">
                    <p className="mb-2 text-sm font-medium text-slate-700">Comment vous sentez-vous ?</p>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {MOODS.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setMood(item.value)}
                          className={`rounded-xl p-2 text-center transition ${
                            mood === item.value
                              ? `${item.color} ring-2`
                              : "bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          <span className="block text-2xl">{item.emoji}</span>
                          <span className="mt-1 hidden text-[10px] text-slate-600 sm:block">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={journal}
                    onChange={(event) => setJournal(event.target.value)}
                    rows={5}
                    placeholder="Qu'avez-vous vécu aujourd'hui ? Écrivez librement…"
                    className="mt-4 w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-400"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">{journal.length} caractères</span>
                    <div className="flex gap-2">
                      {vault && (
                        <button
                          type="button"
                          onClick={lockVault}
                          className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-slate-600"
                        >
                          <Lock className="h-4 w-4" /> Verrouiller
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={saveJournal}
                        disabled={saving || !journal.trim()}
                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookHeart className="h-4 w-4" />}
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                  <BarChart3 className="h-5 w-5 text-violet-600" /> Mes dernières notes
                </h2>
                <span className="text-xs text-slate-400">{entries.length} entrée(s)</span>
              </div>
              {vault && !vaultKey ? (
                <div className="mt-5 rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                  <Lock className="mx-auto mb-2 h-6 w-6" /> Déverrouillez le journal pour lire vos notes.
                </div>
              ) : entries.length === 0 ? (
                <p className="mt-5 rounded-xl border border-dashed p-5 text-center text-sm text-slate-500">
                  Votre première note apparaîtra ici.
                </p>
              ) : (
                <div className="mt-4 max-h-[460px] space-y-3 overflow-y-auto pr-1">
                  {entries.map((entry) => {
                    const moodItem = MOODS.find((item) => item.value === entry.mood);
                    return (
                      <article key={entry.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{moodItem?.emoji ?? "📝"}</span>
                            <div>
                              <p className="text-xs font-medium text-slate-600">{moodItem?.label ?? "Note"}</p>
                              <p className="text-[11px] text-slate-400">
                                {new Date(entry.created_at).toLocaleString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteEntry(entry.id)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                            aria-label="Supprimer la note"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{entry.content}</p>
                        {entry.encrypted_content && (
                          <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-emerald-600">
                            <ShieldCheck className="h-3 w-3" /> Chiffré AES-256
                          </span>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {!vault && !loading && (
              <section className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 lg:col-span-2 sm:p-5">
                <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
                  <div>
                    <h2 className="flex items-center gap-2 font-semibold text-violet-900">
                      <KeyRound className="h-5 w-5" /> Protéger le journal par mot de passe
                    </h2>
                    <p className="mt-2 text-sm text-violet-800">
                      Vos notes seront chiffrées AES‑256 dans ce navigateur avant leur envoi. Le mot de passe n’est jamais stocké.
                    </p>
                    <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-amber-700">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      Mot de passe oublié = notes irrécupérables. Conservez-le en lieu sûr.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Mot de passe (6 caractères minimum)"
                      className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                    />
                    <input
                      type="password"
                      value={passwordConfirm}
                      onChange={(event) => setPasswordConfirm(event.target.value)}
                      placeholder="Confirmer le mot de passe"
                      className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={enableVault}
                      disabled={vaultWorking}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      {vaultWorking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                      Activer le coffre privé
                    </button>
                    {vaultMessage && <p className="text-xs text-rose-600">{vaultMessage}</p>}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {tab === "assistant" && (
          <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-800">Mes chats</h2>
                <button
                  type="button"
                  onClick={startNewChat}
                  className="flex items-center gap-1 rounded-lg bg-violet-600 px-2.5 py-1.5 text-xs font-medium text-white"
                >
                  <Plus className="h-3.5 w-3.5" /> Nouveau
                </button>
              </div>
              <div className="max-h-48 space-y-1 overflow-y-auto lg:max-h-[28rem]">
                {threads.length === 0 ? (
                  <p className="px-2 py-4 text-center text-xs text-slate-500">
                    Aucune conversation enregistrée
                  </p>
                ) : (
                  threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`group flex items-start gap-1 rounded-xl ${
                        activeThreadId === thread.id ? "bg-violet-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => loadThread(thread.id)}
                        className="min-w-0 flex-1 px-2.5 py-2 text-left"
                      >
                        <p className="truncate text-sm font-medium text-slate-800">{thread.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {new Date(thread.updated_at).toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteThread(thread.id)}
                        className="mr-1 mt-1 rounded-lg p-1.5 text-slate-400 opacity-70 hover:bg-rose-50 hover:text-rose-600 lg:opacity-0 lg:group-hover:opacity-100"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </aside>

            <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-violet-100 bg-violet-50 px-4 py-3 sm:px-5">
                <h2 className="flex items-center gap-2 font-semibold text-violet-900">
                  <Sparkles className="h-5 w-5" /> Écoute — comme un proche
                </h2>
                <p className="mt-1 text-xs text-violet-700">{CHAT_DISCLAIMER}</p>
              </div>
              <div className="h-[430px] space-y-3 overflow-y-auto bg-slate-50 p-4 sm:p-5">
                {threadsLoading ? (
                  <div className="flex h-full items-center justify-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "ml-auto rounded-br-sm bg-violet-600 text-white"
                            : "rounded-bl-sm bg-white text-slate-700 shadow-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                    {aiLoading && (
                      <div className="flex w-fit items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                        <Loader2 className="h-4 w-4 animate-spin" /> Je t’écoute…
                      </div>
                    )}
                    <div ref={chatEnd} />
                  </>
                )}
              </div>
              {aiError && <p className="bg-amber-50 px-4 py-2 text-xs text-amber-700">{aiError}</p>}
              <form onSubmit={sendMessage} className="flex gap-2 border-t p-3 sm:p-4">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  disabled={aiLoading || threadsLoading}
                  placeholder="Dis-moi ce qui te traverse…"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                />
                <button
                  type="submit"
                  disabled={aiLoading || threadsLoading || !input.trim()}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  <Send className="h-4 w-4" /> <span className="hidden sm:inline">Envoyer</span>
                </button>
              </form>
            </section>
          </div>
        )}

        {tab === "exercices" && (
          <MentalExercisesPanel
            onSaveGratitudeToJournal={(text) => {
              setJournal(text);
              setVaultMessage(
                "Vos 3 points positifs sont prêts dans le journal — ouvrez l’onglet Journal pour les enregistrer."
              );
            }}
          />
        )}

        {tab === "aide" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
              <h2 className="flex items-center gap-2 font-bold text-red-900">
                <AlertTriangle className="h-5 w-5" /> Danger immédiat ou idées suicidaires
              </h2>
              <p className="mt-2 text-sm text-red-800">
                Ne restez pas seul(e). Appelez le SAMU au 15, rendez-vous aux urgences ou prévenez immédiatement une personne de confiance.
              </p>
              <a
                href="tel:15"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white"
              >
                <Phone className="h-5 w-5" /> Appeler le 15
              </a>
            </div>

            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4">
                <h2 className="font-semibold text-slate-900">Services utiles au Burkina Faso</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Noms et numéros vérifiés sur les sites du Gouvernement, du Ministère de la Santé et de la Police nationale.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {BURKINA_SERVICES.map((service) => (
                  <div
                    key={`${service.name}-${service.phone}`}
                    className={`rounded-xl border p-4 ${
                      service.urgent
                        ? "border-red-100 bg-red-50/70"
                        : "border-violet-100 bg-violet-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{service.name}</h3>
                        <p className="mt-1 text-xs text-slate-600">{service.note}</p>
                      </div>
                      <a
                        href={service.source}
                        target="_blank"
                        rel="noreferrer"
                        title="Voir la source officielle"
                        className="shrink-0 text-slate-400 hover:text-violet-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <a
                      href={`tel:${service.phone.replace(/\s/g, "")}`}
                      className={`mt-3 flex items-center justify-between rounded-lg px-3 py-2 font-bold ${
                        service.urgent
                          ? "bg-red-600 text-white"
                          : "bg-violet-600 text-white"
                      }`}
                    >
                      <span>{service.phone}</span>
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Il n’existe pas, dans les sources publiques consultées, de ligne nationale burkinabè dédiée exclusivement à la prévention du suicide. En urgence, utilisez le 15.
              </p>
            </section>
          </div>
        )}
      </div>
  );
}
