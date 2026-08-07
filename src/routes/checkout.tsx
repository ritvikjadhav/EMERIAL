import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { formatPrice, getWatch } from "@/data/watches";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | EMERIAL" },
      {
        name: "description",
        content: "Complete the acquisition of your EMERIAL timepiece through secure checkout.",
      },
      { property: "og:title", content: "Secure Checkout | EMERIAL" },
      { property: "og:description", content: "Complete your EMERIAL acquisition." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  address: z.string().trim().min(1, "Required").max(200),
  city: z.string().trim().min(1, "Required").max(80),
  postal: z.string().trim().min(1, "Required").max(20),
  country: z.string().trim().min(1, "Required").max(80),
  cardName: z.string().trim().min(1, "Required").max(100),
  cardNumber: z.string().trim().regex(/^[0-9 ]{12,23}$/, "Enter a valid card number"),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "3–4 digits"),
});

function Checkout() {
  const { lines, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);

  const items = lines.flatMap((line) => {
    const watch = getWatch(line.slug);
    return watch ? [{ ...line, watch }] : [];
  });
  const total = items.reduce((sum, i) => sum + i.watch.price * i.quantity, 0);

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
    clear();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center md:px-10 md:pt-56">
        <h1 className="font-display text-4xl md:text-5xl">Your acquisition is confirmed.</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          A specialist will contact you to arrange delivery and authentication.
        </p>
        <Link to="/watches" className="btn-ghost-luxe mt-12">
          Return to the Collection
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center md:px-10 md:pt-56">
        <h1 className="font-display text-4xl">Nothing to acquire yet.</h1>
        <Link to="/watches" className="btn-emerald mt-12">
          Explore Timepieces
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 md:px-10 md:pt-48">
      <p className="text-[0.55rem] tracking-luxe text-emerald-light">Secure Checkout</p>
      <h1 className="mt-8 font-display text-5xl md:text-6xl">Acquisition</h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
        <form onSubmit={onSubmit} noValidate className="space-y-16">
          <fieldset>
            <legend className="text-[0.55rem] tracking-luxe text-muted-foreground">
              Customer information
            </legend>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <Field label="Full name" name="fullName" error={errors["fullName"]} />
              <Field label="Email" name="email" type="email" error={errors["email"]} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.55rem] tracking-luxe text-muted-foreground">Shipping</legend>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address" name="address" error={errors["address"]} />
              </div>
              <Field label="City" name="city" error={errors["city"]} />
              <Field label="Postal code" name="postal" error={errors["postal"]} />
              <Field label="Country" name="country" error={errors["country"]} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.55rem] tracking-luxe text-muted-foreground">Payment</legend>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Name on card" name="cardName" error={errors["cardName"]} />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Card number"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  error={errors["cardNumber"]}
                />
              </div>
              <Field label="Expiry" name="expiry" placeholder="MM/YY" error={errors["expiry"]} />
              <Field label="CVC" name="cvc" placeholder="123" error={errors["cvc"]} />
            </div>
          </fieldset>

          <button type="submit" className="btn-emerald w-full sm:w-auto">
            Complete Acquisition
          </button>

          <div className="flex flex-wrap gap-6 text-[0.5rem] tracking-luxe text-muted-foreground">
            <span className="flex items-center gap-2">
              <Lock className="h-3 w-3 text-emerald-light" /> Encrypted payment
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-emerald-light" /> Insured delivery
            </span>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[0.55rem] tracking-luxe text-muted-foreground">Order summary</h2>
          <ul className="mt-8 space-y-6 border-y border-border py-8">
            {items.map(({ watch, quantity }) => (
              <li key={watch.slug} className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg">{watch.name}</p>
                  <p className="mt-1 text-[0.5rem] tracking-luxe text-muted-foreground">
                    Quantity {quantity}
                  </p>
                </div>
                <span className="shrink-0 text-sm">{formatPrice(watch.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-baseline justify-between">
            <span className="text-[0.55rem] tracking-luxe text-muted-foreground">Total</span>
            <span className="font-display text-3xl">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <div>
      <label className="label-luxe" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder ?? ""}
        maxLength={255}
        className="field-luxe"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
