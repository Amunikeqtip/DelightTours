"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours & Activities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { toggleTheme } = useTheme();

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
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-border rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              <Image
                src="/theme-toggle.png"
                alt="Toggle theme"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 ml-2 flex-shrink-0"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-muted border-b border-border shadow-lg max-h-[60vh] overflow-y-auto">
          <ul className="px-4 sm:px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="block bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-primary-dark transition-colors"
              >
                Book Now
              </Link>
            </li>
            <li className="pt-3">
              <button
                onClick={() => { toggleTheme(); setOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors py-3 w-full"
              >
                <Image
                  src="/theme-toggle.png"
                  alt="Toggle theme"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>Toggle Theme</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
