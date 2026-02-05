import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["customer_details"],
  });

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
  }

  // 🔒 Anti-doublon
  const existing = await prisma.order.findFirst({
    where: { stripeSessionId: session.id },
  });

  if (existing) {
    return NextResponse.json({ success: true });
  }

  const cart = JSON.parse(session.metadata!.cart);

  // 🖨️ Création commande Gelato
  const products = cart.map((item: any) => ({
    productId: item.gelatoProductId,
    quantity: item.quantity,
    recipient: {
      name: session.customer_details!.name!,
      email: session.customer_details!.email!,
      address: {
        line1: session.customer_details!.address!.line1!,
        city: session.customer_details!.address!.city!,
        postalCode: session.customer_details!.address!.postal_code!,
        country: session.customer_details!.address!.country!,
      },
    },
  }));

  const gelatoRes = await fetch("https://api.gelato.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GELATO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
  });

  const gelatoOrder = await gelatoRes.json();

  // 💾 Sauvegarde DB
  await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      total: (session.amount_total ?? 0) / 100,
      status: "CONFIRMED",
      gelatoOrderId: gelatoOrder.id,
    },
  });

  return NextResponse.json({ success: true });
}
