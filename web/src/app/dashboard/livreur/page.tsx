import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeliveryModule } from "@/components/DeliveryModule";

export default async function LivreurPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "livreur" && profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <DeliveryModule />;
}
