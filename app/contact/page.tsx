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
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-foreground/60">We&apos;d love to hear from you. Reach out with questions or special requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white border border-border rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h2>
              <p className="text-foreground/60">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-6 space-y-5">
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
                    placeholder="your@email.com"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cta text-white text-base font-semibold py-3 rounded-full hover:bg-cta-hover transition-colors disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Get in Touch</h2>
            <div className="space-y-3 text-sm">
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Email:</span><br />
                <a href="mailto:hello@delighttours.com" className="text-primary hover:underline">hello@delighttours.com</a>
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Phone:</span><br />
                <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a>
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Address:</span><br />
                123 Adventure Lane<br />
                Reykjavik, Iceland
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Hours:</span><br />
                Mon–Fri: 9am–6pm GMT<br />
                Sat–Sun: 10am–4pm GMT
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Phone:</span><br />
                <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a>
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Address:</span><br />
                123 Adventure Lane<br />
                Reykjavik, Iceland
              </p>
              <p className="text-foreground/70">
                <span className="font-semibold text-foreground">Hours:</span><br />
                Mon–Fri: 9am–6pm GMT<br />
                Sat–Sun: 10am–4pm GMT
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <iframe
              title="Delight Tours Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1394.1234567890123!2d-21.827774!3d64.146582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d674d44f4c8b6b%3A0x4c1f3b5e8d9f0a1b!2sReykjavik%2C%20Iceland!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Social Links */}
          <div className="bg-white border border-border rounded-xl p-6">
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
            { q: "How do I cancel or modify my booking?", a: "You can cancel or modify your booking up to 24 hours before the tour start time through our booking portal or by contacting us directly." },
            { q: "What is your refund policy?", a: "Full refunds are available for cancellations made at least 24 hours in advance. Weather-related cancellations receive a full refund or reschedule option." },
            { q: "Do you offer group discounts?", a: "Yes! Groups of 8 or more receive a 10% discount. Contact us directly for custom group packages and pricing." },
            { q: "What should I bring on my tour?", a: "We recommend comfortable walking shoes, weather-appropriate clothing, and a camera. Specific requirements are listed on each tour page." },
          ].map((faq, i) => (
            <details key={i} className="bg-white border border-border rounded-xl p-5 group">
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
