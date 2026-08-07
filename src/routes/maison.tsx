import { createFileRoute, Link } from "@tanstack/react-router";
import craftHand from "@/assets/craft-hand.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/maison")({
  head: () => ({
    meta: [
      { title: "The Maison — About EMERIAL" },
      {
        name: "description",
        content:
          "EMERIAL is a fictional luxury watch maison combining traditional watchmaking philosophy with contemporary engineering.",
      },
      { property: "og:title", content: "The Maison | EMERIAL" },
      {
        property: "og:description",
        content: "Precision, restraint, craftsmanship, longevity.",
      },
    ],
  }),
  component: Maison,
});

const standard = [
  ["Measured", "Every component is verified against drawing before assembly."],
  ["Reversible", "Nothing is bonded that cannot later be serviced."],
  ["Finished", "Surfaces are treated whether or not they will be seen."],
  ["Regulated", "Each movement is adjusted in six positions over fifteen days."],
  ["Documented", "Every timepiece carries its own record of manufacture."],
  ["Guaranteed", "Servicing is offered for the working life of the watch."],
];

function Maison() {
  return (
    <div className="pt-36 md:pt-48">
      <header className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <p className="text-[0.55rem] tracking-luxe text-emerald-light">The Maison</p>
          <h1 className="mt-8 font-display text-5xl leading-[1.05] md:text-7xl">
            Designed beyond the moment.
          </h1>
        </Reveal>
      </header>

      <section className="mx-auto mt-24 max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <figure className="overflow-hidden bg-card">
              <img
                src={craftHand}
                alt="An EMERIAL watchmaker assembling a movement"
                loading="lazy"
                width={1400}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Our story</h2>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                EMERIAL was conceived as a modern maison: a small atelier working in the tradition of
                Swiss horology, but building with contemporary tools, materials, and tolerances. The
                brand exists to answer a single question — what does a timepiece look like when
                nothing is decided for the sake of appearance?
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Production is intentionally limited. Each reference is developed over years and
                retired only when it can be improved, not when a season ends.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-32 max-w-4xl px-6 text-center md:mt-48 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">Our philosophy</h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Precision before expression. Restraint before decoration. Craftsmanship before scale.
            Materials chosen for longevity, and design measured in decades rather than seasons.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">The EMERIAL standard</h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {standard.map(([title, body], i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="h-full bg-background p-10">
                <p className="text-[0.5rem] tracking-luxe text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-5 text-[0.6rem] tracking-luxe text-emerald-light">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-3xl px-6 text-center md:mt-48 md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">
            Built for those who notice the details.
          </h2>
          <Link to="/appointment" className="btn-emerald mt-12">
            Request Private Appointment
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
