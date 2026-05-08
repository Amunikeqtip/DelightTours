import Link from "next/link";
import Image from "next/image";

export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
}

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-accent-cream overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-accent">
            <span className="text-4xl">🏝️</span>
          </div>
        )}
        {tour.category && (
          <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            {tour.category}
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-foreground text-lg leading-snug">{tour.title}</h3>
        <p className="text-sm text-foreground/60 line-clamp-2">{tour.description}</p>

        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <span>{tour.duration}</span>
          {tour.rating && (
            <span className="flex items-center gap-1">
              ⭐ {tour.rating} ({tour.reviewCount ?? 0})
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xl font-bold text-primary">${tour.price}</span>
          <Link
            href={`/booking?tourId=${tour.id}`}
            className="bg-cta text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-cta-hover transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
