import { createFileRoute } from "@tanstack/react-router";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Private Appointment | EMERIAL" },
      {
        name: "description",
        content:
          "Arrange a private consultation with an EMERIAL specialist to experience a timepiece in person.",
      },
      { property: "og:title", content: "Private Appointment | EMERIAL" },
      {
        property: "og:description",
        content: "Some timepieces deserve to be experienced in person.",
      },
    ],
  }),
  component: Appointment,
});

function Appointment() {
  return (
    <div className="relative overflow-hidden">
      <Particles density={26} />
      <div className="relative mx-auto max-w-4xl px-6 pt-36 md:px-10 md:pt-48">
        <Reveal>
          <p className="text-[0.55rem] tracking-luxe text-emerald-light">Private Appointment</p>
          <h1 className="mt-8 font-display text-4xl leading-[1.08] md:text-6xl">
            Some timepieces deserve to be experienced in person.
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Our specialists arrange private consultations in a setting free of interruption. Share
            your preferences below and we will respond with a proposed time.
          </p>
        </Reveal>

        <div className="mt-20">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
