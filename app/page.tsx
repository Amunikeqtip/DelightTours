import Link from "next/link";
import PlatformIcons from "@/components/PlatformIcons";
import TourCard, { Tour } from "@/components/TourCard";

const featuredTours: Tour[] = [
  {
    id: "1",
    title: "Victoria Falls Guided Tour",
    description: "Walk the rainforest trails with a local guide and see the falls from the most dramatic viewpoints.",
    price: 65,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
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
    <div>
      <section className="relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden sm:min-h-[calc(100vh-80px)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/delighttoursandtravel.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2023/11/13/188290-886761768_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary-dark/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-accent-light sm:mb-5 sm:text-sm sm:tracking-[0.28em]">Victoria Falls experiences</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
              Travel simply, beautifully, and with people who know the place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
              Minimal fuss, thoughtful planning, and guided tours across Victoria Falls, the Zambezi, Chobe, and beyond.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link
                href="/tours"
                className="inline-flex items-center justify-center rounded-md bg-cta px-7 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-cta-hover"
              >
                Explore Tours
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/70 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-primary-dark"
              >
                Plan a Trip
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-5 text-white/85 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 lg:grid-cols-1">
            {[
              ["4.8/5", "Guest rating"],
              ["1,200+", "Happy travelers"],
              ["24h", "Fast confirmations"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-white sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs leading-4 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3">
          {[
            ["Local planning", "Routes, transfers, timings, and special requests handled with practical local knowledge."],
            ["Trusted partners", "Book confidently across Bokun, Viator, GetYourGuide, and Tripadvisor-ready workflows."],
            ["Clean experience", "Clear prices, fast communication, and no clutter between you and the trip."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-base font-bold text-primary-dark">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-left sm:text-sm">Connected platforms</p>
          <PlatformIcons />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Featured tours</p>
            <h2 className="max-w-2xl text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Small, polished experiences around the Falls.</h2>
          </div>
          <Link href="/tours" className="text-sm font-bold text-primary transition-colors hover:text-cta">
            View all tours
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Why Delight</p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Professional travel support without making the page feel busy.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Handpicked activities around Victoria Falls",
              "Simple booking and clear communication",
              "Guest-first service before and after the tour",
              "Flexible support for couples, families, and groups",
            ].map((item) => (
              <div key={item} className="rounded-md border border-border bg-white p-5 text-sm font-semibold text-foreground/75 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 md:py-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Ready when you are</p>
        <h2 className="mx-auto max-w-2xl text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Let us shape a clean, memorable itinerary for your next trip.
        </h2>
        <Link
          href="/booking"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-cta px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
        >
          Start Booking
        </Link>
      </section>
    </div>
  );
}
