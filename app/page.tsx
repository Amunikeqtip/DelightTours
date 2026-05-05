import Link from "next/link";
import Image from "next/image";
import TourCard, { Tour } from "@/components/TourCard";

const featuredTours: Tour[] = [
  {
    id: "1",
    title: "Golden Circle Day Tour",
    description: "Explore Iceland's most iconic sights including Gullfoss waterfall, Geysir geothermal area, and Þingvellir National Park.",
    price: 129,
    duration: "8 hours",
    image: "",
    rating: 4.8,
    reviewCount: 324,
    category: "Sightseeing",
  },
  {
    id: "2",
    title: "Northern Lights Expedition",
    description: "Witness the magical Aurora Borealis on this guided night tour with hot cocoa and professional photography.",
    price: 89,
    duration: "4 hours",
    image: "",
    rating: 4.9,
    reviewCount: 218,
    category: "Adventure",
  },
  {
    id: "3",
    title: "Coastal Food & Wine Walk",
    description: "Savor local flavors on a guided walking tour through the historic coastal district with 6 tasting stops.",
    price: 75,
    duration: "3 hours",
    image: "",
    rating: 4.7,
    reviewCount: 156,
    category: "Culinary",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <Image
            src="/delighttoursandtravel.png"
            alt="Delight Tours & Travel"
            width={320}
            height={80}
            className="h-20 w-auto mb-8"
            priority
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            Discover the World with
            <span className="text-primary"> Delight</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-8">
            Curated tours and unforgettable travel experiences, crafted with care and local expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tours"
              className="bg-cta text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-cta-hover transition-colors"
            >
              Explore Tours
            </Link>
            <Link
              href="/booking"
              className="bg-white text-primary border-2 border-primary text-base font-semibold px-8 py-3 rounded-full hover:bg-accent-cream transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Featured Tours</h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Handpicked experiences that showcase the best of every destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tours"
            className="inline-block bg-cta text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-cta-hover transition-colors"
          >
            View All Tours
          </Link>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-foreground/40 uppercase tracking-wider mb-6">
            Integrated with leading platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-foreground/50 text-lg font-semibold">
            <span>Bókun</span>
            <span>Viator</span>
            <span>GetYourGuide</span>
            <span>Tripadvisor</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-foreground/60 max-w-xl mx-auto mb-8">
          Book with confidence. Real-time availability, secure checkout, and instant confirmation.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-cta text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-cta-hover transition-colors"
        >
          Start Booking
        </Link>
      </section>
    </div>
  );
}
