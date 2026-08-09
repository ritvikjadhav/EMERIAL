import { createFileRoute, Link } from "@tanstack/react-router";
import heroWatch from "@/assets/hero-watch.png";
import craftEngineering from "@/assets/craft-engineering.jpg";
import { collections, watches } from "@/data/watches";
import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { WatchCard } from "@/components/WatchCard";
import { AppointmentForm } from "@/components/AppointmentForm";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMERIAL — Engineered for Eternity | Luxury Timepieces" },
      {
        name: "description",
        content:
          "Precision-crafted timepieces where uncompromising engineering meets the art of modern luxury. Discover the Abyss, Regalia and Apex collections.",
      },
      { property: "og:title", content: "EMERIAL — Engineered for Eternity" },
      {
        property: "og:description",
        content: "A fictional luxury watch maison. Precision, restraint, permanence.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 700));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = watches.filter((w) =>
    ["regalia-emerald-torque", "abyss-aqua-diver", "apex-emerald-fury"].includes(w.slug),
  );

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian">
        <div className="atmosphere absolute inset-0" aria-hidden />
        <Particles density={46} />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-36 md:px-10 lg:grid-cols-[1fr_1fr] lg:pb-0">
          <div
            style={{ transform: `translateY(${offset * -0.12}px)`, opacity: 1 - offset / 620 }}
            className="order-2 lg:order-1"
          >
            <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Emerial Maison</p>
            <h1 className="mt-8 font-display text-[3.4rem] leading-[0.94] sm:text-7xl lg:text-8xl">
              Engineered
              <br />
              for eternity.
            </h1>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Precision-crafted timepieces where uncompromising engineering meets the art of modern
              luxury.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/watches" className="btn-emerald">
                Explore Collection
              </Link>
              <Link to="/craft" className="btn-ghost-luxe">
                The Craft
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div
              className="absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--emerald) 34%, transparent), transparent 62%)",
              }}
              aria-hidden
            />
            <img
              src={heroWatch}
              alt="EMERIAL luxury timepiece with an emerald dial floating in darkness"
              width={1200}
              height={1408}
              className="animate-float-watch mx-auto w-[74%] max-w-md drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)] lg:w-full lg:max-w-none"
              style={{ transform: `translateY(${offset * 0.06}px)` }}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: "var(--gradient-veil)" }}
          aria-hidden
        />
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center md:px-10 md:py-44">
        <Reveal>
          <p className="text-[0.55rem] tracking-luxe text-emerald-light">Introduction</p>
          <h2 className="mt-10 font-display text-4xl leading-[1.15] md:text-6xl">
            Luxury is not announced.
            <br />
            It is engineered.
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">
            EMERIAL builds instruments of measurement rather than ornament. Every proportion, every
            tolerance, every finish exists because it earns its place.
          </p>
        </Reveal>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="space-y-24 md:space-y-40">
          {collections.map((collection, i) => (
            <Reveal key={collection.id}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group relative overflow-hidden bg-card">
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection timepiece`}
                    loading="lazy"
                    width={1104}
                    height={1312}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </figure>
                <div>
                  <p className="text-[0.55rem] tracking-luxe text-muted-foreground">
                    Collection 0{i + 1}
                  </p>
                  <h3 className="mt-6 font-display text-5xl tracking-[0.12em] md:text-7xl">
                    {collection.name.toUpperCase()}
                  </h3>
                  <p className="mt-4 font-display text-xl italic text-emerald-light">
                    {collection.tagline}
                  </p>
                  <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {collection.description}
                  </p>
                  <Link
                    to="/watches"
                    search={{ collection: collection.id }}
                    className="btn-ghost-luxe mt-12"
                  >
                    Explore {collection.name}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CRAFT PREVIEW */}
      <section className="relative overflow-hidden bg-obsidian">
        <img
          src={craftEngineering}
          alt="Macro view of an EMERIAL mechanical movement"
          loading="lazy"
          width={1400}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-40 text-center md:px-10 md:py-56">
          <Reveal>
            <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Craft</p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-6xl">
              Where engineering becomes elegance.
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Seven stages separate an idea from a finished EMERIAL. Follow the movement from
              drawing to regulation.
            </p>
            <Link to="/craft" className="btn-emerald mt-12">
              Discover the Craft
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">Philosophy</h2>
          </Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {[
              ["Restraint", "Nothing is added that does not serve the reading of time."],
              ["Material", "Chosen for behaviour over decades, not appearance on a shelf."],
              ["Tolerance", "Components are measured in microns and rejected without appeal."],
              ["Permanence", "A timepiece should outlive the person who commissioned it."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="h-full bg-background p-10">
                  <h3 className="text-[0.55rem] tracking-luxe text-emerald-light">{title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE APPOINTMENT */}
      <section className="relative overflow-hidden border-y border-border bg-obsidian">
        <div className="atmosphere absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-32 md:px-10 md:py-44">
          <Reveal>
            <p className="text-[0.55rem] tracking-luxe text-emerald-light">Private Appointment</p>
            <h2 className="mt-8 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Some timepieces deserve to be experienced in person.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Arrange a private consultation with an EMERIAL specialist.
            </p>
          </Reveal>
          <div className="mt-16">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
