import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { collections, watches } from "@/data/watches";

const pages = [
  { title: "The Craft", to: "/craft", kind: "Story", text: "vision material engineering hand dial assembly test craftsmanship" },
  { title: "The Maison", to: "/maison", kind: "Story", text: "about maison philosophy standard emerial history" },
  { title: "Private Appointment", to: "/appointment", kind: "Service", text: "appointment consultation specialist private booking" },
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const watchHits = watches
      .filter((w) => `${w.name} ${w.short} ${w.collection} ${w.caseMaterial}`.toLowerCase().includes(q))
      .map((w) => ({ title: w.name, to: "/watches/$slug", params: { slug: w.slug }, kind: "Timepiece" }));
    const collectionHits = collections
      .filter((c) => `${c.name} ${c.tagline} ${c.description}`.toLowerCase().includes(q))
      .map((c) => ({ title: c.name, to: "/collections", params: undefined, kind: "Collection" }));
    const pageHits = pages
      .filter((p) => `${p.title} ${p.text}`.toLowerCase().includes(q))
      .map((p) => ({ title: p.title, to: p.to, params: undefined, kind: p.kind }));
    return [...watchHits, ...collectionHits, ...pageHits].slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] animate-fade-in bg-obsidian/97 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-3xl flex-col px-6 pt-28 md:pt-40">
        <div className="flex items-center justify-between">
          <span className="text-[0.55rem] tracking-luxe text-muted-foreground">Search Emerial</span>
          <button type="button" onClick={onClose} aria-label="Close search">
            <X className="h-5 w-5 text-muted-foreground transition-colors hover:text-emerald-light" />
          </button>
        </div>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 80))}
          placeholder="Timepieces, collections, craft…"
          className="field-luxe mt-6 font-display text-3xl md:text-5xl"
          aria-label="Search Emerial"
        />

        <ul className="mt-10 space-y-1 overflow-y-auto pb-20">
          {results.map((r) => (
            <li key={`${r.kind}-${r.title}`}>
              <Link
                to={r.to}
                params={r.params as never}
                onClick={onClose}
                className="flex items-baseline justify-between border-b border-border py-4 transition-colors hover:border-emerald"
              >
                <span className="font-display text-xl">{r.title}</span>
                <span className="text-[0.5rem] tracking-luxe text-emerald-light">{r.kind}</span>
              </Link>
            </li>
          ))}
          {query.trim().length >= 2 && results.length === 0 && (
            <li className="py-6 text-sm text-muted-foreground">No results.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Search">
      <Search className="h-4 w-4 transition-colors hover:text-emerald-light" />
    </button>
  );
}
