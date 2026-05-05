import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">About Delight Tours</h1>
        <p className="text-foreground/60">Our story, mission, and values.</p>
      </div>

      {/* Story */}
      <section className="mb-12">
        <div className="bg-white border border-border rounded-xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Our Story</h2>
          <p className="text-foreground/70 leading-relaxed">
            Founded with a passion for authentic travel experiences, Delight Tours & Travel began as a small
            family operation dedicated to sharing the beauty of our region with the world. What started as a
            single guided walk has grown into a curated collection of unforgettable experiences.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Today, we partner with the world&apos;s leading booking platforms — Bókun, Viator, GetYourGuide, and
            Tripadvisor — to bring you seamless booking, verified reviews, and real-time availability across
            all our tours and activities.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
          <p className="text-foreground/70 leading-relaxed">
            To create meaningful, sustainable travel experiences that connect people with places, cultures,
            and communities — leaving a positive impact on every traveler and destination we touch.
          </p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
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
            <div key={value.title} className="bg-accent-cream border border-border rounded-xl p-5">
              <h4 className="font-semibold text-primary mb-1">{value.title}</h4>
              <p className="text-sm text-foreground/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Explore?</h2>
        <p className="mb-6 text-white/80">Join thousands of happy travelers. Book your next adventure today.</p>
        <Link
          href="/booking"
          className="inline-block bg-white text-primary text-base font-semibold px-8 py-3 rounded-full hover:bg-accent-cream transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
