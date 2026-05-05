import { NextRequest, NextResponse } from "next/server";

const BOKUN_API_KEY = process.env.BOKUN_API_KEY;
const BOKUN_SECRET = process.env.BOKUN_SECRET;
const BOKUN_BASE_URL = process.env.BOKUN_BASE_URL || "https://api.bokun.io";

// Fetch tours/products from Bókun
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "tours";

  try {
    switch (action) {
      case "tours": {
        // GET /activity.json?lang=en&currency=USD
        const res = await fetch(
          `${BOKUN_BASE_URL}/activity.json?lang=en&currency=USD`,
          {
            headers: {
              "X-Bokun-ApiKey": BOKUN_API_KEY || "",
              "X-Bokun-Secret": BOKUN_SECRET || "",
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
          }
        );
        if (!res.ok) throw new Error("Bókun API error");
        const data = await res.json();
        return NextResponse.json({ tours: data });
      }

      case "availability": {
        const productId = searchParams.get("productId");
        const date = searchParams.get("date");
        // POST /activity.json/availability
        const res = await fetch(
          `${BOKUN_BASE_URL}/activity.json/availability`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Bokun-ApiKey": BOKUN_API_KEY || "",
              "X-Bokun-Secret": BOKUN_SECRET || "",
            },
            body: JSON.stringify({ productId, date }),
          }
        );
        if (!res.ok) throw new Error("Availability check failed");
        const data = await res.json();
        return NextResponse.json({ availability: data });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Bókun API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Bókun API" },
      { status: 500 }
    );
  }
}

// Create booking via Bókun
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, date, guests, customer } = body;

    const res = await fetch(`${BOKUN_BASE_URL}/booking.json/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Bokun-ApiKey": BOKUN_API_KEY || "",
        "X-Bokun-Secret": BOKUN_SECRET || "",
      },
      body: JSON.stringify({
        productId,
        startTime: date,
        participants: guests,
        customer,
      }),
    });

    if (!res.ok) throw new Error("Booking creation failed");
    const data = await res.json();
    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error("Bókun booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
