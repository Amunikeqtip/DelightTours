"use client";

import { useState } from "react";
import Image from "next/image";
import PlatformIcons from "@/components/PlatformIcons";
import ReviewCard, { Review } from "@/components/ReviewCard";
import { TripadvisorWidget } from "@/components/PartnerWidgets";

const reviews: Review[] = [
  { id: "1", author: "Sarah M.", rating: 5, title: "Absolutely magical experience!", content: "The Victoria Falls tour exceeded all expectations. Our guide was knowledgeable and the whole day felt beautifully handled.", date: "March 2026", avatar: "" },
  { id: "2", author: "James T.", rating: 5, title: "Best day of our trip", content: "The rainforest walk was perfectly paced with enough time at every viewpoint. Smooth pickup and clear communication.", date: "February 2026", avatar: "" },
  { id: "3", author: "Maria L.", rating: 4, title: "Great local planning", content: "Loved having the details handled before we arrived. The team helped us choose the right tour for our schedule.", date: "January 2026", avatar: "" },
  { id: "4", author: "David K.", rating: 5, title: "Safari day was seamless", content: "Chobe was a full day, but everything ran on time. The guides were safety-conscious, warm, and very professional.", date: "December 2025", avatar: "" },
  { id: "5", author: "Emma R.", rating: 4, title: "Easy city overview", content: "Good introduction to Victoria Falls. Great value for money and perfect if you are short on time.", date: "November 2025", avatar: "" },
  { id: "6", author: "Michael P.", rating: 5, title: "Sunset cruise perfection", content: "What a way to end our vacation. The crew was attentive, the river was beautiful, and booking was seamless.", date: "October 2025", avatar: "" },
];

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState<"rating" | "date">("rating");

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
        <Image
          src="/tours/victoria-falls-guided-tour.jpg"
          alt="Victoria Falls rainforest trail"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 72%, transparent) 55%, color-mix(in srgb, #0d1210 42%, transparent) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-light sm:text-sm">Reviews</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Guest feedback with real booking context.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            Verified reviews from Tripadvisor and travelers who booked through our supported tour workflows.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-8 flex flex-col items-center gap-6 rounded-lg border border-border bg-background/10 p-4 shadow-sm backdrop-blur sm:flex-row sm:p-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">4.8</p>
            <div className="mt-1 text-xl text-accent">★★★★★</div>
            <p className="mt-1 text-sm text-foreground/50">Based on 1,200+ reviews</p>
          </div>
          <div className="grid w-full max-w-md flex-1 grid-cols-5 gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="contents">
                <span className="text-right text-sm text-foreground/60">{star}★</span>
                <div className="col-span-3 my-auto h-3 rounded-full bg-background/10">
                  <div
                    className="h-3 rounded-full bg-accent"
                    style={{ width: `${star === 5 ? 78 : star === 4 ? 18 : star === 3 ? 3 : 1}%` }}
                  />
                </div>
                <span className="text-sm text-foreground/50">{star === 5 ? 78 : star === 4 ? 18 : star === 3 ? 3 : 1}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="w-full text-sm font-semibold text-foreground sm:w-auto">Sort by:</span>
          {(["rating", "date"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                sortBy === option
                  ? "bg-cta text-white"
                  : "bg-background/10 text-foreground hover:bg-background/20"
              }`}
            >
              {option === "rating" ? "Highest Rating" : "Most Recent"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sorted.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex max-w-full items-center gap-3 rounded-lg border border-border bg-background/10 px-4 py-4 text-left shadow-sm backdrop-blur sm:px-6">
            <PlatformIcons compact include={["Tripadvisor"]} />
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Tripadvisor Recommended</p>
              <p className="text-xs text-foreground/50">Verified reviews powered by Tripadvisor</p>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-accent-light">Tripadvisor</p>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">Traveler rating widget</h2>
          </div>
          <TripadvisorWidget />
        </section>
      </section>
    </div>
  );
}
