import { serviceOptions, type ServiceOption } from "@/lib/serviceOptions";

export type PayPalBookingInput = {
  serviceIds: string[];
  guests: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export type BookingQuote = {
  services: ServiceOption[];
  guests: number;
  perGuestTotal: number;
  total: number;
  currency: "USD";
  description: string;
};

type PayPalTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

function getPayPalCredentials() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();
  const apiBase = (process.env.PAYPAL_API_BASE?.trim() || "https://api-m.sandbox.paypal.com").replace(/\/$/, "");

  if (!clientId || !clientSecret) {
    throw new Error("PayPal REST credentials are missing. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.");
  }

  return { clientId, clientSecret, apiBase };
}

export function buildBookingQuote(serviceIds: string[], guests: number): BookingQuote {
  const uniqueIds = [...new Set(serviceIds.map((id) => id.trim()).filter(Boolean))];
  const services = uniqueIds
    .map((id) => serviceOptions.find((service) => service.id === id))
    .filter((service): service is ServiceOption => Boolean(service));

  if (services.length === 0) {
    throw new Error("Select at least one valid service.");
  }

  const safeGuests = Number.isFinite(guests) ? Math.min(Math.max(Math.trunc(guests), 1), 20) : 1;
  const perGuestTotal = services.reduce((sum, service) => sum + service.price, 0);
  const total = perGuestTotal * safeGuests;
  const description = `${services.map((service) => service.title).join(", ")} × ${safeGuests} guest${safeGuests === 1 ? "" : "s"}`;

  return {
    services,
    guests: safeGuests,
    perGuestTotal,
    total,
    currency: "USD",
    description: description.slice(0, 127),
  };
}

export function formatMoney(amount: number) {
  return amount.toFixed(2);
}

async function getAccessToken() {
  const { clientId, clientSecret, apiBase } = getPayPalCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = (await response.json()) as PayPalTokenResponse;
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Unable to authenticate with PayPal.");
  }

  return { accessToken: data.access_token, apiBase };
}

export async function paypalRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { accessToken, apiBase } = await getAccessToken();
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    details?: Array<{ description?: string }>;
  };

  if (!response.ok) {
    const detail = data.details?.[0]?.description || data.message || `PayPal request failed (${response.status})`;
    throw new Error(detail);
  }

  return data;
}

export async function createPayPalOrder(input: PayPalBookingInput) {
  const quote = buildBookingQuote(input.serviceIds, input.guests);
  const customId = `dt-${Date.now().toString(36)}`.slice(0, 127);

  const order = await paypalRequest<{ id: string; status?: string }>("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: customId,
          description: quote.description,
          amount: {
            currency_code: quote.currency,
            value: formatMoney(quote.total),
            breakdown: {
              item_total: {
                currency_code: quote.currency,
                value: formatMoney(quote.total),
              },
            },
          },
          items: quote.services.map((service) => ({
            name: service.title.slice(0, 127),
            quantity: String(quote.guests),
            unit_amount: {
              currency_code: quote.currency,
              value: formatMoney(service.price),
            },
            category: "DIGITAL_GOODS",
          })),
        },
      ],
      application_context: {
        brand_name: "Delight Tours & Travel",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
      },
    }),
  });

  return { orderId: order.id, quote, customId };
}

export async function capturePayPalOrder(orderId: string) {
  const capture = await paypalRequest<{
    id: string;
    status?: string;
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{
          id?: string;
          status?: string;
          amount?: { value?: string; currency_code?: string };
        }>;
      };
    }>;
  }>(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  const payment = capture.purchase_units?.[0]?.payments?.captures?.[0];

  return {
    orderId: capture.id,
    status: capture.status ?? payment?.status ?? "UNKNOWN",
    transactionId: payment?.id ?? capture.id,
    amount: payment?.amount?.value ?? null,
    currency: payment?.amount?.currency_code ?? "USD",
  };
}
