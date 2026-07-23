import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { countOnlineLivreurs } from "@/lib/delivery-assignment";

/** Indique si des livreurs sont en ligne (GPS récent). */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const online = await countOnlineLivreurs(supabase);
  return NextResponse.json({
    online,
    available: online > 0,
  });
}
