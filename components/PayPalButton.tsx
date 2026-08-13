"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useId, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

const PAYPAL_CLIENT_ID =
  "BAAoxsWMeNs_YfCFJJrsvfm4cfeaVpgBjahdRG9yNdOK_HzhaeujjO5ZgR-Vvu0yWHyBrmT0ZH7-Qqxnqs";
const PAYPAL_HOSTED_BUTTON_ID = "LJ2JTZ2TM6E5E";

export const PAYPAL_PAYMENT_LINK = "https://www.paypal.com/ncp/payment/LJ2JTZ2TM6E5E";
const PAYPAL_QR_IMAGE_SRC = "/paypal-safari-experience-qr.png";

type PayPalHostedButtonProps = {
  className?: string;
};

function PaymentOption({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-lg border border-border bg-background/10 p-4 sm:p-5">
      <div className="mb-4 border-b border-border pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">{step}</p>
        <h3 className="mt-2 text-base font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-foreground/55">{description}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function PayPalHostedButton({ className }: PayPalHostedButtonProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID;
  const hostedButtonId = process.env.NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID || PAYPAL_HOSTED_BUTTON_ID;
  const paymentLink = process.env.NEXT_PUBLIC_PAYPAL_PAYMENT_LINK || PAYPAL_PAYMENT_LINK;
  const reactId = useId().replace(/:/g, "");
  const containerId = `paypal-container-${hostedButtonId}-${reactId}`;
  const [sdkReady, setSdkReady] = useState(false);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (!sdkReady || !window.paypal) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Avoid double-render in React Strict Mode / remounts
    if (container.childNodes.length > 0) return;

    let cancelled = false;

    Promise.resolve(window.paypal.HostedButtons({ hostedButtonId }).render(`#${containerId}`)).catch(() => {
      if (!cancelled) setRenderError(true);
    });

    return () => {
      cancelled = true;
    };
  }, [sdkReady, hostedButtonId, containerId]);

  const sdkSrc = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&components=hosted-buttons&disable-funding=venmo&currency=USD`;

  return (
    <div className={className ?? "rounded-lg border border-border bg-background p-4 shadow-sm sm:p-6"}>
      <Script id="paypal-hosted-buttons-sdk" src={sdkSrc} strategy="afterInteractive" onLoad={() => setSdkReady(true)} />

      <p className="mb-5 text-sm font-semibold text-foreground/70">Choose any PayPal option below — all three go to the same secure checkout.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
        <PaymentOption
          step="Option 1"
          title="Stacked buttons"
          description="Pay on this page with PayPal or card."
        >
          <div className="w-full min-h-[120px]">
            <div id={containerId} />
            {renderError && (
              <p className="mt-3 text-center text-sm text-foreground/55">
                Buttons failed to load. Use the QR code or payment link instead.
              </p>
            )}
          </div>
        </PaymentOption>

        <PaymentOption
          step="Option 2"
          title="QR code"
          description="Scan with your phone to open PayPal checkout."
        >
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-[200px] flex-col items-center transition-opacity hover:opacity-90"
            aria-label="Scan QR code to pay with PayPal for Safari Experience"
          >
            <Image
              src={PAYPAL_QR_IMAGE_SRC}
              alt="PayPal QR code for Safari Experience"
              width={196}
              height={220}
              className="h-auto w-full object-contain"
            />
            <span className="mt-3 text-xs font-semibold text-foreground/55">Scan to pay on mobile</span>
          </a>
        </PaymentOption>

        <PaymentOption
          step="Option 3"
          title="Payment link"
          description="Open the PayPal payment page in a new tab."
        >
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#0070ba] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005ea6]"
          >
            Open PayPal payment link
          </a>
          <p className="mt-3 break-all text-center text-xs leading-5 text-foreground/45">{paymentLink}</p>
        </PaymentOption>
      </div>
    </div>
  );
}
