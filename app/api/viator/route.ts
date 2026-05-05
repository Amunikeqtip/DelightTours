import { NextRequest, NextResponse } from "next/server";

const VIATOR_API_KEY = process.env.VIATOR_API_KEY;
const VIATOR_BASE_URL = process.env.VIATOR_BASE_URL || "https://api.viator.com";

// Fetch tour details, reviews, highlights from Viator
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const action = searchParams.get("action") || "details";

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  try {
    switch (action) {
      case "details": {
        const res = await fetch(
          `${VIATOR_BASE_URL}/products/${productId}`,
          {
            headers: {
              "Accept": "application/json",
              "Expedia-API-Key": VIATOR_API_KEY || "",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) throw new Error("Viator API error");
        const data = await res.json();
        return NextResponse.json({ product: data });
      }

      case "reviews": {
        const res = await fetch(
          `${VIATOR_BASE_URL}/products/${productId}/reviews`,
          {
            headers: {
              "Accept": "application/json",
              "Expedia-API-Key": VIATOR_API_KEY || "",
            },
            next: { revalidate: 3600 },
          }
        );
        if (!res.ok) throw new Error("Viator reviews error");
        const data = await res.json();
        return NextResponse.json({ reviews: data });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Viator API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Viator API" },
      { status: 500 }
    );
  }
}
