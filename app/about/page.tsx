import Link from "next/link";
import Image from "next/image";
import PlatformIcons from "@/components/PlatformIcons";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
        <Image
          src="/tours/victoria-falls-guided-tour.jpg"
          alt="Rainforest path near Victoria Falls"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 72%, transparent) 55%, color-mix(in srgb, #0d1210 38%, transparent) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">About Delight</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Local travel, handled with care and clarity.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            A Victoria Falls travel team focused on clean communication, reliable partners, and experiences that feel personal without becoming complicated.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-muted px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="rounded-lg border border-border bg-background/10 p-6 shadow-sm backdrop-blur sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/65">
              <p>
                Delight Tours & Travel is built around simple, well-run experiences for guests visiting Victoria Falls
                and the surrounding region. We focus on clear planning, dependable operators, and warm support from inquiry to drop-off.
              </p>
              <p>
                We work with Bokun, Viator, GetYourGuide, and Tripadvisor-ready workflows to bring guests familiar booking tools with local travel judgment behind them.
              </p>
            </div>
            <div className="mt-6">
              <PlatformIcons />
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["Mission", "Create meaningful travel experiences that connect guests with place, culture, and local expertise."],
              ["Vision", "Become a trusted name for curated Victoria Falls travel, known for calm service and memorable moments."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-lg border border-border bg-background/10 p-6 shadow-sm backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-light">{title}</p>
                <p className="mt-3 text-sm leading-6 text-foreground/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent-cream px-4 py-14 text-foreground sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Values</p>
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">The service details that shape every trip.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Authenticity", desc: "Real experiences with local experts." },
              { title: "Excellence", desc: "Every detail handled with care." },
              { title: "Sustainability", desc: "Travel that respects people and place." },
              { title: "Transparency", desc: "Clear prices, honest reviews, no surprises." },
              { title: "Hospitality", desc: "Warm, responsive service at every step." },
              { title: "Modern tools", desc: "Simple booking powered by trusted platforms." },
            ].map((value) => (
              <div key={value.title} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                <h3 className="font-bold text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 text-center sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">Ready to explore?</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Let the local team shape the moving parts.</h2>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-md bg-cta px-8 py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
