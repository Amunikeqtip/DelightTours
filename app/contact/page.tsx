"use client";

import { useState } from "react";

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M14.2 8.4V6.7c0-.8.2-1.2 1.3-1.2h1.6V2.8c-.8-.1-1.5-.2-2.3-.2-2.4 0-4 1.5-4 4v1.8H8.1v3h2.7v9h3.4v-9H17l.4-3h-3.2Z",
  },
  {
    name: "Instagram",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M7.4 2.8h9.2c2.5 0 4.6 2.1 4.6 4.6v9.2c0 2.5-2.1 4.6-4.6 4.6H7.4a4.6 4.6 0 0 1-4.6-4.6V7.4c0-2.5 2.1-4.6 4.6-4.6Zm0 2A2.6 2.6 0 0 0 4.8 7.4v9.2a2.6 2.6 0 0 0 2.6 2.6h9.2a2.6 2.6 0 0 0 2.6-2.6V7.4a2.6 2.6 0 0 0-2.6-2.6H7.4Zm9.8 1.8a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z",
  },
  {
    name: "Tripadvisor",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M7.3 8.1A5 5 0 0 1 12 7a5 5 0 0 1 4.7 1.1l1.6-1.7h-4.4V4.1H10v2.3H5.7l1.6 1.7ZM7.6 17a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Zm8.8 0a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Zm-8.8-2.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm8.8 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z",
  },
];

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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Contact</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Plan a clean, easy trip</h1>
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
            <form onSubmit={handleSubmit} className="space-y-5 rounded-md border border-border bg-white p-4 shadow-sm sm:p-6">
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
          <div className="space-y-4 rounded-md border border-border bg-white p-4 shadow-sm sm:p-6">
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

          <div className="rounded-md border border-border bg-white p-4 shadow-sm sm:p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  title={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-white text-primary shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg viewBox={social.viewBox} className="h-5 w-5" aria-hidden="true">
                    <path d={social.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="mt-14 sm:mt-16">
        <h2 className="text-xl font-semibold text-foreground mb-6 sm:text-2xl">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: "How do I cancel or modify my booking?", a: "You can cancel or modify your booking up to 24 hours before the tour start time by contacting us directly." },
            { q: "What is your refund policy?", a: "Full refunds are available for cancellations made at least 24 hours in advance. Weather-related cancellations receive a full refund or reschedule option." },
            { q: "Do you offer group discounts?", a: "Yes! Groups of 8 or more receive a 10% discount. Contact us directly for custom group packages and pricing." },
            { q: "What should I bring on my tour?", a: "We recommend comfortable walking shoes, weather-appropriate clothing, and a camera. Specific requirements are listed on each tour page." },
          ].map((faq, i) => (
            <details key={i} className="group rounded-md border border-border bg-white p-5 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground">
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
