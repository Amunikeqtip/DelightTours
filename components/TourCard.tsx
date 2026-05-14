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
    <div className="group overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-accent-cream sm:aspect-[16/11]">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-accent">
            <span className="text-4xl">Image coming soon</span>
          </div>
        )}

        {tour.category && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
            {tour.category}
          </span>
        )}

        <div
          className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10"
          style={{
            background: "linear-gradient(to top, color-mix(in srgb, var(--color-background) 80%, transparent), color-mix(in srgb, var(--color-background) 35%, transparent) 50%, transparent)",
          }}
        >
          <div className="inline-flex max-w-full items-center gap-2 rounded-md bg-background/95 px-3 py-2 text-xs font-bold text-primary-dark shadow-sm backdrop-blur">
            <Image
              src="/platforms/tripadvisor.svg"
              alt="Tripadvisor"
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain"
            />
            <span className="text-accent" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <span className="whitespace-nowrap">
              {tour.rating?.toFixed(1) ?? "4.8"} ({tour.reviewCount ?? 324})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold leading-snug text-foreground">{tour.title}</h3>
        <p className="line-clamp-2 text-sm text-foreground/60">{tour.description}</p>

        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <span>{tour.duration}</span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xl font-bold text-primary">${tour.price}</span>
          <Link
            href={`/booking?tourId=${tour.id}`}
            className="rounded-full bg-cta px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
