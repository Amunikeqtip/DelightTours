"use client";

import { useState } from "react";
import TourCard, { Tour } from "@/components/TourCard";

const allTours: Tour[] = [
  { id: "1", title: "Golden Circle Day Tour", description: "Explore Iceland's most iconic sights including Gullfoss waterfall, Geysir geothermal area, and Þingvellir National Park.", price: 129, duration: "8 hours", rating: 4.8, reviewCount: 324, category: "Sightseeing" },
  { id: "2", title: "Northern Lights Expedition", description: "Witness the magical Aurora Borealis on this guided night tour with hot cocoa and professional photography.", price: 89, duration: "4 hours", rating: 4.9, reviewCount: 218, category: "Adventure" },
  { id: "3", title: "Coastal Food & Wine Walk", description: "Savor local flavors on a guided walking tour through the historic coastal district with 6 tasting stops.", price: 75, duration: "3 hours", rating: 4.7, reviewCount: 156, category: "Culinary" },
  { id: "4", title: "Glacier Hiking Experience", description: "Scale the majestic glaciers of Vatnajökull with expert guides and all equipment provided.", price: 159, duration: "6 hours", rating: 4.9, reviewCount: 189, category: "Adventure" },
  { id: "5", title: "City Highlights Bus Tour", description: "Comprehensive city tour covering all major landmarks, museums, and hidden gems.", price: 49, duration: "4 hours", rating: 4.5, reviewCount: 412, category: "Sightseeing" },
  { id: "6", title: "Sunset Sailing Cruise", description: "Relax on a luxury catamaran with wine tasting and breathtaking sunset views over the harbor.", price: 95, duration: "2.5 hours", rating: 4.8, reviewCount: 267, category: "Culinary" },
  { id: "7", title: "Mountain Bike Trail", description: "Challenging mountain biking adventure through scenic forest trails and mountain paths.", price: 69, duration: "5 hours", rating: 4.6, reviewCount: 98, category: "Adventure" },
  { id: "8", title: "Historical Walking Tour", description: "Step back in time with a guided walk through the city's most historic neighborhoods and landmarks.", price: 35, duration: "2 hours", rating: 4.7, reviewCount: 301, category: "Sightseeing" },
];

const categories = ["All", "Sightseeing", "Adventure", "Culinary"];
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
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Tours & Activities</h1>
        <p className="text-foreground/60">Discover experiences powered by Bókun, Viator, and GetYourGuide.</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-5 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
