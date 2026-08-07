import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice, getWatch } from "@/data/watches";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Collection | EMERIAL" },
      {
        name: "description",
        content: "Review the EMERIAL timepieces you have selected before proceeding to checkout.",
      },
      { property: "og:title", content: "Your Collection | EMERIAL" },
      { property: "og:description", content: "Review your selected EMERIAL timepieces." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, setQuantity, remove } = useCart();
  const items = lines.flatMap((line) => {
    const watch = getWatch(line.slug);
    return watch ? [{ ...line, watch }] : [];
  });
  const total = items.reduce((sum, i) => sum + i.watch.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-36 md:px-10 md:pt-48">
      <p className="text-[0.55rem] tracking-luxe text-emerald-light">Your Collection</p>
      <h1 className="mt-8 font-display text-5xl md:text-6xl">The bag</h1>

      {items.length === 0 ? (
        <div className="mt-20 border border-border px-8 py-24 text-center">
          <p className="text-sm text-muted-foreground">Your collection is empty.</p>
          <Link to="/watches" className="btn-ghost-luxe mt-10">
            Explore Timepieces
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-16 divide-y divide-border border-y border-border">
            {items.map(({ watch, quantity }) => (
              <li key={watch.slug} className="grid grid-cols-[80px_minmax(0,1fr)] gap-6 py-8 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center">
                <Link to="/watches/$slug" params={{ slug: watch.slug }} className="shrink-0">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="aspect-square w-full object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <h2 className="font-display text-xl">{watch.name}</h2>
                  <p className="mt-1 text-[0.5rem] tracking-luxe text-muted-foreground">
                    Ref. {watch.specs.reference}
                  </p>
                  <p className="mt-3 text-sm">{formatPrice(watch.price)}</p>
                  <div className="mt-4 flex items-center gap-5">
                    <div className="flex items-center gap-4 border border-border px-3 py-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(watch.slug, quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs tabular-nums">{quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(watch.slug, quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(watch.slug)}
                      className="flex items-center gap-2 text-[0.5rem] tracking-luxe text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                <p className="hidden text-sm tracking-wide-luxe sm:block">
                  {formatPrice(watch.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-end gap-8">
            <div className="flex w-full max-w-xs items-baseline justify-between">
              <span className="text-[0.55rem] tracking-luxe text-muted-foreground">Total</span>
              <span className="font-display text-3xl">{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="btn-emerald w-full sm:w-auto">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
