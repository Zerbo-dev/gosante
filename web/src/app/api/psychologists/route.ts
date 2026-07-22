import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { data, error } = await supabase
    .from("psychologists")
    .select("*")
    .eq("is_available", true)
    .not("user_id", "is", null)
    .order("full_name");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const psychologists = data ?? [];
  const userIds = psychologists.map((p) => p.user_id).filter(Boolean) as string[];

  const ratingByUser = new Map<string, { avg: number; count: number }>();
  if (userIds.length > 0) {
    const { data: ratings } = await supabase
      .from("service_ratings")
      .select("target_user_id, score")
      .eq("target_type", "psychologist")
      .in("target_user_id", userIds);

    const buckets = new Map<string, number[]>();
    for (const row of ratings ?? []) {
      const id = row.target_user_id as string;
      const list = buckets.get(id) ?? [];
      list.push(Number(row.score));
      buckets.set(id, list);
    }
    for (const [id, scores] of buckets) {
      const sum = scores.reduce((a, b) => a + b, 0);
      ratingByUser.set(id, {
        avg: Math.round((sum / scores.length) * 10) / 10,
        count: scores.length,
      });
    }
  }

  const enriched = psychologists.map((p) => {
    const stats = p.user_id ? ratingByUser.get(p.user_id) : undefined;
    return {
      ...p,
      rating_avg: stats?.avg ?? null,
      rating_count: stats?.count ?? 0,
    };
  });

  return NextResponse.json({ psychologists: enriched });
}
