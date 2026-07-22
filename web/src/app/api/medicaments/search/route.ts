import { NextRequest, NextResponse } from "next/server";
import { searchMedications } from "@/lib/gosante";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "20");
  const results = searchMedications(q, Math.min(limit, 50));
  return NextResponse.json({ count: results.length, medications: results });
}
