"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours & Activities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-muted/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between overflow-hidden">
        <Link href="/" className="flex items-center flex-shrink-0 min-w-0">
          <Image
            src="/delighttoursandtravel.png"
            alt="Delight Tours & Travel"
            width={140}
            height={35}
            className="h-8 sm:h-10 w-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              className="inline-block bg-primary text-white text-sm font-semibold px-4 lg:px-5 py-2 rounded-full hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
