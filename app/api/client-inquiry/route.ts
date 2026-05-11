import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  buildBookingFollowUpEmailHtml,
  buildBookingFollowUpTemplate,
  buildGeneralClientInquiryEmailHtml,
  buildGeneralClientInquiryTemplate,
  serviceProviderContact,
} from "@/lib/clientMessageTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AppSettings = {
  emailSettings?: {
    RefLink?: string;
    EmailHost?: string;
    EmailUsername?: string;
    EmailPassword?: string;
  };
};

type InquiryPayload = {
  channel?: "email" | "whatsapp";
  flow?: "general" | "booking";
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  selectedServices?: string[];
};

async function getEmailSettings() {
  const settingsPath = path.join(process.cwd(), "appsettings.json");
  const settings = JSON.parse(await readFile(settingsPath, "utf8")) as AppSettings;
  const emailSettings = settings.emailSettings;

  if (!emailSettings?.EmailHost || !emailSettings.EmailUsername || !emailSettings.EmailPassword) {
    throw new Error("Email settings are incomplete.");
  }

  return emailSettings;
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const clientName = cleanText(payload.clientName);
    const clientEmail = cleanText(payload.clientEmail);
    const clientPhone = cleanText(payload.clientPhone);
    const selectedServices = Array.isArray(payload.selectedServices)
      ? payload.selectedServices.map(cleanText).filter(Boolean)
      : [];

    if (!clientName || !clientEmail || !clientPhone || selectedServices.length === 0) {
      return Response.json(
        { error: "Name, email, phone number, and at least one service are required." },
        { status: 400 },
      );
    }

    const emailSettings = await getEmailSettings();
    const details = {
      clientName,
      clientEmail,
      clientPhone,
      serviceProviderName: serviceProviderContact.providerName,
      platformName: serviceProviderContact.platformName,
      tourOrServiceName: selectedServices.join(", "),
      selectedServices,
    };
    const isBookingFlow = payload.flow === "booking";
    const subject = isBookingFlow
      ? `Booking follow-up request from ${clientName}`
      : `Client inquiry from ${clientName}`;
    const html = isBookingFlow
      ? buildBookingFollowUpEmailHtml(details)
      : buildGeneralClientInquiryEmailHtml(details);
    const text = isBookingFlow
      ? buildBookingFollowUpTemplate(details)
      : buildGeneralClientInquiryTemplate(details);

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

    await transporter.sendMail({
      from: `"${serviceProviderContact.providerName}" <${emailSettings.EmailUsername}>`,
      to: serviceProviderContact.email,
      replyTo: `"${clientName}" <${clientEmail}>`,
      subject,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Client inquiry email failed", error);
    return Response.json({ error: "Unable to send inquiry right now." }, { status: 500 });
  }
}
