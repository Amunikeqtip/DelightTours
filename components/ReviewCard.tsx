export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  avatar: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="group rounded-xl border border-border bg-background/10 p-5 shadow-sm backdrop-blur transition-all hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-sm font-bold text-accent">
            {review.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{review.author}</p>
            <p className="text-xs text-foreground/45">{review.date}</p>
          </div>
        </div>
        <div className="text-accent text-sm tracking-wide">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
      </div>
      <h3 className="mt-4 text-base font-bold text-foreground">{review.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{review.content}</p>
    </div>
  );
}
