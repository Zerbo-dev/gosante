import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserRole } from "@/types";
import { roleHomePath, ROLE_LABELS } from "@/lib/auth-shared";

export type StatCard = {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "warn" | "ok" | "accent";
};

export type RoleDashboardData = {
  role: UserRole;
  roleLabel: string;
  workspaceHref: string;
  workspaceLabel: string;
  subtitle: string;
  stats: StatCard[];
};

function startOfTodayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function avgScore(scores: number[]): number | null {
  if (!scores.length) return null;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
}

async function loadLivreurStats(
  supabase: SupabaseClient,
  userId: string
): Promise<RoleDashboardData> {
  const [{ data: profile }, { data: orders }, { data: ratings }] = await Promise.all([
    supabase
      .from("profiles")
      .select("livreur_online")
      .eq("id", userId)
      .single(),
    supabase
      .from("orders")
      .select("id, status, created_at, updated_at")
      .eq("livreur_id", userId)
      .in("status", ["ready", "delivering", "completed"]),
    supabase
      .from("service_ratings")
      .select("score")
      .eq("target_type", "livreur")
      .eq("target_user_id", userId),
  ]);

  const list = orders ?? [];
  const ready = list.filter((o) => o.status === "ready").length;
  const delivering = list.filter((o) => o.status === "delivering").length;
  const completed = list.filter((o) => o.status === "completed").length;
  const today = startOfTodayIso();
  const completedToday = list.filter(
    (o) => o.status === "completed" && (o.updated_at ?? o.created_at) >= today
  ).length;
  const rating = avgScore((ratings ?? []).map((r) => Number(r.score)));

  return {
    role: "livreur",
    roleLabel: ROLE_LABELS.livreur,
    workspaceHref: roleHomePath("livreur"),
    workspaceLabel: "Ouvrir mes livraisons",
    subtitle: profile?.livreur_online
      ? "Vous êtes en ligne — assignation active"
      : "Hors ligne — passez en ligne depuis Livraisons",
    stats: [
      {
        label: "En livraison",
        value: String(delivering),
        tone: delivering > 0 ? "accent" : "default",
      },
      { label: "En file", value: String(ready), tone: ready > 0 ? "warn" : "default" },
      { label: "Terminées aujourd’hui", value: String(completedToday), tone: "ok" },
      { label: "Total terminées", value: String(completed) },
      {
        label: "Note moyenne",
        value: rating != null ? `★ ${rating.toFixed(1)}` : "—",
        hint: ratings?.length ? `${ratings.length} avis` : "Pas encore d’avis",
      },
    ],
  };
}

async function loadPharmacienStats(
  supabase: SupabaseClient,
  userId: string
): Promise<RoleDashboardData> {
  const { data: staff } = await supabase
    .from("pharmacy_staff")
    .select("pharmacy_id, pharmacies(name, city)")
    .eq("user_id", userId);

  const pharmacyIds = (staff ?? []).map((s) => s.pharmacy_id);
  const first = staff?.[0];
  const pharmacyName = first
    ? (() => {
        const p = Array.isArray(first.pharmacies) ? first.pharmacies[0] : first.pharmacies;
        return p ? `${p.name} — ${p.city}` : "Votre pharmacie";
      })()
    : "Aucune pharmacie liée";

  if (!pharmacyIds.length) {
    return {
      role: "pharmacien",
      roleLabel: ROLE_LABELS.pharmacien,
      workspaceHref: roleHomePath("pharmacien"),
      workspaceLabel: "Ouvrir l’espace pharmacien",
      subtitle: "Compte non lié à une pharmacie",
      stats: [
        { label: "Commandes à traiter", value: "—" },
        { label: "Prêtes", value: "—" },
        { label: "Références stock", value: "—" },
        { label: "Stock bas", value: "—" },
      ],
    };
  }

  const [{ data: orders }, { data: stock }] = await Promise.all([
    supabase
      .from("orders")
      .select("id, status")
      .in("pharmacy_id", pharmacyIds)
      .in("status", ["pending", "confirmed", "preparing", "ready"]),
    supabase
      .from("pharmacy_stock")
      .select("id, quantity")
      .in("pharmacy_id", pharmacyIds),
  ]);

  const toPrepare = (orders ?? []).filter((o) =>
    ["pending", "confirmed", "preparing"].includes(o.status)
  ).length;
  const ready = (orders ?? []).filter((o) => o.status === "ready").length;
  const stockRows = stock ?? [];
  const lowStock = stockRows.filter((s) => Number(s.quantity) <= 5).length;

  return {
    role: "pharmacien",
    roleLabel: ROLE_LABELS.pharmacien,
    workspaceHref: roleHomePath("pharmacien"),
    workspaceLabel: "Ouvrir l’espace pharmacien",
    subtitle: pharmacyName,
    stats: [
      {
        label: "À préparer",
        value: String(toPrepare),
        tone: toPrepare > 0 ? "warn" : "default",
      },
      { label: "Prêtes / livreur", value: String(ready), tone: ready > 0 ? "accent" : "default" },
      { label: "Références stock", value: String(stockRows.length) },
      {
        label: "Stock bas (≤5)",
        value: String(lowStock),
        tone: lowStock > 0 ? "warn" : "ok",
      },
    ],
  };
}

async function loadPsychologueStats(
  supabase: SupabaseClient,
  userId: string
): Promise<RoleDashboardData> {
  const { data: psy } = await supabase
    .from("psychologists")
    .select("id, specialty, is_available")
    .eq("user_id", userId)
    .maybeSingle();

  if (!psy) {
    return {
      role: "psychologue",
      roleLabel: ROLE_LABELS.psychologue,
      workspaceHref: roleHomePath("psychologue"),
      workspaceLabel: "Compléter mon profil",
      subtitle: "Profil psychologue à finaliser",
      stats: [
        { label: "En attente", value: "—" },
        { label: "Aujourd’hui", value: "—" },
        { label: "Terminées", value: "—" },
        { label: "Note", value: "—" },
      ],
    };
  }

  const today = startOfTodayIso();
  const [{ data: appointments }, { data: ratings }] = await Promise.all([
    supabase
      .from("appointments")
      .select("id, status, scheduled_at")
      .eq("psychologist_id", psy.id)
      .in("status", ["scheduled", "confirmed", "in_progress", "completed"]),
    supabase
      .from("service_ratings")
      .select("score")
      .eq("target_type", "psychologist")
      .eq("target_user_id", userId),
  ]);

  const list = appointments ?? [];
  const pending = list.filter((a) => a.status === "scheduled").length;
  const todayCount = list.filter(
    (a) =>
      ["confirmed", "in_progress", "scheduled"].includes(a.status) &&
      a.scheduled_at >= today &&
      a.scheduled_at < new Date(Date.now() + 24 * 60 * 60_000).toISOString()
  ).length;
  const completed = list.filter((a) => a.status === "completed").length;
  const inProgress = list.filter((a) => a.status === "in_progress").length;
  const rating = avgScore((ratings ?? []).map((r) => Number(r.score)));

  return {
    role: "psychologue",
    roleLabel: ROLE_LABELS.psychologue,
    workspaceHref: roleHomePath("psychologue"),
    workspaceLabel: "Ouvrir mes consultations",
    subtitle: psy.is_available
      ? `${psy.specialty ?? "Consultations"} — disponible`
      : `${psy.specialty ?? "Consultations"} — indisponible`,
    stats: [
      { label: "À confirmer", value: String(pending), tone: pending > 0 ? "warn" : "default" },
      {
        label: "RDV du jour",
        value: String(todayCount),
        tone: todayCount > 0 ? "accent" : "default",
      },
      {
        label: "En cours",
        value: String(inProgress),
        tone: inProgress > 0 ? "accent" : "default",
      },
      { label: "Séances terminées", value: String(completed), tone: "ok" },
      {
        label: "Note moyenne",
        value: rating != null ? `★ ${rating.toFixed(1)}` : "—",
        hint: ratings?.length ? `${ratings.length} avis` : "Pas encore d’avis",
      },
    ],
  };
}

async function loadAdminStats(supabase: SupabaseClient): Promise<RoleDashboardData> {
  const today = startOfTodayIso();
  const [
    { count: users },
    { count: livreurs },
    { count: ordersToday },
    { count: openOrders },
    { count: delivering },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "livreur"),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .gte("created_at", today),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "confirmed", "preparing", "ready", "delivering"]),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "delivering"),
  ]);

  return {
    role: "admin",
    roleLabel: ROLE_LABELS.admin,
    workspaceHref: roleHomePath("admin"),
    workspaceLabel: "Ouvrir l’administration",
    subtitle: "Vue d’ensemble de la plateforme",
    stats: [
      { label: "Utilisateurs", value: String(users ?? 0) },
      { label: "Livreurs", value: String(livreurs ?? 0) },
      { label: "Commandes aujourd’hui", value: String(ordersToday ?? 0), tone: "accent" },
      {
        label: "Commandes ouvertes",
        value: String(openOrders ?? 0),
        tone: (openOrders ?? 0) > 0 ? "warn" : "default",
      },
      {
        label: "En livraison",
        value: String(delivering ?? 0),
        tone: (delivering ?? 0) > 0 ? "ok" : "default",
      },
    ],
  };
}

export async function loadRoleDashboard(
  supabase: SupabaseClient,
  userId: string,
  role: UserRole
): Promise<RoleDashboardData | null> {
  switch (role) {
    case "livreur":
      return loadLivreurStats(supabase, userId);
    case "pharmacien":
      return loadPharmacienStats(supabase, userId);
    case "psychologue":
      return loadPsychologueStats(supabase, userId);
    case "admin":
      return loadAdminStats(supabase);
    default:
      return null;
  }
}
