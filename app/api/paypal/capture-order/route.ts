import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  buildPayPalPaymentAdminEmailHtml,
  buildPayPalPaymentAdminTemplate,
  buildPayPalPaymentClientEmailHtml,
  serviceProviderContact,
} from "@/lib/clientMessageTemplates";
import { buildBookingQuote, capturePayPalOrder } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CapturePayload = {
  orderId?: string;
  serviceIds?: string[];
  guests?: number | string;
  date?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

type AppSettings = {
  emailSettings?: {
    EmailHost?: string;
    EmailUsername?: string;
    EmailPassword?: string;
  };
  emailFlows?: {
    bookingNotification?: {
      recipients?: string[];
      adminEmail?: string;
    };
  };
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function loadSettings(): Promise<AppSettings> {
  const settingsPath = path.join(process.cwd(), "appsettings.json");
  return JSON.parse(await readFile(settingsPath, "utf8")) as AppSettings;
}

async function sendPaymentEmails(details: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedServices: string[];
  date: string;
  guests: string;
  notes: string;
  amountPaid: string;
  currency: string;
  transactionId: string;
}) {
  try {
    const settings = await loadSettings();
    const emailSettings = settings.emailSettings;
    if (!emailSettings?.EmailHost || !emailSettings.EmailUsername || !emailSettings.EmailPassword) {
      console.warn("PayPal capture succeeded but email settings are incomplete; skipping notification.");
      return { emailed: false as const };
    }

    const adminTo =
      settings.emailFlows?.bookingNotification?.recipients?.[0] ??
      settings.emailFlows?.bookingNotification?.adminEmail ??
      serviceProviderContact.email;

    const messageDetails = {
      clientName: details.clientName,
      clientEmail: details.clientEmail,
      clientPhone: details.clientPhone,
      serviceProviderName: serviceProviderContact.providerName,
      platformName: serviceProviderContact.platformName,
      tourOrServiceName: details.selectedServices.join(", "),
      selectedServices: details.selectedServices,
      date: details.date,
      guests: details.guests,
      notes: details.notes,
      amountPaid: details.amountPaid,
      currency: details.currency,
      transactionId: details.transactionId,
    };

    const transporter = nodemailer.createTransport({
      host: emailSettings.EmailHost,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: emailSettings.EmailUsername,
        pass: emailSettings.EmailPassword,
      },
    });

    const from = `"${serviceProviderContact.providerName}" <${emailSettings.EmailUsername}>`;

    await transporter.sendMail({
      from,
      to: adminTo,
      replyTo: `"${details.clientName}" <${details.clientEmail}>`,
      subject: `PayPal payment received from ${details.clientName}`,
      text: buildPayPalPaymentAdminTemplate(messageDetails),
      html: buildPayPalPaymentAdminEmailHtml(messageDetails),
    });

    await transporter.sendMail({
      from,
      to: details.clientEmail,
      subject: `Payment confirmation — ${serviceProviderContact.providerName}`,
      text: `Hi ${details.clientName},\n\nThank you — we received your PayPal payment (${details.currency} ${details.amountPaid}) for ${details.selectedServices.join(", ")}.\nTransaction: ${details.transactionId}\n\nWe will confirm timing shortly.\n\n${serviceProviderContact.providerName}\n${serviceProviderContact.phone}\n${serviceProviderContact.email}`,
      html: buildPayPalPaymentClientEmailHtml(messageDetails),
    });

    return { emailed: true as const, adminTo, clientTo: details.clientEmail };
  } catch (error) {
    console.error("PayPal payment email failed:", error);
    return { emailed: false as const };
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CapturePayload;
    const orderId = cleanText(payload.orderId);
    const serviceIds = Array.isArray(payload.serviceIds)
      ? payload.serviceIds.map(cleanText).filter(Boolean)
      : [];
    const guests = typeof payload.guests === "string" ? Number.parseInt(payload.guests, 10) : Number(payload.guests);
    const name = cleanText(payload.name);
    const email = cleanText(payload.email);
    const phone = cleanText(payload.phone);
    const date = cleanText(payload.date);
    const notes = cleanText(payload.notes);

    if (!orderId) {
      return Response.json({ error: "PayPal orderId is required." }, { status: 400 });
    }

    if (!serviceIds.length || !name || !email || !phone || !date || !Number.isFinite(guests) || guests < 1) {
      return Response.json(
        { error: "Booking details (services, guests, date, name, email, phone) are required after payment." },
        { status: 400 },
      );
    }

    const quote = buildBookingQuote(serviceIds, guests);
    const capture = await capturePayPalOrder(orderId);

    if (capture.status !== "COMPLETED" && capture.status !== "PENDING") {
      return Response.json(
        { error: "PayPal payment was not completed.", status: capture.status },
        { status: 402 },
      );
    }

    const amountPaid = capture.amount ?? quote.total.toFixed(2);
    const mail = await sendPaymentEmails({
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      selectedServices: quote.services.map((service) => service.title),
      date,
      guests: String(quote.guests),
      notes,
      amountPaid,
      currency: capture.currency,
      transactionId: capture.transactionId,
    });

    return Response.json({
      ok: true,
      status: capture.status,
      orderId: capture.orderId,
      transactionId: capture.transactionId,
      amount: amountPaid,
      currency: capture.currency,
      services: quote.services.map((service) => ({ id: service.id, title: service.title, price: service.price })),
      guests: quote.guests,
      date,
      name,
      email,
      phone,
      notes,
      emailed: mail.emailed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("PayPal capture-order failed:", message, error);
    return Response.json({ error: "Unable to capture PayPal payment.", detail: message }, { status: 500 });
  }
}
