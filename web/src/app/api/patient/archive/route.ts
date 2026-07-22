import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ArchiveTarget =
  | "medical_history"
  | "journal"
  | "chat_thread"
  | "order"
  | "appointment"
  | "notification";

/**
 * Soft-delete / archivage patient.
 * Les lignes restent en base (deleted_at ou patient_deleted_at).
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = (await request.json()) as { type?: ArchiveTarget; id?: string };
  if (!body.type || !body.id) {
    return NextResponse.json({ error: "type et id requis" }, { status: 400 });
  }

  const now = new Date().toISOString();

  let error: { message: string } | null = null;

  switch (body.type) {
    case "medical_history": {
      const res = await supabase
        .from("medical_history_entries")
        .update({ deleted_at: now, deleted_by: user.id })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("deleted_at", null);
      error = res.error;
      break;
    }
    case "journal": {
      const res = await supabase
        .from("mental_health_journal")
        .update({ deleted_at: now, deleted_by: user.id })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("deleted_at", null);
      error = res.error;
      break;
    }
    case "chat_thread": {
      const res = await supabase
        .from("mental_chat_threads")
        .update({ deleted_at: now, deleted_by: user.id })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("deleted_at", null);
      error = res.error;
      break;
    }
    case "order": {
      const res = await supabase
        .from("orders")
        .update({ patient_deleted_at: now })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("patient_deleted_at", null);
      error = res.error;
      break;
    }
    case "appointment": {
      const res = await supabase
        .from("appointments")
        .update({ patient_deleted_at: now })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("patient_deleted_at", null);
      error = res.error;
      break;
    }
    case "notification": {
      const res = await supabase
        .from("notifications")
        .update({ deleted_at: now })
        .eq("id", body.id)
        .eq("user_id", user.id)
        .is("deleted_at", null);
      error = res.error;
      break;
    }
    default:
      return NextResponse.json({ error: "type inconnu" }, { status: 400 });
  }

  if (error) {
    const msg = error.message || "";
    if (/does not exist|n'existe pas|42703|PGRST204/i.test(msg)) {
      return NextResponse.json(
        {
          error:
            "Migration soft-delete manquante. Exécutez supabase/migrations/019_patient_soft_delete.sql dans le SQL Editor Supabase.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
