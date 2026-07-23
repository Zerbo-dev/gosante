import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type StockRow = {
  id: string;
  pharmacy_id: string;
  medication_dci: string;
  designation: string | null;
  dosage: string | null;
  quantity: number;
  unit_price: number | null;
  pharmacies?: { id: string; name: string; city: string } | null;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Recherche médicaments dans les stocks pharmacies (pas LNME).
 * q=... & pharmacyId?=uuid & limit?=20
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
  const pharmacyId = request.nextUrl.searchParams.get("pharmacyId");
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") ?? "20"), 50);

  if (q.length < 2) {
    return NextResponse.json({ count: 0, medications: [], source: "pharmacy_stock" });
  }

  let query = supabase
    .from("pharmacy_stock")
    .select(
      "id, pharmacy_id, medication_dci, designation, dosage, quantity, unit_price, pharmacies(id, name, city)"
    )
    .gt("quantity", 0)
    .order("medication_dci")
    .limit(300);

  if (pharmacyId) {
    query = query.eq("pharmacy_id", pharmacyId);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const tokens = tokenize(q);
  const scored = ((data ?? []) as unknown as StockRow[])
    .map((row) => {
      const hay = [
        row.medication_dci,
        row.designation ?? "",
        row.dosage ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      let score = 0;
      for (const t of tokens) {
        if (hay.includes(t)) score += 2;
        if ((row.medication_dci || "").toLowerCase().includes(t)) score += 3;
      }
      return { row, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.row.medication_dci.localeCompare(b.row.medication_dci));

  // Group by product key for cross-pharmacy view
  const byKey = new Map<
    string,
    {
      dci: string;
      designation: string;
      dosage: string | null;
      form: string | null;
      pvp: number | null;
      pv_drd: null;
      search_text: string;
      quantity: number;
      pharmacy_id: string | null;
      pharmacy_name: string | null;
      pharmacies_count: number;
      stock_id: string;
    }
  >();

  for (const { row } of scored) {
    const designation = row.designation || row.medication_dci;
    const key = `${row.medication_dci}||${row.dosage || ""}||${designation}`.toLowerCase();
    const existing = byKey.get(key);
    const pharmacy = Array.isArray(row.pharmacies) ? row.pharmacies[0] : row.pharmacies;
    if (!existing) {
      byKey.set(key, {
        dci: row.medication_dci,
        designation,
        dosage: row.dosage,
        form: null,
        pvp: row.unit_price,
        pv_drd: null,
        search_text: `${row.medication_dci} ${designation} ${row.dosage || ""}`.toLowerCase(),
        quantity: row.quantity,
        pharmacy_id: row.pharmacy_id,
        pharmacy_name: pharmacy?.name ?? null,
        pharmacies_count: 1,
        stock_id: row.id,
      });
    } else {
      existing.pharmacies_count += 1;
      existing.quantity += row.quantity;
      if (existing.pvp == null && row.unit_price != null) existing.pvp = row.unit_price;
    }
    if (byKey.size >= limit) break;
  }

  const medications = [...byKey.values()].slice(0, limit);
  return NextResponse.json({
    count: medications.length,
    medications,
    source: "pharmacy_stock",
  });
}
