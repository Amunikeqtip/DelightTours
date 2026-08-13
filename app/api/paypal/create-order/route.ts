import { createPayPalOrder, type PayPalBookingInput } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<PayPalBookingInput> & { guests?: number | string };
    const serviceIds = Array.isArray(payload.serviceIds)
      ? payload.serviceIds.map(cleanText).filter(Boolean)
      : [];
    const guests = typeof payload.guests === "string" ? Number.parseInt(payload.guests, 10) : Number(payload.guests);
    const name = cleanText(payload.name);
    const email = cleanText(payload.email);
    const phone = cleanText(payload.phone);
    const date = cleanText(payload.date);
    const notes = cleanText(payload.notes);

    if (!serviceIds.length || !name || !email || !phone || !date) {
      return Response.json(
        { error: "Services, name, email, phone, and preferred date are required." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(guests) || guests < 1) {
      return Response.json({ error: "Guest count must be at least 1." }, { status: 400 });
    }

    const { orderId, quote } = await createPayPalOrder({
      serviceIds,
      guests,
      name,
      email,
      phone,
      date,
      notes,
    });

    return Response.json({
      orderId,
      total: quote.total,
      currency: quote.currency,
      description: quote.description,
      services: quote.services.map((service) => ({ id: service.id, title: service.title, price: service.price })),
      guests: quote.guests,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("PayPal create-order failed:", message, error);
    return Response.json({ error: "Unable to create PayPal order.", detail: message }, { status: 500 });
  }
}
