import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isMissingColumnError } from "@/lib/soft-delete";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const base = () =>
    supabase
      .from("notifications")
      .select("id, title, body, type, href, read_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(40);

  let { data, error } = await base().is("deleted_at", null);
  if (error && isMissingColumnError(error)) {
    ({ data, error } = await base());
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = data ?? [];
  const unread = items.filter((n) => !n.read_at).length;
  return NextResponse.json({ notifications: items, unread });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = (await request.json()) as {
    id?: string;
    markAll?: boolean;
    delete?: boolean;
  };
  const now = new Date().toISOString();

  if (body.markAll) {
    let { error } = await supabase
      .from("notifications")
      .update({ read_at: now })
      .eq("user_id", user.id)
      .is("read_at", null)
      .is("deleted_at", null);
    if (error && isMissingColumnError(error)) {
      ({ error } = await supabase
        .from("notifications")
        .update({ read_at: now })
        .eq("user_id", user.id)
        .is("read_at", null));
    }
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id ou markAll requis" }, { status: 400 });
  }

  if (body.delete) {
    const { error } = await supabase
      .from("notifications")
      .update({ deleted_at: now })
      .eq("id", body.id)
      .eq("user_id", user.id)
      .is("deleted_at", null);
    if (error) {
      if (isMissingColumnError(error)) {
        return NextResponse.json(
          {
            error:
              "Migration soft-delete manquante. Exécutez 019_patient_soft_delete.sql dans Supabase.",
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  let { error } = await supabase
    .from("notifications")
    .update({ read_at: now })
    .eq("id", body.id)
    .eq("user_id", user.id)
    .is("deleted_at", null);
  if (error && isMissingColumnError(error)) {
    ({ error } = await supabase
      .from("notifications")
      .update({ read_at: now })
      .eq("id", body.id)
      .eq("user_id", user.id));
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
