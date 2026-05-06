"use client";

import { useState } from "react";
import TourCard, { Tour } from "@/components/TourCard";

const allTours: Tour[] = [
  { id: "1", title: "Victoria Falls Guided Tour", description: "Walk the rainforest trails with a local guide and see the falls from the most dramatic viewpoints.", price: 65, duration: "3 hours", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80", rating: 4.8, reviewCount: 324, category: "Sightseeing" },
  { id: "2", title: "Zambezi Sunset Cruise", description: "Settle into an easy evening on the river with golden light, wildlife sightings, and refreshments on board.", price: 85, duration: "2.5 hours", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80", rating: 4.9, reviewCount: 218, category: "River" },
  { id: "3", title: "Chobe Day Safari", description: "Cross into Botswana for a full-day safari experience with game drives, river viewing, and lunch included.", price: 175, duration: "10 hours", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80", rating: 4.7, reviewCount: 156, category: "Safari" },
  { id: "4", title: "Falls Helicopter Flight", description: "Take in the Batoka Gorge and Victoria Falls from above on a short scenic flight.", price: 160, duration: "15 mins", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1200&q=80", rating: 4.9, reviewCount: 189, category: "Adventure" },
  { id: "5", title: "Village & Market Visit", description: "Spend time with local hosts, browse craft markets, and learn the everyday stories behind the destination.", price: 45, duration: "4 hours", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80", rating: 4.5, reviewCount: 412, category: "Culture" },
  { id: "6", title: "Boma Dinner Experience", description: "Enjoy an evening of regional food, live music, and warm hospitality after a day of exploring.", price: 70, duration: "3 hours", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80", rating: 4.8, reviewCount: 267, category: "Culture" },
  { id: "7", title: "Zambezi Canoe Trail", description: "A guided river paddle for adventurous travelers, with wildlife viewing from a quieter angle.", price: 115, duration: "5 hours", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", rating: 4.6, reviewCount: 98, category: "Adventure" },
  { id: "8", title: "Private Airport Transfer", description: "A smooth arrival or departure with a private driver and clear communication from booking to drop-off.", price: 25, duration: "30 mins", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80", rating: 4.7, reviewCount: 301, category: "Transfers" },
];

const categories = ["All", "Sightseeing", "River", "Safari", "Adventure", "Culture", "Transfers"];
const durations = ["All", "Under 3h", "3-5h", "5h+"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50-$100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: Infinity },
];

export default function ToursPage() {
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const filtered = allTours.filter((tour) => {
    if (category !== "All" && tour.category !== category) return false;
    if (duration !== "All") {
      const hours = parseInt(tour.duration);
      if (duration === "Under 3h" && hours >= 3) return false;
      if (duration === "3-5h" && (hours < 3 || hours > 5)) return false;
      if (duration === "5h+" && hours <= 5) return false;
    }
    const selected = priceRanges.find((r) => r.label === priceRange);
    if (selected && (tour.price < selected.min || tour.price >= selected.max)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Tours & activities</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Curated Victoria Falls experiences</h1>
        <p className="max-w-2xl text-foreground/65">Clean booking, trusted guides, and thoughtfully selected tours around Victoria Falls, the Zambezi, Chobe, and town.</p>
      </div>

      <div className="mb-8 space-y-4 rounded-md border border-border bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {durations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {priceRanges.map((r) => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-foreground/50">{filtered.length} tour{filtered.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Tour Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-foreground/50">
          <p className="text-lg">No tours match your filters.</p>
          <button
            onClick={() => { setCategory("All"); setDuration("All"); setPriceRange("All"); }}
            className="mt-4 text-primary font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
