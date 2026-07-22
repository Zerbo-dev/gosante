import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase } = auth;

  const [profRes, ordRes, pharmRes, staffRes] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("*, pharmacies(name, city)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.from("pharmacies").select("id, name, city").order("name"),
    supabase.from("pharmacy_staff").select("id, user_id, pharmacy_id, pharmacies(name)"),
  ]);

  if (profRes.error) {
    return NextResponse.json({ error: profRes.error.message }, { status: 500 });
  }
  if (ordRes.error) {
    return NextResponse.json({ error: ordRes.error.message }, { status: 500 });
  }
  if (pharmRes.error) {
    return NextResponse.json({ error: pharmRes.error.message }, { status: 500 });
  }

  const profiles = profRes.data ?? [];
  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  const orders = (ordRes.data ?? []).map((o) => ({
    ...o,
    patient_name: profileMap.get(o.user_id)?.full_name ?? null,
    livreur_name: o.livreur_id ? profileMap.get(o.livreur_id)?.full_name ?? null : null,
  }));

  const livreurs = profiles.filter((p) => p.role === "livreur");

  const { data: livreurRatings } = await supabase
    .from("service_ratings")
    .select("target_user_id, score")
    .eq("target_type", "livreur")
    .in(
      "target_user_id",
      livreurs.map((l) => l.id)
    );

  const ratingBuckets = new Map<string, number[]>();
  for (const row of livreurRatings ?? []) {
    const id = row.target_user_id as string;
    const list = ratingBuckets.get(id) ?? [];
    list.push(Number(row.score));
    ratingBuckets.set(id, list);
  }

  const livreurStats = livreurs.map((l) => {
    const assigned = orders.filter((o) => o.livreur_id === l.id);
    const scores = ratingBuckets.get(l.id) ?? [];
    const rating_avg =
      scores.length > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
        : null;
    return {
      ...l,
      active: assigned.filter((o) => o.status === "ready" || o.status === "delivering").length,
      completed: assigned.filter((o) => o.status === "completed").length,
      total: assigned.length,
      rating_avg,
      rating_count: scores.length,
    };
  });

  return NextResponse.json({
    profiles,
    orders,
    pharmacies: pharmRes.data ?? [],
    staff: staffRes.data ?? [],
    livreurs,
    livreurStats,
  });
}
