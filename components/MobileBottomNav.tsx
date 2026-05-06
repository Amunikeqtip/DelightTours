"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/tours", label: "Tours", icon: "🗺️" },
  { href: "/booking", label: "Book", icon: "✈️" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/contact", label: "Contact", icon: "📞" },
];

export default function MobileBottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-muted/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
        <div className="flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium text-foreground/70">
          <ThemeToggle />
          <span>Theme</span>
        </div>
      </div>
    </nav>
  );
}
