"use client";

import Script from "next/script";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { serviceOptions } from "@/lib/serviceOptions";

type CheckoutForm = {
  serviceIds: string[];
  date: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type CaptureResult = {
  transactionId: string;
  amount: string;
  currency: string;
  services: Array<{ id: string; title: string; price: number }>;
  guests: number;
  date: string;
  name: string;
  email: string;
};

const emptyForm: CheckoutForm = {
  serviceIds: [],
  date: "",
  guests: "1",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function PayPalCheckout({ initialServiceId }: { initialServiceId?: string | null }) {
  const [form, setForm] = useState<CheckoutForm>(() => ({
    ...emptyForm,
    serviceIds: initialServiceId && serviceOptions.some((s) => s.id === initialServiceId) ? [initialServiceId] : [],
  }));
  const [sdkReady, setSdkReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState<CaptureResult | null>(null);
  const buttonsRendered = useRef(false);
  const formRef = useRef(form);
  const reactId = useId().replace(/:/g, "");
  const containerId = `paypal-smart-buttons-${reactId}`;

  formRef.current = form;

  const selectedServices = useMemo(
    () => serviceOptions.filter((service) => form.serviceIds.includes(service.id)),
    [form.serviceIds],
  );
  const guests = Math.max(1, Number.parseInt(form.guests || "1", 10) || 1);
  const perGuestTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const total = perGuestTotal * guests;

  const formValid =
    selectedServices.length > 0 &&
    Boolean(form.date) &&
    Boolean(form.name.trim()) &&
    isValidEmail(form.email) &&
    Boolean(form.phone.trim()) &&
    total > 0;

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  const sdkSrc = clientId
    ? `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons`
    : null;

  function toggleService(serviceId: string) {
    setForm((prev) => {
      const exists = prev.serviceIds.includes(serviceId);
      return {
        ...prev,
        serviceIds: exists ? prev.serviceIds.filter((id) => id !== serviceId) : [...prev.serviceIds, serviceId],
      };
    });
    setError(null);
  }

  useEffect(() => {
    if (!clientId || !sdkReady || !window.paypal || !formValid || paid || buttonsRendered.current) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    buttonsRendered.current = true;

    const buttons = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },
      onClick: async (_data, actions) => {
        const current = formRef.current;
        const selected = serviceOptions.filter((service) => current.serviceIds.includes(service.id));
        const ok =
          selected.length > 0 &&
          Boolean(current.date) &&
          Boolean(current.name.trim()) &&
          isValidEmail(current.email) &&
          Boolean(current.phone.trim());

        if (!ok) {
          setError("Select services and complete your details before paying.");
          return actions.reject();
        }

        setError(null);
        return actions.resolve();
      },
      createOrder: async () => {
        setBusy(true);
        setError(null);
        const current = formRef.current;
        const response = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceIds: current.serviceIds,
            guests: current.guests,
            date: current.date,
            name: current.name,
            email: current.email,
            phone: current.phone,
            notes: current.notes,
          }),
        });
        const data = (await response.json()) as { orderId?: string; error?: string; detail?: string };
        if (!response.ok || !data.orderId) {
          setBusy(false);
          throw new Error(data.detail || data.error || "Unable to start PayPal checkout.");
        }
        return data.orderId;
      },
      onApprove: async (data) => {
        try {
          const current = formRef.current;
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              serviceIds: current.serviceIds,
              guests: current.guests,
              date: current.date,
              name: current.name,
              email: current.email,
              phone: current.phone,
              notes: current.notes,
            }),
          });
          const result = (await response.json()) as CaptureResult & { ok?: boolean; error?: string; detail?: string };
          if (!response.ok || !result.ok) {
            throw new Error(result.detail || result.error || "Payment capture failed.");
          }
          setPaid({
            transactionId: result.transactionId,
            amount: result.amount,
            currency: result.currency,
            services: result.services,
            guests: result.guests,
            date: result.date,
            name: result.name,
            email: result.email,
          });
        } finally {
          setBusy(false);
        }
      },
      onCancel: () => {
        setBusy(false);
        setError("Payment was cancelled. You can try again when ready.");
      },
      onError: (err) => {
        console.error(err);
        setBusy(false);
        setError(err instanceof Error ? err.message : "PayPal checkout failed. Please try again.");
        buttonsRendered.current = false;
      },
    });

    void buttons.render(`#${containerId}`).catch((err: unknown) => {
      console.error(err);
      buttonsRendered.current = false;
      setError("Unable to load PayPal buttons.");
    });

    return () => {
      buttonsRendered.current = false;
      void buttons.close?.();
      if (container) container.innerHTML = "";
    };
  }, [clientId, sdkReady, formValid, paid, containerId]);

  // Re-render buttons when form becomes valid after being invalid
  useEffect(() => {
    if (!formValid) {
      buttonsRendered.current = false;
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = "";
    }
  }, [formValid, containerId]);

  if (paid) {
    return (
      <div className="rounded-lg border border-border bg-background p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-primary-dark">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-foreground">Payment received</h3>
        <p className="mt-3 text-sm leading-6 text-foreground/60">
          Thank you, {paid.name}. We charged{" "}
          <strong>
            {paid.currency} {paid.amount}
          </strong>{" "}
          via PayPal for your selected services. A confirmation was sent to <strong>{paid.email}</strong>.
        </p>
        <div className="mx-auto mt-6 max-w-md space-y-2 rounded-md border border-border bg-background/10 p-4 text-left text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-foreground/50">Services</span>
            <span className="text-right font-semibold text-foreground">
              {paid.services.map((service) => service.title).join(", ")}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/50">Date</span>
            <span className="font-semibold text-foreground">{paid.date}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/50">Guests</span>
            <span className="font-semibold text-foreground">{paid.guests}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-2">
            <span className="text-foreground/50">Transaction</span>
            <span className="font-semibold text-foreground">{paid.transactionId}</span>
          </div>
        </div>
        <p className="mt-5 text-xs leading-5 text-foreground/45">
          Our team will confirm timing and meeting details. Catalog prices were used for this payment; final scheduling is confirmed by Delight Tours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm sm:p-6">
      {sdkSrc && (
        <Script
          id="paypal-smart-buttons-sdk"
          src={sdkSrc}
          strategy="afterInteractive"
          onLoad={() => setSdkReady(true)}
          onError={() => setError("Unable to load the PayPal SDK.")}
        />
      )}

      {!clientId && (
        <p className="mb-4 rounded-md border border-border bg-background/10 px-3 py-2 text-sm leading-6 text-foreground/70">
          PayPal Smart Buttons need a <strong>REST app</strong> Client ID in <code>.env.local</code> as{" "}
          <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>, plus <code>PAYPAL_CLIENT_SECRET</code>. The Safari Experience{" "}
          <code>BAA…</code> hosted-button id is different and only powers the fixed checkout on Tours — it will not
          show dynamic Pay buttons here. Create an app at{" "}
          <a
            href="https://developer.paypal.com/dashboard/applications"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            developer.paypal.com
          </a>
          , paste the credentials, then restart <code>npm run dev</code>.
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div>
            <h3 className="mb-3 text-base font-semibold text-foreground">Select services</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceOptions.map((service) => {
                const checked = form.serviceIds.includes(service.id);
                return (
                  <label
                    key={service.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-3 text-sm transition-colors ${
                      checked ? "border-accent bg-accent/10" : "border-border bg-background/10 hover:bg-background/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.id)}
                      className="mt-1"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">{service.title}</span>
                      <span className="mt-1 block text-foreground/50">
                        {service.category} · ${service.price} / person
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Preferred date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Guests</label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="mb-4 text-base font-semibold text-foreground">Your details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-semibold text-foreground">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+263 00 000 0000"
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-semibold text-foreground">Special requests</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Dietary requirements, accessibility needs, group details, etc."
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>
        </div>

        <div className="h-fit space-y-4 rounded-lg border border-border bg-background/10 p-4 sm:p-5">
          <h3 className="text-base font-semibold text-foreground">Payment summary</h3>
          {selectedServices.length ? (
            <div className="space-y-3 text-sm">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between gap-3">
                  <span className="text-foreground/70">{service.title}</span>
                  <span className="text-foreground">${service.price}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-foreground/50">Per person</span>
                <span className="text-foreground">${perGuestTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Guests</span>
                <span className="text-foreground">{guests}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-semibold text-foreground">Total due</span>
                <span className="text-lg font-bold text-accent">${total}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground/50">Select one or more services to see your total.</p>
          )}

          <p className="text-xs leading-5 text-foreground/40">
            Total is calculated from our catalog prices. Complete your details to enable PayPal. Final timing is confirmed by our team after payment.
          </p>

          {error && <p className="rounded-md border border-red-300/40 bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p>}

          {busy && <p className="text-sm text-foreground/55">Processing PayPal payment…</p>}

          {!formValid ? (
            <p className="rounded-md border border-border bg-background px-3 py-3 text-sm text-foreground/55">
              Select services and fill name, email, phone, and date to unlock PayPal checkout.
            </p>
          ) : (
            <div id={containerId} className="min-h-[48px]" />
          )}
        </div>
      </div>
    </div>
  );
}
