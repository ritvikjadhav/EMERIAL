import { Link } from "@tanstack/react-router";
import { formatPrice, getCollection, type Watch } from "@/data/watches";
import { useCart } from "@/lib/cart";

export function WatchCard({ watch }: { watch: Watch }) {
  const { add } = useCart();
  const collection = getCollection(watch.collection);

  return (
    <article className="group relative flex flex-col">
      <Link
        to="/watches/$slug"
        params={{ slug: watch.slug }}
        className="relative block overflow-hidden bg-card"
      >
        <img
          src={watch.image}
          alt={`${watch.name} luxury timepiece`}
          loading="lazy"
          width={1200}
          height={1200}
          className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,color-mix(in_oklab,var(--emerald)_22%,transparent),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {!watch.available && (
          <span className="absolute left-4 top-4 bg-obsidian/80 px-3 py-1 text-[0.5rem] tracking-luxe text-muted-foreground">
            By Enquiry
          </span>
        )}
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        <span className="text-[0.5rem] tracking-luxe text-emerald-light">{collection.name}</span>
        <h3 className="mt-2 font-display text-2xl leading-tight">{watch.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {watch.short}
        </p>
        <p className="mt-4 text-sm tracking-wide-luxe">{formatPrice(watch.price)}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/watches/$slug"
            params={{ slug: watch.slug }}
            className="btn-ghost-luxe flex-1 px-5 py-3"
          >
            View Timepiece
          </Link>
          <button
            type="button"
            onClick={() => add(watch.slug)}
            disabled={!watch.available}
            className="btn-emerald flex-1 px-5 py-3"
          >
            Acquire
          </button>
        </div>
      </div>
    </article>
  );
}
