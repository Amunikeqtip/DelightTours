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

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
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
          <div className="flex flex-wrap gap-4">
            {["Facebook", "Instagram", "Twitter", "Tripadvisor"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-foreground/70 transition-colors hover:text-primary"
              >
                {social}
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
