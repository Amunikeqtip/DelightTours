"use client";

import { useState } from "react";
import ClientInquiryModal, { InquiryChannel } from "@/components/ClientInquiryModal";

export default function FloatingButtons() {
  const [activeChannel, setActiveChannel] = useState<InquiryChannel | null>(null);

  return (
    <>
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={() => setActiveChannel("whatsapp")}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors hover:shadow-xl"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.046 21.836c-1.91 0-3.783-.518-5.408-1.491l-.386-.231-3.988 1.047 1.065-3.884-.251-.398A9.852 9.852 0 0 1 2.196 12c0-5.449 4.432-9.88 9.902-9.88 2.647 0 5.133 1.032 7.002 2.9 1.869 1.869 2.898 4.354 2.898 6.996 0 5.449-4.431 9.88-9.902 9.88zm8.546-16.13c-1.661-1.66-3.87-2.576-6.22-2.576-4.844 0-8.782 3.938-8.782 8.782 0 1.585.427 3.18 1.235 4.555l.226.366-1.178 4.303 4.411-1.157.35.217a9.37 9.37 0 0 0 4.513 1.203h.233c4.844 0 8.782-3.939 8.782-8.782 0-2.35-.916-4.56-2.58-6.21z" />
          </svg>
        </button>

        {/* Email Button */}
        <button
          type="button"
          onClick={() => setActiveChannel("email")}
          className="w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg transition-colors hover:shadow-xl"
          aria-label="Email us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
        </button>
      </div>

      {activeChannel && (
        <ClientInquiryModal channel={activeChannel} onClose={() => setActiveChannel(null)} />
      )}
    </>
  );
}
