import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PsychologistModule } from "@/components/PsychologistModule";

export default async function PsychologuePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "psychologue" && profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <PsychologistModule />;
}
