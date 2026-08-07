import { useState, type FormEvent } from "react";
import { z } from "zod";
import { collections } from "@/data/watches";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  collection: z.string().max(40),
  date: z.string().max(40),
  time: z.string().max(40),
  message: z.string().trim().max(1000).optional(),
});

export function AppointmentForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-border bg-card/40 px-8 py-20 text-center">
        <h3 className="font-display text-3xl md:text-4xl">Your request has been received.</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          An EMERIAL specialist will be in contact shortly.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-ghost-luxe mt-10">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <Reveal>
      <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors["name"]} />
        <Field label="Email" name="email" type="email" error={errors["email"]} />
        <Field label="Phone" name="phone" type="tel" error={errors["phone"]} />
        <div>
          <label className="label-luxe" htmlFor="collection">
            Preferred collection
          </label>
          <select id="collection" name="collection" defaultValue="" className="field-luxe">
            <option value="">No preference</option>
            {collections.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Field label="Preferred date" name="date" type="date" error={errors["date"]} />
        <Field label="Preferred time" name="time" type="time" error={errors["time"]} />
        <div className="sm:col-span-2">
          <label className="label-luxe" htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" rows={3} maxLength={1000} className="field-luxe" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-emerald w-full sm:w-auto">
            Request Private Appointment
          </button>
        </div>
      </form>
    </Reveal>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="label-luxe" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} maxLength={255} className="field-luxe" />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
