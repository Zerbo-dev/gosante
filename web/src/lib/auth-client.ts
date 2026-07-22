"use client";

import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

export async function fetchProfile(): Promise<Profile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", user.id)
    .single();

  return data as Profile | null;
}

export { roleHomePath } from "@/lib/auth-shared";
