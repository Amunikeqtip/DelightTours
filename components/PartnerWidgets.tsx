"use client";

import Image from "next/image";
import Script from "next/script";

type WidgetCardProps = {
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
};

function WidgetFallback({ title, description, logoSrc, logoAlt }: WidgetCardProps) {
  return (
    <div className="flex min-h-40 flex-col justify-between rounded-lg border border-border bg-background/10 p-5 text-foreground shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-background px-2 py-1">
          <Image src={logoSrc} alt={logoAlt} width={112} height={32} className="h-8 w-auto object-contain" />
        </span>
        <p className="text-sm font-bold text-foreground">{title}</p>
      </div>
      <p className="mt-5 text-sm leading-6 text-foreground/60">{description}</p>
    </div>
  );
}

export function BokunWidget() {
  const bookingChannelUuid = process.env.NEXT_PUBLIC_BOKUN_BOOKING_CHANNEL_UUID;
  const widgetDataSrc = process.env.NEXT_PUBLIC_BOKUN_WIDGET_DATA_SRC;

  if (!bookingChannelUuid || !widgetDataSrc) {
    return (
      <WidgetFallback
        title="Bokun booking"
        description="Live availability and checkout will appear here when the Bokun booking channel and widget URL are connected."
        logoSrc="/platforms/bokun.png"
        logoAlt="Bokun"
      />
    );
  }

  const loaderSrc = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${encodeURIComponent(
    bookingChannelUuid,
  )}`;

  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="bokunWidget" data-src={widgetDataSrc} />
      <Script id="bokun-widget-loader" src={loaderSrc} strategy="lazyOnload" />
    </div>
  );
}

export function TripadvisorWidget() {
  const widgetSrc = process.env.NEXT_PUBLIC_TRIPADVISOR_WIDGET_SRC;

  if (!widgetSrc) {
    return (
      <WidgetFallback
        title="Tripadvisor reviews"
        description="Verified Tripadvisor rating and review content will appear here when the Tripadvisor widget script URL is connected."
        logoSrc="/platforms/tripadvisor.svg"
        logoAlt="Tripadvisor"
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <div id="TA_selfserveprop_delight_tours" />
      <Script id="tripadvisor-widget" src={widgetSrc} strategy="lazyOnload" />
    </div>
  );
}
