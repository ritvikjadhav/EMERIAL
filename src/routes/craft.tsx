import { createFileRoute, Link } from "@tanstack/react-router";
import craftVision from "@/assets/craft-vision.jpg";
import craftMaterial from "@/assets/craft-material.jpg";
import craftEngineering from "@/assets/craft-engineering.jpg";
import craftHand from "@/assets/craft-hand.jpg";
import collectionRegalia from "@/assets/collection-regalia.jpg";
import collectionApex from "@/assets/collection-apex.jpg";
import collectionAbyss from "@/assets/collection-abyss.jpg";
import { Reveal } from "@/components/Reveal";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [
      { title: "The Craft — How an EMERIAL is Made" },
      {
        name: "description",
        content:
          "Seven stages from drawing to regulation: the vision, the material, the engineering, the hand, the dial, the assembly and the test.",
      },
      { property: "og:title", content: "The Craft | EMERIAL" },
      {
        property: "og:description",
        content: "Crafted to measure time. Built to outlast it.",
      },
    ],
  }),
  component: Craft,
});

const sections = [
  {
    n: "01",
    title: "The Vision",
    headline: "Every timepiece begins with an idea.",
    body: "Design begins with proportion before ornament: the ratio of case to lug, the depth of the dial, the mechanical purpose each element must serve. Geometry is resolved on paper long before any material is cut.",
    image: craftVision,
  },
  {
    n: "02",
    title: "The Material",
    headline: "Chosen for behaviour, not appearance.",
    body: "Steel, titanium, gold, sapphire and lacquer are selected for durability, precision under load, and visual character across decades of wear. Every alloy is qualified before it enters a case.",
    image: craftMaterial,
  },
  {
    n: "03",
    title: "The Engineering",
    headline: "Architecture measured in microns.",
    body: "Movement bridges are laid out for rigidity and serviceability. Component tolerances are held to a few microns, gear trains are simulated before they are cut, and each escapement is regulated in six positions.",
    image: craftEngineering,
  },
  {
    n: "04",
    title: "The Hand",
    headline: "Patience is a component.",
    body: "Assembly and finishing remain manual. Bevels are polished by hand, screws blued individually, and each stage inspected before the next begins. A watchmaker signs off on every movement.",
    image: craftHand,
  },
  {
    n: "05",
    title: "The Dial",
    headline: "The face of an identity.",
    body: "Dials are lacquered, engine-turned or cut from natural shell, then dried, polished and re-polished. Indices are applied under magnification to a tolerance the eye cannot see but always senses.",
    image: collectionRegalia,
  },
  {
    n: "06",
    title: "The Assembly",
    headline: "Movement, case, dial, hands, crystal.",
    body: "The elements converge in a single controlled sequence. The movement is cased, hands fitted, crystal pressed, gaskets seated — each step reversible until the final inspection.",
    image: collectionApex,
  },
  {
    n: "07",
    title: "The Test",
    headline: "Nothing leaves untested.",
    body: "Precision checks over fifteen days, water-resistance testing under pressure, movement regulation, visual inspection under raking light, and a final quality control before the timepiece is sealed.",
    image: collectionAbyss,
  },
];

function Craft() {
  return (
    <div className="pt-36 md:pt-48">
      <header className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Craft</p>
          <h1 className="mt-8 font-display text-5xl leading-[1.05] md:text-7xl">
            From drawing to regulation.
          </h1>
        </Reveal>
      </header>

      <div className="mt-32 space-y-32 md:space-y-48">
        {sections.map((s, i) => (
          <section key={s.n} className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group overflow-hidden bg-card">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1400}
                    height={900}
                    className="aspect-[4/3] w-full object-cover opacity-90 transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                  />
                </figure>
                <div>
                  <p className="text-[0.55rem] tracking-luxe text-muted-foreground">
                    Section {s.n} — {s.title}
                  </p>
                  <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                    {s.headline}
                  </h2>
                  <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="relative mt-40 overflow-hidden border-t border-border bg-obsidian">
        <Particles density={30} />
        <div className="relative mx-auto max-w-3xl px-6 py-40 text-center md:px-10 md:py-56">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight text-emerald-light md:text-6xl">
              Crafted to measure time.
              <br />
              Built to outlast it.
            </h2>
            <Link to="/watches" className="btn-emerald mt-14">
              Explore the Collection
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
