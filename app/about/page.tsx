"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReviewCard, { Review } from "@/components/ReviewCard";

const reviews: Review[] = [
  { id: "1", author: "Sarah M.", rating: 5, title: "Absolutely magical experience!", content: "The Victoria Falls tour exceeded all expectations. Our guide was knowledgeable and the whole day felt beautifully handled.", date: "March 2026", avatar: "" },
  { id: "2", author: "James T.", rating: 5, title: "Best day of our trip", content: "The rainforest walk was perfectly paced with enough time at every viewpoint. Smooth pickup and clear communication.", date: "February 2026", avatar: "" },
  { id: "3", author: "Maria L.", rating: 4, title: "Great local planning", content: "Loved having the details handled before we arrived. The team helped us choose the right tour for our schedule.", date: "January 2026", avatar: "" },
  { id: "4", author: "David K.", rating: 5, title: "Safari day was seamless", content: "Chobe was a full day, but everything ran on time. The guides were safety-conscious, warm, and very professional.", date: "December 2025", avatar: "" },
  { id: "5", author: "Emma R.", rating: 4, title: "Easy city overview", content: "Good introduction to Victoria Falls. Great value for money and perfect if you are short on time.", date: "November 2025", avatar: "" },
  { id: "6", author: "Michael P.", rating: 5, title: "Sunset cruise perfection", content: "What a way to end our vacation. The crew was attentive, the river was beautiful, and booking was seamless.", date: "October 2025", avatar: "" },
];

export default function AboutPage() {
  const [sortBy, setSortBy] = useState<"rating" | "date">("rating");

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="bg-background text-foreground">

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
        <Image
          src="/tours/victoria-falls-guided-tour.jpg"
          alt="Rainforest path near Victoria Falls"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 72%, transparent) 55%, color-mix(in srgb, #0d1210 38%, transparent) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">About Delight</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Local travel, handled with care and clarity.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            A Victoria Falls travel team focused on clean communication, reliable partners, and experiences that feel personal without becoming complicated.
          </p>
        </div>
      </section>

      {/* Our Story / Mission / Vision */}
      <section className="border-y border-border bg-muted px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="rounded-lg border border-border bg-background/10 p-6 shadow-sm backdrop-blur sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/65">
              <p>
                Delight Tours &amp; Travel is built around simple, well-run experiences for guests visiting Victoria Falls
                and the surrounding region. We focus on clear planning, dependable operators, and warm support from inquiry to drop-off.
              </p>
              <p>
                We work with trusted booking workflows to bring guests familiar tools with local travel judgment behind them.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["Mission", "Create meaningful travel experiences that connect guests with place, culture, and local expertise."],
              ["Vision", "Become a trusted name for curated Victoria Falls travel, known for calm service and memorable moments."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-lg border border-border bg-background/10 p-6 shadow-sm backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-light">{title}</p>
                <p className="mt-3 text-sm leading-6 text-foreground/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-accent-cream px-4 py-14 text-foreground sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent">Values</p>
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">The service details that shape every trip.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Authenticity", desc: "Real experiences with local experts." },
              { title: "Excellence", desc: "Every detail handled with care." },
              { title: "Sustainability", desc: "Travel that respects people and place." },
              { title: "Transparency", desc: "Clear prices, honest reviews, no surprises." },
              { title: "Hospitality", desc: "Warm, responsive service at every step." },
              { title: "Modern tools", desc: "Simple booking powered by trusted platforms." },
            ].map((value) => (
              <div key={value.title} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                <h3 className="font-bold text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="bg-background px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">Reviews</p>
            <h2 className="max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
              Guest feedback with real booking context.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/60">
              From travelers who booked tours directly with our local team.
            </p>
          </div>

          {/* Rating summary */}
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

          {/* Sort controls */}
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

          {/* Review cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sorted.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background px-4 py-14 text-center sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-accent-light">Ready to explore?</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Let the local team shape the moving parts.</h2>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-md bg-cta px-8 py-3 text-base font-bold text-white transition-colors hover:bg-cta-hover"
          >
            Book Now
          </Link>
        </div>
      </section>

    </div>
  );
}
