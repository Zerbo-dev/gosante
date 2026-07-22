import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const pharmacyId = request.nextUrl.searchParams.get("pharmacyId");
  if (!pharmacyId) {
    return NextResponse.json({ error: "pharmacyId requis" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pharmacy_stock")
    .select("medication_dci, designation, dosage, quantity, unit_price, updated_at")
    .eq("pharmacy_id", pharmacyId)
    .gt("quantity", 0)
    .order("medication_dci");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ stock: data ?? [] });
}
