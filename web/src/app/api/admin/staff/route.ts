import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase } = auth;

  const { userId, pharmacyId } = (await request.json()) as {
    userId: string;
    pharmacyId: string;
  };

  if (!userId || !pharmacyId) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single();
  if (profile?.role !== "pharmacien") {
    return NextResponse.json({ error: "L'utilisateur doit avoir le rôle pharmacien" }, { status: 400 });
  }

  const { error } = await supabase.from("pharmacy_staff").upsert(
    { user_id: userId, pharmacy_id: pharmacyId },
    { onConflict: "pharmacy_id,user_id" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("audit_logs").insert({
    user_id: auth.user!.id,
    action: "pharmacy_staff_assigned",
    resource: `pharmacy_staff/${pharmacyId}`,
    metadata: { userId },
  });

  return NextResponse.json({ ok: true });
}
