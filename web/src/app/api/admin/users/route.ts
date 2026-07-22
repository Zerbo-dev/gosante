import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import type { UserRole } from "@/types";

const VALID_ROLES: UserRole[] = ["patient", "pharmacien", "livreur", "psychologue", "admin"];

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase } = auth;

  const { userId, role } = (await request.json()) as { userId: string; role: UserRole };
  if (!userId || !role || !VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const { data: target, error: targetErr } = await supabase
    .from("profiles")
    .select("id, full_name, phone")
    .eq("id", userId)
    .single();

  if (targetErr || !target) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (role === "psychologue") {
    const { data: existing } = await supabase
      .from("psychologists")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("psychologists")
        .update({
          full_name: target.full_name || "Psychologue GoSanté",
          phone: target.phone,
          is_available: true,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("psychologists").insert({
        user_id: userId,
        full_name: target.full_name || "Psychologue GoSanté",
        specialty: "Psychologie clinique",
        city: "Ouagadougou",
        phone: target.phone,
        bio: "Professionnel GoSanté — consultations en visio.",
        languages: ["Français"],
        consultation_fee: 15000,
        is_available: true,
      });
    }
  } else {
    await supabase
      .from("psychologists")
      .update({ is_available: false })
      .eq("user_id", userId);
  }

  await supabase.from("audit_logs").insert({
    user_id: auth.user!.id,
    action: "role_updated",
    resource: `profiles/${userId}`,
    metadata: { role },
  });

  return NextResponse.json({ ok: true });
}
