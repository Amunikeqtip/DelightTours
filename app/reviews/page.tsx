"use client";

import { useState } from "react";
import PlatformIcons from "@/components/PlatformIcons";
import ReviewCard, { Review } from "@/components/ReviewCard";

const reviews: Review[] = [
  { id: "1", author: "Sarah M.", rating: 5, title: "Absolutely magical experience!", content: "The Northern Lights tour exceeded all expectations. Our guide was knowledgeable and the photos turned out amazing. Highly recommend booking with Delight Tours!", date: "March 2026", avatar: "" },
  { id: "2", author: "James T.", rating: 5, title: "Best day of our trip", content: "The Golden Circle tour was perfectly paced with plenty of time at each stop. The bus was comfortable and our guide shared fascinating stories about Icelandic history.", date: "February 2026", avatar: "" },
  { id: "3", author: "Maria L.", rating: 4, title: "Great food tour", content: "Loved discovering local restaurants we never would have found on our own. The wine pairings were excellent. Only wish it was a bit longer!", date: "January 2026", avatar: "" },
  { id: "4", author: "David K.", rating: 5, title: "Glacier hike of a lifetime", content: "Challenging but so rewarding. The guides were safety-conscious and fun. The views from the top were absolutely breathtaking. Will definitely book again.", date: "December 2025", avatar: "" },
  { id: "5", author: "Emma R.", rating: 4, title: "Nice city overview", content: "Good introduction to the city. Our guide was friendly and informative. Great value for money and perfect if you're short on time.", date: "November 2025", avatar: "" },
  { id: "6", author: "Michael P.", rating: 5, title: "Sunset cruise perfection", content: "What a way to end our vacation! The crew was attentive, the wine was great, and the sunset was spectacular. Booking through Delight Tours was seamless.", date: "October 2025", avatar: "" },
];

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState<"rating" | "date">("rating");

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Reviews</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Guest feedback</h1>
        <p className="text-foreground/65">Verified reviews from Tripadvisor and our travelers.</p>
      </div>

      <div className="mb-8 flex flex-col items-center gap-6 rounded-md border border-border bg-white p-4 shadow-sm sm:flex-row sm:p-6">
        <div className="text-center">
          <p className="text-5xl font-bold text-primary">4.8</p>
          <div className="mt-1 text-xl text-accent">★ ★ ★ ★ ★</div>
          <p className="text-sm text-foreground/50 mt-1">Based on 1,200+ reviews</p>
        </div>
        <div className="grid w-full max-w-md flex-1 grid-cols-5 gap-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="contents">
              <span className="text-sm text-foreground/60 text-right">{star}★</span>
              <div className="col-span-3 my-auto h-3 rounded-full bg-accent-light">
                <div
                  className="h-3 rounded-full bg-primary"
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
                ? "bg-primary text-white"
                : "bg-accent-light text-foreground hover:bg-accent"
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
        <div className="inline-flex max-w-full items-center gap-3 rounded-md border border-border bg-white px-4 py-4 text-left shadow-sm sm:px-6">
          <PlatformIcons compact include={["Tripadvisor"]} />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Tripadvisor Recommended</p>
            <p className="text-xs text-foreground/50">Verified reviews powered by Tripadvisor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
