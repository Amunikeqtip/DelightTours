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
  showPaymentLink?: boolean;
  showQrCode?: boolean;
};

export function PayPalHostedButton({
  className,
  showPaymentLink = true,
  showQrCode = true,
}: PayPalHostedButtonProps) {
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
        <div className="min-w-0">
          <div id={containerId} />

          {showPaymentLink && (
            <div className="mt-4 border-t border-border pt-4">
              {renderError ? (
                <>
                  <p className="mb-3 text-sm text-foreground/60">
                    The PayPal button could not load. You can still pay with the secure link below.
                  </p>
                  <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#0070ba] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005ea6] sm:w-auto"
                  >
                    Pay with PayPal
                  </a>
                </>
              ) : (
                <p className="text-sm text-foreground/55">
                  Prefer a direct link?{" "}
                  <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Open PayPal payment page
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        {showQrCode && (
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex w-full max-w-[220px] flex-col items-center rounded-md border border-border bg-white p-3 text-center transition-opacity hover:opacity-90"
            aria-label="Scan QR code to pay with PayPal for Safari Experience"
          >
            <Image
              src={PAYPAL_QR_IMAGE_SRC}
              alt="PayPal QR code for Safari Experience"
              width={196}
              height={220}
              className="h-auto w-full object-contain"
              priority={false}
            />
            <span className="mt-2 text-xs font-semibold text-foreground/55">Scan to pay on mobile</span>
          </a>
        )}
      </div>
    </div>
  );
}
