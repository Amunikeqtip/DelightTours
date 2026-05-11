"use client";

import { useMemo, useState } from "react";
import {
  buildQuickWhatsAppTemplate,
  buildWhatsAppLink,
  serviceProviderContact,
} from "@/lib/clientMessageTemplates";
import { serviceOptions } from "@/lib/serviceOptions";

export type InquiryChannel = "email" | "whatsapp";

type ClientInquiryModalProps = {
  channel: InquiryChannel;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  services: string[];
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  services: [],
};

export default function ClientInquiryModal({ channel, onClose }: ClientInquiryModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const title = channel === "whatsapp" ? "WhatsApp inquiry" : "Email inquiry";
  const selectedServiceNames = useMemo(
    () =>
      serviceOptions
        .filter((service) => form.services.includes(service.id))
        .map((service) => service.title),
    [form.services],
  );

  const updateField = (field: keyof Omit<FormState, "services">, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(serviceId)
        ? current.services.filter((id) => id !== serviceId)
        : [...current.services, serviceId],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/client-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          flow: "general",
          clientName: form.name,
          clientEmail: form.email,
          clientPhone: form.phone,
          selectedServices: selectedServiceNames,
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send inquiry right now.");
      }

      setStatus("sent");

      if (channel === "whatsapp") {
        const whatsappLink = buildWhatsAppLink(
          serviceProviderContact.whatsappNumber,
          buildQuickWhatsAppTemplate({
            clientName: form.name,
            clientEmail: form.email,
            clientPhone: form.phone,
            platformName: serviceProviderContact.platformName,
            selectedServices: selectedServiceNames,
          }),
        );
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send inquiry right now.");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 px-3 py-4 sm:items-center sm:px-6">
      <div className="max-h-[calc(100svh-2rem)] w-full max-w-2xl overflow-y-auto rounded-md border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{title}</p>
            <h2 className="mt-1 text-xl font-bold text-foreground">Send your request</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            aria-label="Close inquiry form"
          >
            <span aria-hidden="true" className="text-xl leading-none">&times;</span>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-4 py-8 text-center sm:px-6">
            <h3 className="text-lg font-bold text-foreground">Request sent</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/65">
              Your details have been sent to {serviceProviderContact.providerName}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Phone number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="+263 00 000 0000"
              />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-foreground">Services</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {serviceOptions.map((service) => (
                  <label
                    key={service.id}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background px-3 py-3 text-sm transition-colors hover:border-primary"
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span>
                      <span className="block font-semibold text-foreground">{service.title}</span>
                      <span className="text-xs text-foreground/55">{service.category} | ${service.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {status === "error" && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-md bg-cta py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
