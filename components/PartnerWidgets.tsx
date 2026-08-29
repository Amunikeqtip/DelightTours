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

const BOKUN_BOOKING_CHANNEL_UUID = "bc5131c1-3cee-4ff1-a7d7-248d1afa0909";
const BOKUN_PRODUCT_LIST_ID = "109041";

function buildBokunWidgetDataSrc(bookingChannelUuid: string, productListId: string) {
  return `https://widgets.bokun.io/online-sales/${bookingChannelUuid}/product-list/${productListId}`;
}

export function BokunWidget() {
  const bookingChannelUuid = process.env.NEXT_PUBLIC_BOKUN_BOOKING_CHANNEL_UUID || BOKUN_BOOKING_CHANNEL_UUID;
  const productListId = process.env.NEXT_PUBLIC_BOKUN_PRODUCT_LIST_ID || BOKUN_PRODUCT_LIST_ID;
  const configuredDataSrc = process.env.NEXT_PUBLIC_BOKUN_WIDGET_DATA_SRC;

  // Bókun aborts rendering when the loader and the widget reference different booking
  // channels, so a data-src pointing at another channel is discarded rather than trusted.
  const widgetDataSrc =
    configuredDataSrc && configuredDataSrc.includes(bookingChannelUuid)
      ? configuredDataSrc
      : buildBokunWidgetDataSrc(bookingChannelUuid, productListId);

  const loaderSrc = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${encodeURIComponent(bookingChannelUuid)}`;

  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <Script id="bokun-widget-loader" src={loaderSrc} strategy="afterInteractive" />
      <div className="bokunWidget" data-src={widgetDataSrc} />
      <noscript>Please enable javascript in your browser to book</noscript>
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
