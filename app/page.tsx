import Link from "next/link";
import Image from "next/image";
import PlatformIcons from "@/components/PlatformIcons";
import TourCard, { Tour } from "@/components/TourCard";

const featuredTours: Tour[] = [
  {
    id: "1",
    title: "Victoria Falls Guided Tour",
    description: "Walk the rainforest trails with a local guide and see the falls from the most dramatic viewpoints.",
    price: 65,
    duration: "3 hours",
    image: "/tours/victoria-falls-guided-tour.jpg",
    rating: 4.8,
    reviewCount: 324,
    category: "Sightseeing",
  },
  {
    id: "2",
    title: "Zambezi Sunset Cruise",
    description: "Settle into an easy evening on the river with golden light, wildlife sightings, and refreshments on board.",
    price: 85,
    duration: "2.5 hours",
    image: "/tours/zambezi-sunset-cruise.jpg",
    rating: 4.9,
    reviewCount: 218,
    category: "River",
  },
  {
    id: "3",
    title: "Chobe Day Safari",
    description: "Cross into Botswana for a full-day safari experience with game drives, river viewing, and lunch included.",
    price: 175,
    duration: "10 hours",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 156,
    category: "Safari",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate min-h-[calc(100svh-112px)] overflow-hidden sm:min-h-[calc(100vh-128px)]">
        <Image
          src="/tours/victoria-falls-guided-tour.jpg"
          alt="A traveler walking through the rainforest near Victoria Falls"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 68%, transparent) 48%, color-mix(in srgb, #0d1210 24%, transparent) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d1210] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-112px)] w-full max-w-7xl flex-col justify-end px-4 pb-8 pt-16 sm:min-h-[calc(100vh-128px)] sm:px-6 sm:pb-10 lg:pt-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-light backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Victoria Falls Experiences
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
                Curated tours around the Falls, planned with local precision.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                Guided rainforest walks, Zambezi cruises, safari day trips, and smooth transfers built around clear timing, warm service, and beautiful places.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-md bg-cta px-7 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-cta-hover"
                >
                  Start Booking
                </Link>
                <Link
                  href="#featured-tours"
                  className="inline-flex items-center justify-center rounded-md border border-white/35 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Explore Tours
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-5">
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Today&apos;s pick</p>
                  <h2 className="mt-2 text-xl font-bold text-white">Zambezi Sunset Cruise</h2>
                </div>
                <p className="rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-primary-dark">4.9</p>
              </div>
              <div className="grid grid-cols-3 gap-3 py-4 text-sm">
                {[
                  ["2.5h", "Duration"],
                  ["$85", "From"],
                  ["218", "Reviews"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-xl font-bold text-white">{value}</p>
                    <p className="mt-1 text-xs text-white/55">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/booking?tourId=2"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-bold text-primary-dark transition-colors hover:bg-accent-light"
              >
                Reserve this tour
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 border-t border-white/15 pt-5 text-white/80 sm:grid-cols-3 lg:max-w-3xl">
            {[
              ["4.8/5", "Guest rating"],
              ["1,200+", "Happy travelers"],
              ["24h", "Fast confirmations"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-md bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm text-white/62">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-light">Connected platforms</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/60">
              Familiar booking and review partners, with a local team handling the actual trip details.
            </p>
          </div>
          <PlatformIcons />
        </div>
      </section>

      <section className="bg-accent-cream text-foreground">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3">
          {[
            ["Plan", "Choose a tour, date, group size, and any special requests in a single clean flow."],
            ["Confirm", "Get clear timing, pickup details, and booking support before the activity."],
            ["Experience", "Meet local guides and enjoy Victoria Falls without chasing logistics."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-md border border-border bg-background p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{title}</p>
              <p className="mt-3 text-sm leading-6 text-foreground/65">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured-tours" className="bg-background px-4 py-14 text-foreground sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Featured tours</p>
              <h2 className="max-w-3xl text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                Signature experiences around Victoria Falls.
              </h2>
            </div>
            <Link href="/tours" className="inline-flex text-sm font-bold text-primary transition-colors hover:text-cta">
              View all tours
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">Why Delight</p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              A calmer way to book the big-ticket moments.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-foreground/60">
              The interface stays simple because the service behind it does the heavy lifting: timing, transfer coordination, local recommendations, and responsive support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Handpicked activities around Victoria Falls",
              "Simple booking and clear communication",
              "Guest-first support before and after the tour",
              "Flexible help for couples, families, and groups",
            ].map((item) => (
              <div key={item} className="rounded-md border border-border bg-background/5 p-5 text-sm font-semibold leading-6 text-foreground/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent-cream px-4 py-14 text-center text-foreground sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Ready when you are</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Shape a clean, memorable itinerary for your next trip.
          </h2>
          <Link
            href="/booking"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Start Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
