import Image from "next/image";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  avatar?: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-3 rounded-md border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image src={review.avatar} alt={review.author} width={40} height={40} className="rounded-full" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light font-semibold text-primary">
            {review.author.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
          <p className="text-xs text-foreground/50">{review.date}</p>
        </div>
      </div>

      <div className="text-sm text-accent">
        {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
      </div>

      <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4">{review.content}</p>
    </div>
  );
}
