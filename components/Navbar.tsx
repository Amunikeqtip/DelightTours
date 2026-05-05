"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours & Activities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="soft-animated-surface sticky top-0 z-50 border-b border-border shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center" aria-label="Delight Tours & Travel home">
          <Image
            src="/delighttoursandtravel.png"
            alt="Delight Tours & Travel"
            width={180}
            height={64}
            className="h-11 w-auto max-w-[170px] shrink-0 object-contain object-left sm:h-14 sm:max-w-none"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              className="inline-block rounded-md bg-cta px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-cta-hover"
            >
              Book Now
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-border bg-white/70 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <ul className="space-y-1 border-t border-border bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-foreground/75 transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-md bg-cta px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-cta-hover"
            >
              Book Now
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
