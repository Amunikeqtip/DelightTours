import Link from "next/link";
import Image from "next/image";
import PlatformIcons from "@/components/PlatformIcons";

const footerLinks = {
  "Quick Links": [
    { href: "/tours", label: "Tours & Activities" },
    { href: "/reviews", label: "Reviews" },
    { href: "/booking", label: "Book Now" },
    { href: "/about", label: "About Us" },
  ],
  "Support": [
    { href: "/contact", label: "Contact" },
    { href: "/contact#faq", label: "FAQ" },
    { href: "/contact#terms", label: "Terms & Conditions" },
    { href: "/contact#privacy", label: "Privacy Policy" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M14.2 8.4V6.7c0-.8.2-1.2 1.3-1.2h1.6V2.8c-.8-.1-1.5-.2-2.3-.2-2.4 0-4 1.5-4 4v1.8H8.1v3h2.7v9h3.4v-9H17l.4-3h-3.2Z",
  },
  {
    name: "Instagram",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M7.4 2.8h9.2c2.5 0 4.6 2.1 4.6 4.6v9.2c0 2.5-2.1 4.6-4.6 4.6H7.4a4.6 4.6 0 0 1-4.6-4.6V7.4c0-2.5 2.1-4.6 4.6-4.6Zm0 2A2.6 2.6 0 0 0 4.8 7.4v9.2a2.6 2.6 0 0 0 2.6 2.6h9.2a2.6 2.6 0 0 0 2.6-2.6V7.4a2.6 2.6 0 0 0-2.6-2.6H7.4Zm9.8 1.8a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z",
  },
  {
    name: "X",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M13.9 10.5 21.3 2h-1.8l-6.4 7.4L8 2H2l7.8 11.4L2 22h1.8l6.8-7.8L16 22h6l-8.1-11.5Zm-2.4 2.8-.8-1.1L4.4 3.3h2.8l5 7.1.8 1.1 6.6 9.3h-2.8l-5.3-7.5Z",
  },
  {
    name: "Tripadvisor",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M7.3 8.1A5 5 0 0 1 12 7a5 5 0 0 1 4.7 1.1l1.6-1.7h-4.4V4.1H10v2.3H5.7l1.6 1.7ZM7.6 17a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Zm8.8 0a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Zm-8.8-2.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm8.8 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z",
  },
];

export default function Footer() {
  return (
    <footer className="soft-animated-surface border-t border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3">
            <Image
              src="/delighttoursandtravel.png"
              alt="Delight Tours & Travel"
              width={160}
              height={56}
              className="h-12 w-auto object-contain object-left"
            />
          </Link>
          <p className="text-sm leading-relaxed text-foreground/70">
            Minimal, professional travel planning for Victoria Falls and the wider region.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-3 text-sm font-bold text-foreground">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-3 text-sm font-bold text-foreground">Connect</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                title={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-primary shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                <svg viewBox={social.viewBox} className="h-5 w-5" aria-hidden="true">
                  <path d={social.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 sm:px-6 md:flex-row">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Delight Tours & Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-foreground/50">
            <span>Powered by</span>
            <PlatformIcons compact />
          </div>
        </div>
      </div>
    </footer>
  );
}
