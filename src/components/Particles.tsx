import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Particles({ density = 40 }: { density?: number }) {
  const isMobile = useIsMobile();
  const count = isMobile ? Math.round(density / 2.5) : density;

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 18,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-emerald-light"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: 0,
            animation: `emerial-drift ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
