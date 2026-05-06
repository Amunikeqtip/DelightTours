"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", icon: "pi pi-home" },
  { href: "/tours", label: "Tours", icon: "pi pi-compass" },
  { href: "/booking", label: "Book", icon: "pi pi-send" },
  { href: "/reviews", label: "Reviews", icon: "pi pi-star" },
  { href: "/contact", label: "Contact", icon: "pi pi-phone" },
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
            <i className={`${link.icon} text-lg`}></i>
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
