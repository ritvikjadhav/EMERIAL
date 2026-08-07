import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

const columns = [
  {
    title: "Maison",
    links: [
      { label: "Collections", to: "/collections" },
      { label: "All Watches", to: "/watches" },
      { label: "The Craft", to: "/craft" },
      { label: "Maison", to: "/maison" },
    ],
  },
  {
    title: "Client",
    links: [
      { label: "Private Appointment", to: "/appointment" },
      { label: "Contact", to: "/appointment" },
      { label: "Shipping", to: "/maison" },
      { label: "Returns", to: "/maison" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/maison" },
      { label: "Terms", to: "/maison" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="hairline mt-32 bg-obsidian">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <span className="font-display text-2xl tracking-wide-luxe">EMERIAL</span>
          <p className="mt-4 text-[0.6rem] tracking-luxe text-emerald-light">Time, Engineered.</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            EMERIAL is a fictional maison created as a design study in precision, restraint, and
            modern watchmaking.
          </p>
          <div className="mt-8 flex gap-5 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-emerald-light">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-emerald-light">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Pinterest" className="transition-colors hover:text-emerald-light">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2 .1-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8-3 0-4.9 2.2-4.9 4.7 0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.2-1.2-.5-1.8-1.9-1.8-3.5 0-2.6 2.2-5.7 6.6-5.7 3.5 0 5.8 2.5 5.8 5.3 0 3.6-2 6.3-5 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.8-.7 1.7-1.1 2.3A10 10 0 1 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[0.55rem] tracking-luxe text-muted-foreground">{col.title}</h3>
            <ul className="mt-6 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-emerald-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline mx-auto max-w-7xl px-6 py-8 md:px-10">
        <p className="text-[0.55rem] tracking-luxe text-muted-foreground">
          © 2026 EMERIAL Maison. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
