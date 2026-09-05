import { useState } from "react";
import Stars from "./Stars";
import { characters, Character } from "../data/characters";

interface Props {
  onSelect: (character: Character) => void;
  onBack: () => void;
}

export default function CharacterScreen({ onSelect, onBack }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleConfirm = () => {
    const char = characters.find((c) => c.id === selected);
    if (char) onSelect(char);
  };

  return (
    <div className="relative h-full desert-gradient overflow-y-auto">
      <Stars count={90} />

      {/* Decorative top ornament */}
      <div className="relative z-10 pt-10 pb-4 text-center">
        <button
          onClick={onBack}
          className="absolute right-6 top-6 text-sm transition-colors hover:text-amber-400 flex items-center gap-2"
          style={{ color: "#8fa3b0" }}
        >
          <span>→</span> رجوع
        </button>

        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #d4a843)" }} />
          <span className="ornament text-3xl">❋</span>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #d4a843)" }} />
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#f0e6c8" }}>
          اختر بطلك
        </h1>
        <p className="text-sm" style={{ color: "#8fa3b0" }}>
          كل بطل يحمل مهارة خاصة تساعدك في المغامرة
        </p>
      </div>

      {/* Character grid */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        {characters.map((char) => {
          const isSelected = selected === char.id;
          const isHovered = hovered === char.id;
          return (
            <button
              key={char.id}
              onClick={() => setSelected(char.id)}
              onMouseEnter={() => setHovered(char.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-3xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${char.color}30, ${char.color}15)`
                  : "rgba(17,24,39,0.6)",
                border: isSelected
                  ? `2px solid ${char.color}`
                  : isHovered
                  ? `1px solid ${char.color}60`
                  : "1px solid rgba(212,168,67,0.1)",
                transform: isSelected ? "translateY(-6px)" : isHovered ? "translateY(-2px)" : "none",
                boxShadow: isSelected ? `0 20px 40px ${char.color}25` : "none",
              }}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <div
                  className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: char.color, color: "#090f1a" }}
                >
                  ✓
                </div>
              )}

              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 transition-transform duration-300"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${char.color}40, ${char.color}10)`,
                  border: `2px solid ${char.color}40`,
                  transform: isSelected || isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                {char.emoji}
              </div>

              <div className="font-display text-xl mb-1" style={{ color: "#f0e6c8" }}>
                {char.name}
              </div>
              <div
                className="text-xs font-semibold mb-3 px-3 py-1 rounded-full"
                style={{ background: `${char.color}20`, color: char.color }}
              >
                {char.title}
              </div>
              <div className="text-xs mb-2" style={{ color: "#6b7f8e" }}>
                📍 {char.region}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "#8fa3b0" }}>
                {char.trait}
              </div>

              {/* Bonus badge */}
              <div
                className="mt-3 w-full rounded-xl px-3 py-2 text-xs leading-relaxed"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${char.color}25`,
                  color: char.color,
                }}
              >
                ✦ {char.bonus}
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirm CTA */}
      <div className="relative z-10 flex justify-center pb-16 px-6">
        <div className="text-center">
          {selected && (
            <p className="text-sm mb-4 animate-fade-in" style={{ color: "#8fa3b0" }}>
              اخترت{" "}
              <strong style={{ color: characters.find((c) => c.id === selected)?.color }}>
                {characters.find((c) => c.id === selected)?.name} — {characters.find((c) => c.id === selected)?.title}
              </strong>
            </p>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="px-12 py-4 rounded-xl text-lg font-bold transition-all"
            style={{
              background: selected ? "linear-gradient(135deg, #d4a843, #b8892e)" : "rgba(255,255,255,0.05)",
              color: selected ? "#090f1a" : "#4a5568",
              cursor: selected ? "pointer" : "not-allowed",
              boxShadow: selected ? "0 8px 30px rgba(212,168,67,0.3)" : "none",
            }}
          >
            {selected ? "انطلق في المغامرة ✦" : "اختر بطلك أولاً"}
          </button>
        </div>
      </div>
    </div>
  );
}
