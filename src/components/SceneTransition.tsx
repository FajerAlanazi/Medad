import { useEffect, useState } from "react";

interface Props {
  scene: string;
  title: string;
  regionEmoji?: string;
  visible: boolean;
  onDone: () => void;
}

export default function SceneTransition({ scene, title, regionEmoji, visible, onDone }: Props) {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "hidden">("hidden");

  useEffect(() => {
    if (!visible) { setPhase("hidden"); return; }
    setPhase("in");
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1400);
    const t3 = setTimeout(() => { setPhase("hidden"); onDone(); }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      style={{
        background: "rgba(9,15,26,0.97)",
        opacity: phase === "in" ? 0 : phase === "hold" ? 1 : 0,
        transition: phase === "in" ? "opacity 0.4s ease" : "opacity 0.5s ease",
      }}
    >
      {/* Ornamental ring */}
      <div className="relative mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="#d4a843" strokeWidth="1"
            strokeDasharray="339.3" strokeDashoffset={phase === "hold" ? "0" : "339.3"}
            style={{ transition: "stroke-dashoffset 0.6s ease", transform: "rotate(-90deg)", transformOrigin: "center" }} />
          <text x="60" y="72" textAnchor="middle" fontSize="40" fontFamily="Cairo">
            {regionEmoji ?? "✦"}
          </text>
        </svg>
      </div>

      {/* Scene label */}
      <p className="text-xs tracking-[0.4em] mb-3"
        style={{
          color: "#6b7f8e",
          opacity: phase === "hold" ? 1 : 0,
          transition: "opacity 0.3s ease 0.2s",
        }}>
        {scene}
      </p>

      {/* Title */}
      <h2
        className="font-display text-3xl md:text-4xl text-center px-8"
        style={{
          color: "#f0e6c8",
          opacity: phase === "hold" ? 1 : 0,
          transform: phase === "hold" ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s",
        }}>
        {title}
      </h2>

      {/* Decorative dots */}
      <div className="flex gap-3 mt-6"
        style={{ opacity: phase === "hold" ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#d4a843", animationDelay: `${i * 200}ms` }} />
        ))}
      </div>
    </div>
  );
}
