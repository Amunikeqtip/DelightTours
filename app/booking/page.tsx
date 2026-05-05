"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PlatformIcons from "@/components/PlatformIcons";

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
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-foreground/60 mb-2">
          Thank you, {form.name}. Your booking for <strong>{selectedTour?.title}</strong> has been received.
        </p>
        <p className="text-foreground/60 mb-8">
          A confirmation email has been sent to <strong>{form.email}</strong>.
        </p>
        <Link href="/" className="inline-block rounded-md bg-cta px-8 py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Booking</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Book your tour</h1>
        <p className="text-foreground/65">Send your details and we will confirm availability, timing, and final arrangements.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-md border border-border bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Select Tour</h2>
            <select
              name="tourId"
              value={form.tourId}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Choose a tour...</option>
              {tourOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} — ${t.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Guests</label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Special Requests</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any dietary requirements, accessibility needs, etc."
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-cta py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
          >
            {loading ? "Processing..." : `Book Now — $${total}`}
          </button>
        </form>

        <div className="h-fit rounded-md border border-border bg-accent-cream p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h2>
          {selectedTour ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-foreground/60">Tour</p>
                <p className="font-semibold text-foreground">{selectedTour.title}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/60">Date</span>
                <span className="text-sm text-foreground">{form.date || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/60">Guests</span>
                <span className="text-sm text-foreground">{form.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground/60">Price per person</span>
                <span className="text-sm text-foreground">${selectedTour.price}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">${total}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground/50">Select a tour to see summary</p>
          )}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-foreground/50">Secure checkout powered by Bokun</p>
              <PlatformIcons compact include={["Bokun"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[400px]">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
