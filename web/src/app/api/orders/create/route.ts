import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateDeliveryCode } from "@/lib/delivery";
import { countOnlineLivreurs } from "@/lib/delivery-assignment";
import { processMockPayment, type MockPaymentMethod } from "@/lib/mock-payment";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await request.json();
  const {
    items,
    pharmacyId,
    pharmacyExternalId,
    pharmacyName,
    pharmacyCity,
    pharmacyAddress,
    pharmacyPhone,
    pharmacyLat,
    pharmacyLng,
    deliveryAddress,
    deliveryPhone,
    deliveryLat,
    deliveryLng,
    urgencyLevel = "normal",
    paymentMethod = "mobile_money",
    customerPhone,
  } = body as {
    items: { dci: string; designation: string; dosage?: string; quantity: number; unitPrice?: number }[];
    pharmacyId?: string;
    pharmacyExternalId?: number;
    pharmacyName?: string;
    pharmacyCity?: string;
    pharmacyAddress?: string;
    pharmacyPhone?: string;
    pharmacyLat?: number;
    pharmacyLng?: number;
    deliveryAddress?: string;
    deliveryPhone?: string;
    deliveryLat?: number;
    deliveryLng?: number;
    urgencyLevel?: "normal" | "urgent" | "emergency";
    paymentMethod?: MockPaymentMethod;
    customerPhone?: string;
  };

  let resolvedPharmacyId = pharmacyId ?? null;

  if (!resolvedPharmacyId && pharmacyExternalId && pharmacyName) {
    const { data: existing } = await supabase
      .from("pharmacies")
      .select("id")
      .eq("external_id", pharmacyExternalId)
      .maybeSingle();

    if (existing?.id) {
      resolvedPharmacyId = existing.id;
    } else {
      const { data: created } = await supabase
        .from("pharmacies")
        .insert({
          external_id: pharmacyExternalId,
          name: pharmacyName,
          city: pharmacyCity ?? "Ouagadougou",
          address: pharmacyAddress ?? null,
          phone: pharmacyPhone ?? null,
          latitude: pharmacyLat ?? null,
          longitude: pharmacyLng ?? null,
        })
        .select("id")
        .single();
      resolvedPharmacyId = created?.id ?? null;
    }
  }

  if (!items?.length) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  if (!resolvedPharmacyId) {
    return NextResponse.json(
      { error: "Sélectionnez une pharmacie avant de commander." },
      { status: 400 }
    );
  }

  if (deliveryLat == null || deliveryLng == null) {
    return NextResponse.json(
      { error: "Placez le point de livraison sur la carte" },
      { status: 400 }
    );
  }

  const resolvedAddress =
    deliveryAddress?.trim() ||
    `Livraison GPS ${Number(deliveryLat).toFixed(5)}, ${Number(deliveryLng).toFixed(5)}`;

  const deliveryCode = generateDeliveryCode();
  const total = items.reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.quantity, 0);

  const payment = await processMockPayment({
    method: paymentMethod,
    amount: total,
    phone: customerPhone || undefined,
  });

  if (!payment.success) {
    return NextResponse.json({ error: payment.message }, { status: 400 });
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      pharmacy_id: resolvedPharmacyId,
      total_amount: total,
      payment_method: paymentMethod,
      payment_status: payment.paymentStatus,
      mock_payment_ref: payment.reference,
      status: payment.paymentStatus === "paid" ? "confirmed" : "pending",
      delivery_address: resolvedAddress,
      delivery_phone: customerPhone?.trim() || null,
      delivery_lat: deliveryLat,
      delivery_lng: deliveryLng,
      urgency_level: urgencyLevel,
      delivery_code: deliveryCode,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message ?? "Erreur commande" }, { status: 500 });
  }

  await supabase.from("order_items").insert(
    items.map((i) => ({
      order_id: order.id,
      medication_dci: i.dci,
      designation: i.designation,
      dosage: i.dosage ?? null,
      quantity: i.quantity,
      unit_price: i.unitPrice ?? null,
    }))
  );

  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "order_created",
    resource: `orders/${order.id}`,
    metadata: { total, paymentMethod, urgencyLevel },
  });

  const livreursOnline = await countOnlineLivreurs(supabase);

  return NextResponse.json({
    orderId: order.id,
    paymentStatus: payment.paymentStatus,
    paymentReference: payment.reference,
    deliveryCode,
    message: payment.message,
    livreursOnline,
    deliveryNotice:
      livreursOnline === 0
        ? "Aucun livreur en ligne pour le moment. Votre commande est bien enregistrée : un livreur sera assigné automatiquement dès qu'il se connecte."
        : null,
  });
}
