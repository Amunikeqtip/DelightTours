import Link from "next/link";

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
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-primary mb-3">Delight Tours</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Crafting unforgettable travel experiences with care, passion, and local expertise.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "Twitter", "Tripadvisor"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Delight Tours & Travel. All rights reserved.
          </p>
          <p className="text-xs text-foreground/50">
            Powered by Bókun &middot; Viator &middot; GetYourGuide &middot; Tripadvisor
          </p>
        </div>
      </div>
    </footer>
  );
}
