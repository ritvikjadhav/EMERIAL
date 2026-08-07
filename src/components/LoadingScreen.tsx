import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("emerial.loaded")) {
      setDone(true);
      setHidden(true);
      return;
    }
    const t1 = window.setTimeout(() => setDone(true), 1500);
    const t2 = window.setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("emerial.loaded", "1");
    }, 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-display text-4xl tracking-wide-luxe text-ivory">EMERIAL</span>
      <span className="mt-4 text-[0.55rem] tracking-luxe text-muted-foreground">
        Maison Horlogère
      </span>
      <span className="mt-10 block h-px w-40 overflow-hidden bg-border">
        <span
          className="block h-px w-full origin-left bg-emerald-light"
          style={{ animation: "emerial-line 1.5s cubic-bezier(0.16,1,0.3,1) forwards" }}
        />
      </span>
    </div>
  );
}
