"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const tourOptions = [
  { id: "1", title: "Golden Circle Day Tour", price: 129 },
  { id: "2", title: "Northern Lights Expedition", price: 89 },
  { id: "3", title: "Coastal Food & Wine Walk", price: 75 },
  { id: "4", title: "Glacier Hiking Experience", price: 159 },
  { id: "5", title: "City Highlights Bus Tour", price: 49 },
  { id: "6", title: "Sunset Sailing Cruise", price: 95 },
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
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-foreground/60 mb-2">
          Thank you, {form.name}. Your booking for <strong>{selectedTour?.title}</strong> has been received.
        </p>
        <p className="text-foreground/60 mb-8">
          A confirmation email has been sent to <strong>{form.email}</strong>.
        </p>
        <Link
          href="/"
          className="inline-block bg-cta text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-cta-hover transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Book Your Tour</h1>
        <p className="text-foreground/60">Secure checkout powered by Bókun. Real-time availability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-border rounded-xl p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Select Tour</h2>
            <select
              name="tourId"
              value={form.tourId}
              onChange={handleChange}
              required
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Guests</label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cta text-white text-base font-semibold py-3 rounded-full hover:bg-cta-hover transition-colors disabled:opacity-60"
          >
            {loading ? "Processing..." : `Book Now — $${total}`}
          </button>
        </form>

        <div className="bg-accent-cream border border-border rounded-xl p-6 h-fit">
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
            <p className="text-xs text-foreground/50 flex items-center gap-1">
              🔒 Secure checkout powered by Bókun
            </p>
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
