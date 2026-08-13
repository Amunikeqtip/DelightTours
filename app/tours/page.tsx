import Image from "next/image";
import { BokunWidget } from "@/components/PartnerWidgets";
import { PayPalHostedButton } from "@/components/PayPalButton";

export default function ToursPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
        <Image
          src="/tours/zambezi-sunset-cruise.jpg"
          alt="Zambezi sunset cruise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, color-mix(in srgb, #0d1210 92%, transparent) 0%, color-mix(in srgb, #0d1210 72%, transparent) 52%, color-mix(in srgb, #0d1210 42%, transparent) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-light sm:text-sm">Tours & activities</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">Curated Victoria Falls experiences</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">Clean booking, trusted guides, and thoughtfully selected tours around Victoria Falls, the Zambezi, Chobe, and town.</p>
        </div>
      </section>

      <section className="bg-accent-cream px-4 py-10 text-foreground sm:px-6 md:py-14">
        <div className="mx-auto max-w-7xl">
          <BokunWidget />
        </div>
      </section>

      <section className="bg-background px-4 py-12 text-foreground sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-accent-light">Also accept PayPal</p>
          <h2 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl">Prefer to pay with PayPal?</h2>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-foreground/60">
            Alongside Bokun checkout above, you can use our Safari Experience PayPal quick-pay (stacked buttons, QR code, or payment link). For a custom multi-service total, use Pay with PayPal on the booking page.
          </p>
          <PayPalHostedButton />
        </div>
      </section>
    </div>
  );
}
