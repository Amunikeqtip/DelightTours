import Link from "next/link";
import PlatformIcons from "@/components/PlatformIcons";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 md:py-16">
      <div className="mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">About</p>
        <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Local travel, handled with care</h1>
        <p className="text-foreground/65">Our story, mission, and values.</p>
      </div>

      <section className="mb-12">
        <div className="space-y-4 rounded-md border border-border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Our Story</h2>
          <p className="text-foreground/70 leading-relaxed">
            Delight Tours & Travel is built around simple, well-run experiences for guests visiting Victoria Falls
            and the surrounding region. We focus on clean communication, reliable partners, and tours that feel
            personal without becoming complicated.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            We work with the world&apos;s leading booking platforms — Bokun, Viator, GetYourGuide, and
            Tripadvisor — to bring you seamless booking, verified reviews, and real-time availability across
            all our tours and activities.
          </p>
          <PlatformIcons />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-md border border-border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
          <p className="text-foreground/70 leading-relaxed">
            To create meaningful, sustainable travel experiences that connect people with places, cultures,
            and communities — leaving a positive impact on every traveler and destination we touch.
          </p>
        </div>
        <div className="rounded-md border border-border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
          <p className="text-foreground/70 leading-relaxed">
            To be the most trusted name in curated travel experiences, known for excellence, integrity,
            and unforgettable moments that delight every guest.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Authenticity", desc: "Real experiences with real local experts." },
            { title: "Excellence", desc: "Every detail crafted to perfection." },
            { title: "Sustainability", desc: "Travel that respects people and planet." },
            { title: "Transparency", desc: "Clear pricing, honest reviews, no surprises." },
            { title: "Hospitality", desc: "Warm, welcoming service at every step." },
            { title: "Innovation", desc: "Modern booking powered by leading technology." },
          ].map((value) => (
            <div key={value.title} className="rounded-md border border-border bg-accent-cream p-5">
              <h4 className="font-semibold text-primary mb-1">{value.title}</h4>
              <p className="text-sm text-foreground/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-md bg-primary p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Explore?</h2>
        <p className="mb-6 text-white/80">Join thousands of happy travelers. Book your next adventure today.</p>
        <Link
          href="/booking"
          className="inline-block rounded-md bg-white px-8 py-3 text-base font-bold text-primary transition-colors hover:bg-accent-cream"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
