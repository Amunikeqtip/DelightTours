import { NextRequest, NextResponse } from "next/server";

const TA_API_KEY = process.env.TRIPADVISOR_API_KEY;
const TA_BASE_URL = process.env.TRIPADVISOR_BASE_URL || "https://api.tripadvisor.com";

// Fetch verified reviews, ratings, and badges from Tripadvisor
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  const action = searchParams.get("action") || "reviews";

  if (!locationId) {
    return NextResponse.json({ error: "locationId required" }, { status: 400 });
  }

  try {
    switch (action) {
      case "reviews": {
        const res = await fetch(
          `${TA_BASE_URL}/api/v1/location/${locationId}/reviews?language=en`,
          {
            headers: {
              "X-TripAdvisor-API-Key": TA_API_KEY || "",
              "Accept": "application/json",
            },
            next: { revalidate: 1800 }, // Cache for 30 minutes
          }
        );
        if (!res.ok) throw new Error("Tripadvisor API error");
        const data = await res.json();
        return NextResponse.json({ reviews: data });
      }

      case "details": {
        const res = await fetch(
          `${TA_BASE_URL}/api/v1/location/${locationId}/details?language=en`,
          {
            headers: {
              "X-TripAdvisor-API-Key": TA_API_KEY || "",
              "Accept": "application/json",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) throw new Error("Tripadvisor details error");
        const data = await res.json();
        return NextResponse.json({ details: data });
      }

      case "badges": {
        const res = await fetch(
          `${TA_BASE_URL}/api/v1/location/${locationId}/badges`,
          {
            headers: {
              "X-TripAdvisor-API-Key": TA_API_KEY || "",
              "Accept": "application/json",
            },
            next: { revalidate: 86400 }, // Cache for 24 hours
          }
        );
        if (!res.ok) throw new Error("Tripadvisor badges error");
        const data = await res.json();
        return NextResponse.json({ badges: data });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Tripadvisor API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Tripadvisor API" },
      { status: 500 }
    );
  }
}
