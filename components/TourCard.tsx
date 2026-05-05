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
    <div className="group overflow-hidden rounded-md border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-accent-cream">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary text-white">
            <span className="text-sm font-bold uppercase tracking-[0.2em]">Delight Tours</span>
          </div>
        )}
        {tour.category && (
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
            {tour.category}
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-lg font-bold leading-snug text-foreground">{tour.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-foreground/65">{tour.description}</p>

        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <span>{tour.duration}</span>
          {tour.rating && (
            <span className="flex items-center gap-1">
              {tour.rating} / 5 ({tour.reviewCount ?? 0})
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xl font-bold text-primary">${tour.price}</span>
          <Link
            href={`/booking?tourId=${tour.id}`}
            className="rounded-md bg-cta px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
