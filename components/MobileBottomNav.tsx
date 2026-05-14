"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", icon: "pi pi-home" },
  { href: "/tours", label: "Tours", icon: "pi pi-compass" },
  { href: "/booking", label: "Book", icon: "pi pi-send" },
  { href: "/reviews", label: "Reviews", icon: "pi pi-star" },
  { href: "/contact", label: "Contact", icon: "pi pi-phone" },
];

export default function MobileBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg backdrop-blur-md sm:hidden"
      style={{
        backgroundColor: "var(--color-nav-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-1 px-2 py-1 text-xs font-semibold transition-colors hover:text-accent-light"
            style={{ color: "var(--color-nav-text)" }}
          >
            <i className={`${link.icon} text-lg`} />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
