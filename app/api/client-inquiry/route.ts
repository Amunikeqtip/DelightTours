import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  buildBookingFollowUpEmailHtml,
  buildBookingFollowUpTemplate,
  buildCancellationEmailHtml,
  buildCancellationTemplate,
  buildGeneralClientInquiryEmailHtml,
  buildGeneralClientInquiryTemplate,
  buildReviewRequestEmailHtml,
  buildReviewRequestTemplate,
  serviceProviderContact,
} from "@/lib/clientMessageTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EmailFlow = {
  enabled?: boolean;
  subject?: string;
  recipients?: string[];
  adminEmail?: string;
};

type AppSettings = {
  emailSettings?: {
    RefLink?: string;
    EmailHost?: string;
    EmailUsername?: string;
    EmailPassword?: string;
  };
  emailFlows?: {
    bookingNotification?: EmailFlow;
    cancellation?: EmailFlow;
    reviewRequest?: EmailFlow;
    contactForm?: EmailFlow;
    [key: string]: EmailFlow | undefined;
  };
};

type FlowType = "general" | "booking" | "cancellation" | "reviewRequest";

type InquiryPayload = {
  channel?: "email" | "whatsapp";
  flow?: FlowType;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  selectedServices?: string[];
  date?: string;
};

async function loadSettings(): Promise<AppSettings> {
  const settingsPath = path.join(process.cwd(), "appsettings.json");
  return JSON.parse(await readFile(settingsPath, "utf8")) as AppSettings;
}

function getRecipient(flows: AppSettings["emailFlows"], flow: FlowType): string {
  const flowMap: Record<FlowType, keyof NonNullable<AppSettings["emailFlows"]>> = {
    booking: "bookingNotification",
    general: "contactForm",
    cancellation: "cancellation",
    reviewRequest: "reviewRequest",
  };
  const key = flowMap[flow];
  const entry = flows?.[key];
  const first = entry?.recipients?.[0] ?? entry?.adminEmail;
  return first ?? serviceProviderContact.email;
}

function getSubjectAndTemplates(flow: FlowType, clientName: string, details: Parameters<typeof buildBookingFollowUpEmailHtml>[0]) {
  switch (flow) {
    case "booking":
      return {
        subject: `Booking follow-up request from ${clientName}`,
        html: buildBookingFollowUpEmailHtml(details),
        text: buildBookingFollowUpTemplate(details),
      };
    case "cancellation":
      return {
        subject: `Booking cancellation notice from ${clientName}`,
        html: buildCancellationEmailHtml(details),
        text: buildCancellationTemplate(details),
      };
    case "reviewRequest":
      return {
        subject: `How was your tour? — Review request for ${clientName}`,
        html: buildReviewRequestEmailHtml(details),
        text: buildReviewRequestTemplate(details),
      };
    default:
      return {
        subject: `Client inquiry from ${clientName}`,
        html: buildGeneralClientInquiryEmailHtml(details),
        text: buildGeneralClientInquiryTemplate(details),
      };
  }
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

    const settings = await loadSettings();
    const emailSettings = settings.emailSettings;

    if (!emailSettings?.EmailHost || !emailSettings.EmailUsername || !emailSettings.EmailPassword) {
      return Response.json({ error: "Email settings are incomplete." }, { status: 500 });
    }

    const flow: FlowType = (payload.flow as FlowType) ?? "general";
    const details = {
      clientName,
      clientEmail,
      clientPhone,
      serviceProviderName: serviceProviderContact.providerName,
      platformName: serviceProviderContact.platformName,
      tourOrServiceName: selectedServices.join(", "),
      selectedServices,
      date: cleanText(payload.date),
    };

    const to = getRecipient(settings.emailFlows, flow);
    const { subject, html, text } = getSubjectAndTemplates(flow, clientName, details);

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
      to,
      replyTo: `"${clientName}" <${clientEmail}>`,
      subject,
      text,
      html,
    });

    return Response.json({ ok: true, to, flow });
  } catch (error) {
    console.error("Client inquiry email failed", error);
    return Response.json({ error: "Unable to send inquiry right now." }, { status: 500 });
  }
}
