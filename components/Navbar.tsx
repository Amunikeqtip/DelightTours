"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const leftLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const rightLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours & Activities" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--color-nav-bg)" : "transparent",
        borderColor: scrolled ? "var(--color-border)" : "transparent",
        boxShadow: scrolled ? undefined : "none",
      }}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">

        {/* Left links */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link whitespace-nowrap text-sm font-semibold${pathname === link.href ? " nav-link--active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center — logo */}
        <Link href="/" className="flex justify-center">
          <Image
            src="/delighttoursandtravel.png"
            alt="Delight Tours & Travel"
            width={140}
            height={35}
            className="logo-img h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        {/* Right links + Book Now + theme toggle */}
        <div className="flex items-center justify-end gap-4">
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link whitespace-nowrap text-sm font-semibold${pathname === link.href ? " nav-link--active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/booking"
            className="hidden whitespace-nowrap rounded-full bg-cta px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cta-hover md:inline-flex lg:px-5"
          >
            Book Now
          </Link>

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
