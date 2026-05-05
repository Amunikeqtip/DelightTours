"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
      <div className="mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Contact</p>
        <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Plan a clean, easy trip</h1>
        <p className="text-foreground/65">Reach out with questions, special requests, or a tour idea you want shaped properly.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="rounded-md border border-border bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h2>
              <p className="text-foreground/60">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-md border border-border bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select a subject...</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="custom">Custom Tour Request</option>
                  <option value="support">Customer Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-cta py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-md border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Get in Touch</h2>
            <div className="space-y-3 text-sm">
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Email:</span><br />
                <a href="mailto:hello@delighttours.com" className="text-primary hover:underline">hello@delighttours.com</a>
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Phone:</span><br />
                <a href="tel:+263000000000" className="text-primary hover:underline">+263 00 000 0000</a>
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Address:</span><br />
                Victoria Falls<br />
                Zimbabwe
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Hours:</span><br />
                Daily: 8am-6pm CAT
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
            <iframe
              title="Delight Tours Office Location"
              src="https://www.google.com/maps?q=Victoria%20Falls%2C%20Zimbabwe&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { name: "Facebook", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "Tripadvisor", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: "How do I cancel or modify my booking?", a: "You can cancel or modify your booking up to 24 hours before the tour start time by contacting us directly." },
            { q: "What is your refund policy?", a: "Full refunds are available for cancellations made at least 24 hours in advance. Weather-related cancellations receive a full refund or reschedule option." },
            { q: "Do you offer group discounts?", a: "Yes! Groups of 8 or more receive a 10% discount. Contact us directly for custom group packages and pricing." },
            { q: "What should I bring on my tour?", a: "We recommend comfortable walking shoes, weather-appropriate clothing, and a camera. Specific requirements are listed on each tour page." },
          ].map((faq, i) => (
            <details key={i} className="group rounded-md border border-border bg-white p-5 shadow-sm">
              <summary className="text-sm font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
