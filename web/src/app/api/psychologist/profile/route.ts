import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_BIO = "Professionnel GoSanté — consultations en visio.";

async function requirePsychologue() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: NextResponse.json({ error: "Non authentifié" }, { status: 401 }) };
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, phone")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "psychologue" && profile?.role !== "admin") {
    return {
      error: NextResponse.json({ error: "Accès réservé aux psychologues" }, { status: 403 }),
    };
  }
  return { supabase, user, profile };
}

/** Fiche du psychologue connecté — créée automatiquement si absente. */
export async function GET() {
  const auth = await requirePsychologue();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase, user, profile } = auth;

  const { data: existing } = await supabase
    .from("psychologists")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ psychologist: existing });
  }

  // Auto-réparation : fiche manquante (rôle attribué avant l'automatisation,
  // ou directement en base) — on la crée à la volée.
  const { data: created, error } = await supabase
    .from("psychologists")
    .insert({
      user_id: user.id,
      full_name: profile?.full_name || "Psychologue GoSanté",
      specialty: "Psychologie clinique",
      city: "Ouagadougou",
      phone: profile?.phone ?? null,
      bio: DEFAULT_BIO,
      languages: ["Français"],
      consultation_fee: 15000,
      is_available: true,
      profile_completed: false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ psychologist: created, created: true });
}

/** Mise à jour de la fiche (formulaire « Compléter mon profil »). */
export async function PATCH(request: NextRequest) {
  const auth = await requirePsychologue();
  if ("error" in auth && auth.error) return auth.error;
  const { supabase, user } = auth;

  const body = (await request.json()) as {
    fullName?: string;
    specialty?: string;
    city?: string;
    phone?: string | null;
    bio?: string | null;
    languages?: string[];
    consultationFee?: number | null;
    isAvailable?: boolean;
  };

  const fullName = body.fullName?.trim();
  const specialty = body.specialty?.trim();
  const city = body.city?.trim();
  const languages = (body.languages ?? [])
    .map((l) => String(l).trim())
    .filter(Boolean)
    .slice(0, 10);
  const fee = body.consultationFee == null ? null : Number(body.consultationFee);

  if (!fullName || !specialty || !city) {
    return NextResponse.json(
      { error: "Nom, spécialité et ville sont obligatoires" },
      { status: 400 }
    );
  }
  if (fee != null && (Number.isNaN(fee) || fee < 0 || fee > 1_000_000)) {
    return NextResponse.json({ error: "Tarif invalide" }, { status: 400 });
  }
  if (languages.length === 0) {
    return NextResponse.json({ error: "Indiquez au moins une langue" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("psychologists")
    .update({
      full_name: fullName,
      specialty,
      city,
      phone: body.phone?.trim() || null,
      bio: body.bio?.trim() || null,
      languages,
      consultation_fee: fee,
      is_available: body.isAvailable ?? true,
      profile_completed: true,
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ psychologist: data });
}
