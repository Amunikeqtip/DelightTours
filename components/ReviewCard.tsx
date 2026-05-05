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
    <div className="bg-white rounded-xl border border-border p-6 space-y-3">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image src={review.avatar} alt={review.author} width={40} height={40} className="rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-primary font-semibold">
            {review.author.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
          <p className="text-xs text-foreground/50">{review.date}</p>
        </div>
      </div>

      <div className="text-amber-500 text-sm">
        {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
      </div>

      <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4">{review.content}</p>
    </div>
  );
}
