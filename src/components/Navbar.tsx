import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { SearchOverlay, SearchTrigger } from "./SearchOverlay";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Collections", to: "/collections" },
  { label: "Watches", to: "/watches" },
  { label: "The Craft", to: "/craft" },
  { label: "Maison", to: "/maison" },
  { label: "Private Appointment", to: "/appointment" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-700 ${
          scrolled
            ? "border-b border-border bg-obsidian/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-5 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="min-w-0 font-display text-xl tracking-wide-luxe">
            EMERIAL
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[0.55rem] tracking-luxe text-foreground/70 transition-colors hover:text-emerald-light"
                  activeProps={{ className: "text-emerald-light" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center justify-end gap-5 text-foreground/80">
            <SearchTrigger onClick={() => setSearchOpen(true)} />
            <Link to="/appointment" aria-label="Account">
              <User className="h-4 w-4 transition-colors hover:text-emerald-light" />
            </Link>
            <Link to="/cart" aria-label="Shopping bag" className="relative">
              <ShoppingBag className="h-4 w-4 transition-colors hover:text-emerald-light" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-emerald text-[0.5rem] text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[90] animate-fade-in bg-obsidian">
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <span className="font-display text-xl tracking-wide-luxe">EMERIAL</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-12 space-y-2 px-6 md:px-10">
            {links.map((link, i) => (
              <li key={link.to} className="animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                <Link
                  to={link.to}
                  className="block border-b border-border py-5 font-display text-3xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
