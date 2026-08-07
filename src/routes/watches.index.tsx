import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  caseMaterials,
  collections,
  movementTypes,
  strapTypes,
  watches,
  type CollectionId,
} from "@/data/watches";
import { WatchCard } from "@/components/WatchCard";
import { Reveal } from "@/components/Reveal";

type Search = { collection?: CollectionId };

export const Route = createFileRoute("/watches/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const c = search["collection"];
    return typeof c === "string" && ["abyss", "regalia", "apex"].includes(c)
      ? { collection: c as CollectionId }
      : {};
  },
  head: () => ({
    meta: [
      { title: "All Timepieces | EMERIAL" },
      {
        name: "description",
        content:
          "Browse every EMERIAL timepiece. Filter by collection, price, case material, strap, movement and availability.",
      },
      { property: "og:title", content: "All EMERIAL Timepieces" },
      {
        property: "og:description",
        content: "Ten timepieces across the Abyss, Regalia and Apex collections.",
      },
    ],
  }),
  component: AllWatches,
});

const PRICE_MAX = 50000;

function AllWatches() {
  const { collection } = Route.useSearch();
  const [activeCollection, setActiveCollection] = useState<CollectionId | "all">(
    collection ?? "all",
  );
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [material, setMaterial] = useState("all");
  const [strap, setStrap] = useState("all");
  const [movement, setMovement] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  const results = useMemo(
    () =>
      watches.filter(
        (w) =>
          (activeCollection === "all" || w.collection === activeCollection) &&
          w.price <= maxPrice &&
          (material === "all" || w.caseMaterial === material) &&
          (strap === "all" || w.strap === strap) &&
          (movement === "all" || w.movementType === movement) &&
          (!availableOnly || w.available),
      ),
    [activeCollection, maxPrice, material, strap, movement, availableOnly],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 md:px-10 md:pt-48">
      <Reveal>
        <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Catalogue</p>
        <h1 className="mt-8 font-display text-5xl md:text-7xl">All timepieces</h1>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-10">
            <FilterGroup label="Collection">
              <div className="space-y-2">
                {(["all", ...collections.map((c) => c.id)] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveCollection(id as CollectionId | "all")}
                    className={`block text-[0.55rem] tracking-luxe transition-colors ${
                      activeCollection === id
                        ? "text-emerald-light"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {id === "all" ? "All" : id}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label={`Price up to $${maxPrice.toLocaleString()}`}>
              <input
                type="range"
                min={10000}
                max={PRICE_MAX}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--emerald)]"
                aria-label="Maximum price"
              />
            </FilterGroup>

            <SelectFilter
              label="Case material"
              value={material}
              onChange={setMaterial}
              options={caseMaterials}
            />
            <SelectFilter label="Strap" value={strap} onChange={setStrap} options={strapTypes} />
            <SelectFilter
              label="Movement"
              value={movement}
              onChange={setMovement}
              options={movementTypes}
            />

            <FilterGroup label="Availability">
              <label className="flex items-center gap-3 text-[0.55rem] tracking-luxe text-muted-foreground">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="h-3 w-3 accent-[var(--emerald)]"
                />
                In stock only
              </label>
            </FilterGroup>
          </div>
        </aside>

        <div>
          <p className="text-[0.55rem] tracking-luxe text-muted-foreground">
            {results.length} timepieces
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((watch, i) => (
              <Reveal key={watch.slug} delay={(i % 3) * 80}>
                <WatchCard watch={watch} />
              </Reveal>
            ))}
          </div>
          {results.length === 0 && (
            <p className="mt-16 text-sm text-muted-foreground">
              No timepieces match these criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-[0.5rem] tracking-luxe text-foreground/60">{label}</h2>
      {children}
    </div>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <FilterGroup label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field-luxe">
        <option value="all">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FilterGroup>
  );
}
