"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home"},
  { href: "/tours", label: "Tours"},
  { href: "/booking", label: "Book" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function MobileBottomNav() {
  const { toggleTheme } = useTheme();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-muted/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <span className="text-lg"></span>
            <span>{link.label}</span>
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium text-foreground/70 hover:text-primary transition-colors"
          aria-label="Toggle theme"
        >
          <Image
            src="/theme-toggle.png"
            alt="Toggle theme"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>Theme</span>
        </button>
      </div>
    </nav>
  );
}
