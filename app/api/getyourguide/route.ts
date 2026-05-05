import { NextRequest, NextResponse } from "next/server";

const GYG_API_KEY = process.env.GYG_API_KEY;
const GYG_BASE_URL = process.env.GYG_BASE_URL || "https://api.getyourguide.com";

// Fetch enrichment data: ratings, categories from GetYourGuide
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tourId = searchParams.get("tourId");
  const action = searchParams.get("action") || "details";

  if (!tourId) {
    return NextResponse.json({ error: "tourId required" }, { status: 400 });
  }

  try {
    switch (action) {
      case "details": {
        const res = await fetch(
          `${GYG_BASE_URL}/v2/tours/${tourId}`,
          {
            headers: {
              "Authorization": `Bearer ${GYG_API_KEY || ""}`,
              "Accept": "application/json",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) throw new Error("GetYourGuide API error");
        const data = await res.json();
        return NextResponse.json({ tour: data });
      }

      case "reviews": {
        const res = await fetch(
          `${GYG_BASE_URL}/v2/tours/${tourId}/reviews`,
          {
            headers: {
              "Authorization": `Bearer ${GYG_API_KEY || ""}`,
              "Accept": "application/json",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) throw new Error("GetYourGuide reviews error");
        const data = await res.json();
        return NextResponse.json({ reviews: data });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("GetYourGuide API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GetYourGuide API" },
      { status: 500 }
    );
  }
}
