import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CartProvider } from "@/lib/cart";
import { ProfileProvider } from "@/components/ProfileProvider";
import { AppShell } from "@/components/AppShell";
import type { Profile } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", user.id)
    .single();

  return (
    <CartProvider>
      <ProfileProvider profile={(profile as Profile | null) ?? null}>
        <AppShell>{children}</AppShell>
      </ProfileProvider>
    </CartProvider>
  );
}
