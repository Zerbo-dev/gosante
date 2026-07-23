import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ImportRow = {
  dci: string;
  designation?: string | null;
  dosage?: string | null;
  quantity: number;
  unit_price?: number | null;
};

/**
 * Import / sync stock pharmacien (CSV/Excel déjà parsé côté client).
 * Body: { pharmacyId, rows: ImportRow[], mode?: "upsert" | "replace" }
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = (await request.json()) as {
    pharmacyId?: string;
    rows?: ImportRow[];
    mode?: "upsert" | "replace";
  };

  const pharmacyId = body.pharmacyId;
  const rows = body.rows ?? [];
  const mode = body.mode ?? "upsert";

  if (!pharmacyId) {
    return NextResponse.json({ error: "pharmacyId requis" }, { status: 400 });
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "Aucune ligne à importer" }, { status: 400 });
  }
  if (rows.length > 2000) {
    return NextResponse.json({ error: "Maximum 2000 lignes par import" }, { status: 400 });
  }

  // Vérifier que l'utilisateur est staff de cette pharmacie (ou admin)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";
  if (!isAdmin) {
    const { data: staff } = await supabase
      .from("pharmacy_staff")
      .select("pharmacy_id")
      .eq("pharmacy_id", pharmacyId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (!staff) {
      return NextResponse.json({ error: "Accès refusé à cette pharmacie" }, { status: 403 });
    }
  }

  const cleaned = rows
    .map((r) => {
      const dci = String(r.dci ?? "").trim();
      if (!dci) return null;
      const qty = Number(r.quantity);
      const price =
        r.unit_price === null || r.unit_price === undefined || r.unit_price === ("" as unknown)
          ? null
          : Number(r.unit_price);
      return {
        pharmacy_id: pharmacyId,
        // Clé unique inclut dosage pour éviter d’écraser Paracétamol 500 vs 1000
        medication_dci: r.dosage
          ? `${dci} — ${String(r.dosage).trim()}`
          : dci,
        designation: (r.designation && String(r.designation).trim()) || dci,
        dosage: r.dosage ? String(r.dosage).trim() : null,
        quantity: Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0,
        unit_price: price != null && Number.isFinite(price) ? price : null,
        updated_at: new Date().toISOString(),
      };
    })
    .filter(Boolean) as {
    pharmacy_id: string;
    medication_dci: string;
    designation: string;
    dosage: string | null;
    quantity: number;
    unit_price: number | null;
    updated_at: string;
  }[];

  if (cleaned.length === 0) {
    return NextResponse.json({ error: "Aucune ligne valide (colonne dci requise)" }, { status: 400 });
  }

  if (mode === "replace") {
    const { error: delErr } = await supabase
      .from("pharmacy_stock")
      .delete()
      .eq("pharmacy_id", pharmacyId);
    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }
  }

  const { error } = await supabase.from("pharmacy_stock").upsert(cleaned, {
    onConflict: "pharmacy_id,medication_dci",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    imported: cleaned.length,
    mode,
  });
}
