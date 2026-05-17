"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BokunWidget } from "@/components/PartnerWidgets";
import {
  buildBookingFollowUpTemplate,
  buildMailToLink,
  buildQuickWhatsAppTemplate,
  buildWhatsAppLink,
  serviceProviderContact,
} from "@/lib/clientMessageTemplates";

const tourOptions = [
  { id: "1", title: "Victoria Falls Guided Tour", price: 65 },
  { id: "2", title: "Zambezi Sunset Cruise", price: 85 },
  { id: "3", title: "Chobe Day Safari", price: 175 },
  { id: "4", title: "Falls Helicopter Flight", price: 160 },
  { id: "5", title: "Village & Market Visit", price: 45 },
  { id: "6", title: "Boma Dinner Experience", price: 70 },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const prefilledTourId = searchParams.get("tourId");

  const [form, setForm] = useState({
    tourId: prefilledTourId || "",
    date: "",
    guests: "1",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedTour = tourOptions.find((t) => t.id === form.tourId);
  const total = selectedTour ? selectedTour.price * parseInt(form.guests || "1") : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    const messageDetails = {
      clientName: form.name,
      clientEmail: form.email,
      clientPhone: form.phone,
      serviceProviderName: serviceProviderContact.providerName,
      platformName: serviceProviderContact.platformName,
      tourOrServiceName: selectedTour?.title,
      selectedServices: selectedTour ? [selectedTour.title] : [],
      date: form.date,
    };
    const emailHref = buildMailToLink(
      serviceProviderContact.email,
      `Booking confirmation request for ${selectedTour?.title ?? "tour/service"}`,
      buildBookingFollowUpTemplate(messageDetails),
    );
    const whatsappHref = buildWhatsAppLink(
      serviceProviderContact.whatsappNumber,
      buildQuickWhatsAppTemplate(messageDetails),
    );

    return (
      <div className="bg-background px-4 py-20 text-center text-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-background/10 p-8 shadow-sm backdrop-blur">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-primary-dark">✓</div>
          <h1 className="mb-4 text-3xl font-bold text-foreground">Enquiry received</h1>
          <p className="mb-2 text-foreground/60">
            Thank you, {form.name}. Your enquiry for <strong>{selectedTour?.title}</strong> has been received.
          </p>
          <p className="mb-8 text-foreground/60">
            A confirmation has been sent to <strong>{form.email}</strong>. Reach us directly to confirm:
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={emailHref} className="inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
              Email Provider
            </Link>
            <Link href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
              WhatsApp Provider
            </Link>
            <Link href="/" className="inline-flex items-center justify-center rounded-md border border-border bg-background/10 px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-background/20">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
        <Image
          src="/tours/zambezi-sunset-cruise.jpg"
          alt="Zambezi sunset cruise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 74%, transparent) 55%, color-mix(in srgb, #0d1210 45%, transparent) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-light sm:text-sm">Booking</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">Book your tour with a cleaner flow.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">Check live availability and book instantly via Bokun, or send us an enquiry and we will confirm the details.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">

        {/* Section 1 — Live Bokun booking widget */}
        <section className="mb-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-accent-light">Live Booking</p>
          <h2 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl">Check availability and book instantly.</h2>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-foreground/60">
            Real-time availability from our Bokun booking channel — select a date, choose your group size, and confirm directly.
          </p>
          <BokunWidget />
        </section>

        {/* OR divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">or send an enquiry</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Section 2 — Enquiry form */}
        <section>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-accent-light">Enquiry</p>
          <h2 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl">Prefer to talk it through first?</h2>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-foreground/60">
            Fill in your details and we will reply with availability, options, and pricing — usually within a few hours.
          </p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-background/10 p-4 shadow-sm backdrop-blur sm:p-6 lg:col-span-2">
              <div>
                <h3 className="mb-4 text-base font-semibold text-foreground">Select a tour</h3>
                <select name="tourId" value={form.tourId} onChange={handleChange} required className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40">
                  <option value="">Choose a tour...</option>
                  {tourOptions.map((t) => (
                    <option key={t.id} value={t.id}>{t.title} — ${t.price}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-foreground">Preferred date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-foreground">Guests</label>
                  <select name="guests" value={form.guests} onChange={handleChange} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="mb-4 text-base font-semibold text-foreground">Your details</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-foreground">Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-foreground">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+263 00 000 0000" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Special requests</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Dietary requirements, accessibility needs, group details, etc." className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>

              <button type="submit" disabled={loading} className="w-full rounded-md bg-cta py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover disabled:opacity-60">
                {loading ? "Sending..." : `Send Enquiry${total ? ` — Est. $${total}` : ""}`}
              </button>
            </form>

            <div className="h-fit rounded-lg border border-border bg-background/10 p-4 shadow-sm backdrop-blur sm:p-6">
              <h3 className="mb-4 text-base font-semibold text-foreground">Enquiry summary</h3>
              {selectedTour ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/50">Tour</p>
                    <p className="font-semibold text-foreground">{selectedTour.title}</p>
                  </div>
                  <div className="flex justify-between"><span className="text-sm text-foreground/50">Date</span><span className="text-sm text-foreground">{form.date || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-foreground/50">Guests</span><span className="text-sm text-foreground">{form.guests}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-foreground/50">Price per person</span><span className="text-sm text-foreground">${selectedTour.price}</span></div>
                  <div className="flex justify-between border-t border-border pt-3"><span className="font-semibold text-foreground">Estimated total</span><span className="text-lg font-bold text-accent">${total}</span></div>
                </div>
              ) : (
                <p className="text-sm text-foreground/50">Select a tour to see a summary</p>
              )}
              <p className="mt-6 text-xs leading-5 text-foreground/40">
                This enquiry form is a request only. Confirmed pricing and availability is provided by Bokun above or by our team via email/WhatsApp.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[400px] items-center justify-center bg-background text-foreground">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
