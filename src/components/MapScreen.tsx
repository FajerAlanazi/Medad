import { useState } from "react";
import Stars from "./Stars";
import { stories, Story } from "../data/stories";
import { Character } from "../data/characters";

interface Props {
  character: Character;
  targetStory: Story;
  onBegin: () => void;
  onBack: () => void;
}

const saudiRegions = [
  { name: "الرياض", x: 52, y: 42, emoji: "🏙️" },
  { name: "جدة", x: 25, y: 50, emoji: "⚓" },
  { name: "مكة المكرمة", x: 24, y: 52, emoji: "🕋" },
  { name: "المدينة المنورة", x: 28, y: 38, emoji: "🌙" },
  { name: "الدمام", x: 70, y: 40, emoji: "🛢️" },
  { name: "واحة الأحساء", x: 72, y: 52, emoji: "🌴", story: "water-cycle-ahsa" },
  { name: "الربع الخالي", x: 55, y: 68, emoji: "🏜️", story: "food-chains-rub-al-khali" },
  { name: "العُلا", x: 28, y: 28, emoji: "🏛️" },
  { name: "أبها", x: 34, y: 65, emoji: "🌿" },
  { name: "تبوك", x: 20, y: 22, emoji: "🌊" },
  { name: "الطائف", x: 30, y: 56, emoji: "🌹" },
  { name: "حائل", x: 45, y: 28, emoji: "🐪" },
];

export default function MapScreen({ character, targetStory, onBegin, onBack }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleBegin = () => {
    setAnimating(true);
    setTimeout(onBegin, 1000);
  };

  return (
    <div className="relative h-full desert-gradient overflow-y-auto">
      <Stars count={70} />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(212,168,67,0.1)" }}>
        <button
          onClick={onBack}
          className="text-sm flex items-center gap-2 transition-colors hover:text-amber-400"
          style={{ color: "#8fa3b0" }}
        >
          <span>→</span> رجوع
        </button>
        {/* Character chip */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{ background: `${character.color}15`, border: `1px solid ${character.color}40` }}>
          <span className="text-xl">{character.emoji}</span>
          <span className="text-sm font-semibold" style={{ color: character.color }}>
            {character.name} — {character.title}
          </span>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <p className="text-sm tracking-widest mb-2" style={{ color: "#6b7f8e" }}>وجهتك</p>
          <h1 className="font-display text-3xl md:text-4xl mb-1" style={{ color: "#f0e6c8" }}>
            {targetStory.regionEmoji} {targetStory.region}
          </h1>
          <p className="text-base" style={{ color: "#8fa3b0" }}>{targetStory.title}</p>
        </div>

        {/* Map container */}
        <div
          className="relative rounded-3xl overflow-hidden mb-8"
          style={{
            background: "linear-gradient(145deg, #0d1825, #1a2535)",
            border: "1px solid rgba(212,168,67,0.15)",
            aspectRatio: "16/9",
            minHeight: 320,
          }}
        >
          {/* Saudi outline approximation as SVG */}
          <svg
            viewBox="0 0 100 90"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* KSA approximate outline */}
            <path
              d="M18,15 L22,8 L35,5 L45,4 L62,5 L75,8 L82,12 L85,18 L87,25 L85,35 L82,42 L80,50 L78,60 L72,70 L65,78 L55,82 L45,80 L38,75 L32,68 L25,62 L18,55 L14,45 L12,35 L14,25 Z"
              fill="rgba(212,168,67,0.06)"
              stroke="rgba(212,168,67,0.2)"
              strokeWidth="0.5"
            />
            {/* Grid lines */}
            {[20, 40, 60, 80].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="90" stroke="rgba(212,168,67,0.04)" strokeWidth="0.3" />
            ))}
            {[20, 40, 60, 80].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(212,168,67,0.04)" strokeWidth="0.3" />
            ))}

            {/* Region markers */}
            {saudiRegions.map((region) => {
              const isTarget = region.story === targetStory.id;
              const isHovered = hoveredRegion === region.name;
              const hasStory = !!region.story;

              return (
                <g key={region.name}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ cursor: hasStory ? "pointer" : "default" }}>
                  {/* Pulse ring for target */}
                  {isTarget && (
                    <>
                      <circle cx={region.x} cy={region.y} r="5" fill="none"
                        stroke="#d4a843" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="r" from="3" to="8" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  {/* Dot */}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={isTarget ? 2.5 : 1.5}
                    fill={isTarget ? "#d4a843" : hasStory ? "#7ecdb8" : "rgba(212,168,67,0.3)"}
                  />
                  {/* Label */}
                  <text
                    x={region.x}
                    y={region.y - 4}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill={isTarget ? "#d4a843" : isHovered ? "#f0e6c8" : "rgba(240,230,200,0.5)"}
                    fontFamily="Cairo, sans-serif"
                  >
                    {region.name}
                  </text>
                </g>
              );
            })}

            {/* Journey path — dotted line from center to target */}
            <line
              x1="52" y1="42"
              x2={targetStory.mapPosition.x}
              y2={targetStory.mapPosition.y}
              stroke="#d4a843"
              strokeWidth="0.4"
              strokeDasharray="2 1.5"
              opacity="0.5"
            />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-xs" style={{ color: "#6b7f8e" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#d4a843" }} />
              <span>وجهتك</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#7ecdb8" }} />
              <span>مغامرة متاحة</span>
            </div>
          </div>
        </div>

        {/* Story briefing card */}
        <div className="card-glass rounded-3xl p-6 mb-8">
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}
            >
              {targetStory.regionEmoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(212,168,67,0.15)", color: "#d4a843" }}>
                  {targetStory.subject}
                </span>
                <span className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", color: "#8fa3b0" }}>
                  ⏱ {targetStory.duration}
                </span>
                <span className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", color: "#8fa3b0" }}>
                  {targetStory.difficulty}
                </span>
              </div>
              <h3 className="font-display text-xl mb-2" style={{ color: "#f0e6c8" }}>
                {targetStory.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8fa3b0" }}>
                {targetStory.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {targetStory.concepts.map((c) => (
                  <span key={c} className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "rgba(26,74,62,0.4)", color: "#7ecdb8", border: "1px solid rgba(126,205,184,0.15)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Character special ability reminder */}
        <div className="rounded-2xl p-4 mb-8 flex items-center gap-4"
          style={{ background: `${character.color}10`, border: `1px solid ${character.color}30` }}>
          <span className="text-2xl">{character.emoji}</span>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: character.color }}>
              ميزة {character.name} في هذه المغامرة:
            </p>
            <p className="text-sm" style={{ color: "#a8b9c8" }}>{character.bonus}</p>
          </div>
        </div>

        {/* Begin button */}
        <div className="text-center">
          <button
            onClick={handleBegin}
            className="btn-primary px-16 py-5 rounded-2xl text-xl font-bold animate-pulse-glow"
            style={{ opacity: animating ? 0.7 : 1 }}
          >
            {animating ? "جارٍ الانطلاق..." : `انطلق إلى ${targetStory.region} ✦`}
          </button>
        </div>
      </div>
    </div>
  );
}
