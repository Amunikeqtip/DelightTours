"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours & Activities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav
      className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-md"
      style={{
        backgroundColor: "var(--color-nav-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between overflow-hidden px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-shrink-0 items-center">
          <Image
            src="/delighttoursandtravel.png"
            alt="Delight Tours & Travel"
            width={140}
            height={35}
            className="logo-img h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-sm font-semibold transition-colors hover:text-accent-light"
                  style={{ color: "var(--color-nav-text)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="inline-flex whitespace-nowrap rounded-full bg-cta px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cta-hover lg:px-5"
              >
                Book Now
              </Link>
            </li>
          </ul>

          <div className="toggleWrapper">
            <input
              className="input"
              id="dn"
              type="checkbox"
              checked={isDark}
              onChange={() => setTheme(isDark ? "light" : "dark")}
            />
            <label className="toggle" htmlFor="dn">
              <span className="toggle__handler">
                <span className="crater crater--1"></span>
                <span className="crater crater--2"></span>
                <span className="crater crater--3"></span>
              </span>
              <span className="star star--1"></span>
              <span className="star star--2"></span>
              <span className="star star--3"></span>
              <span className="star star--4"></span>
              <span className="star star--5"></span>
              <span className="star star--6"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
