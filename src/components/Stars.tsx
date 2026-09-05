import { useMemo } from "react";

export default function Stars({ count = 80 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        duration: `${Math.random() * 4 + 2}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.7 + 0.2,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            "--duration": s.duration,
            "--delay": s.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
