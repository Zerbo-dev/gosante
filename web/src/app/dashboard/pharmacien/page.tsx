import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PharmacistModule } from "@/components/PharmacistModule";

export default async function PharmacienPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "pharmacien" && profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <PharmacistModule />;
}
