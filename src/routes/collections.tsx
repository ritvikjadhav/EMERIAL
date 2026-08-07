import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/data/watches";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Abyss, Regalia, Apex | EMERIAL" },
      {
        name: "description",
        content:
          "Three EMERIAL collections: Abyss, born beneath the surface; Regalia, the architecture of prestige; Apex, precision at its limit.",
      },
      { property: "og:title", content: "EMERIAL Collections" },
      {
        property: "og:description",
        content: "Abyss, Regalia and Apex — three expressions of engineered luxury.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="pt-36 md:pt-48">
      <header className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Collections</p>
          <h1 className="mt-8 max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
            Three languages of precision.
          </h1>
        </Reveal>
      </header>

      <div className="mt-28 space-y-32 md:space-y-48">
        {collections.map((collection, i) => (
          <section key={collection.id} className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
                <figure className="group relative overflow-hidden bg-card">
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection`}
                    loading="lazy"
                    width={1104}
                    height={1312}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklab,var(--obsidian)_80%,transparent))]" />
                </figure>
                <div>
                  <p className="text-[0.55rem] tracking-luxe text-muted-foreground">
                    0{i + 1} — Collection
                  </p>
                  <h2 className="mt-6 font-display text-5xl tracking-[0.14em] md:text-7xl">
                    {collection.name.toUpperCase()}
                  </h2>
                  <p className="mt-4 font-display text-2xl italic text-emerald-light">
                    {collection.tagline}
                  </p>
                  <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {collection.description}
                  </p>
                  <Link
                    to="/watches"
                    search={{ collection: collection.id }}
                    className="btn-emerald mt-12"
                  >
                    Explore {collection.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
