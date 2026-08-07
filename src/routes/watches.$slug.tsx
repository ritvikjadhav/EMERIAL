import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, getCollection, getWatch, watches } from "@/data/watches";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";
import { WatchCard } from "@/components/WatchCard";

export const Route = createFileRoute("/watches/$slug")({
  loader: ({ params }) => {
    const watch = getWatch(params.slug);
    if (!watch) throw notFound();
    return { watch };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Timepiece unavailable | EMERIAL" }, { name: "robots", content: "noindex" }],
      };
    }
    const { watch } = loaderData;
    return {
      meta: [
        { title: `${watch.name} — ${formatPrice(watch.price)} | EMERIAL` },
        { name: "description", content: watch.short },
        { property: "og:title", content: `${watch.name} | EMERIAL` },
        { property: "og:description", content: watch.short },
      ],
    };
  },
  component: WatchDetail,
});

const zones = [
  { id: "case", label: "Case", key: "case" as const },
  { id: "movement", label: "Movement", key: "movement" as const },
  { id: "dial", label: "Dial", key: "dial" as const },
  { id: "bracelet", label: "Bracelet", key: "bracelet" as const },
];

function WatchDetail() {
  const { watch } = Route.useLoaderData();
  const collection = getCollection(watch.collection);
  const { add } = useCart();
  const [zone, setZone] = useState<(typeof zones)[number] | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const related = watches.filter((w) => w.collection === watch.collection && w.slug !== watch.slug);

  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <figure
            className="relative overflow-hidden bg-card"
            onMouseLeave={() => setZoomed(false)}
          >
            <img
              src={watch.image}
              alt={`${watch.name} — EMERIAL timepiece`}
              width={1200}
              height={1200}
              className={`aspect-square w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                zoomed ? "scale-[1.55]" : "scale-100"
              }`}
              onClick={() => setZoomed((z) => !z)}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--emerald-light)_16%,transparent),transparent)] animate-sheen" />
            <figcaption className="absolute bottom-4 left-4 text-[0.5rem] tracking-luxe text-muted-foreground">
              {zoomed ? "Click to reduce" : "Click to magnify"}
            </figcaption>
          </figure>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {zones.map((z) => (
              <button
                key={z.id}
                type="button"
                onMouseEnter={() => setZone(z)}
                onFocus={() => setZone(z)}
                onMouseLeave={() => setZone(null)}
                onBlur={() => setZone(null)}
                className={`border px-2 py-3 text-[0.5rem] tracking-luxe transition-colors ${
                  zone?.id === z.id
                    ? "border-emerald text-emerald-light"
                    : "border-border text-muted-foreground hover:border-emerald-deep"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
          <p className="mt-4 min-h-[3rem] text-xs leading-relaxed text-muted-foreground">
            {zone ? watch.specs[zone.key] : "Hover a component to reveal its construction."}
          </p>
        </div>

        <div>
          <Link
            to="/collections"
            className="text-[0.55rem] tracking-luxe text-emerald-light"
          >
            {collection.name}
          </Link>
          <h1 className="mt-6 font-display text-5xl leading-tight md:text-6xl">{watch.name}</h1>
          <p className="mt-6 text-lg tracking-wide-luxe">{formatPrice(watch.price)}</p>
          <p className="mt-3 text-[0.55rem] tracking-luxe text-muted-foreground">
            {watch.available ? "Available — ships in 14 days" : "By enquiry — waiting list"}
          </p>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {watch.description}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => add(watch.slug)}
              disabled={!watch.available}
              className="btn-emerald"
            >
              Acquire Timepiece
            </button>
            <Link to="/appointment" className="btn-ghost-luxe">
              Request Private Viewing
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="text-[0.55rem] tracking-luxe text-muted-foreground">Specifications</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {(
                [
                  ["Case", watch.specs.case],
                  ["Case diameter", watch.specs.diameter],
                  ["Case thickness", watch.specs.thickness],
                  ["Crystal", watch.specs.crystal],
                  ["Water resistance", watch.specs.waterResistance],
                  ["Movement", watch.specs.movement],
                  ["Power reserve", watch.specs.powerReserve],
                  ["Bracelet / strap", watch.specs.bracelet],
                  ["Dial", watch.specs.dial],
                  ["Functions", watch.specs.functions],
                  ["Clasp", watch.specs.clasp],
                  ["Reference", watch.specs.reference],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 py-4">
                  <dt className="text-[0.5rem] tracking-luxe text-muted-foreground">{label}</dt>
                  <dd className="text-sm text-foreground/90">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-muted-foreground">
              EMERIAL is a fictional maison. Specifications are illustrative.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
          <h2 className="font-display text-3xl md:text-4xl">More from {collection.name}</h2>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((w, i) => (
              <Reveal key={w.slug} delay={i * 80}>
                <WatchCard watch={w} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
