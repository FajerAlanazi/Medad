import { Character } from "../data/characters";
import Icon from "./Icons";

interface GreetProps {
  character: Character;
  variant: "greet";
  size?: number;
}

interface ListenProps {
  character: Character;
  variant: "listen";
  size?: number;
  label?: string;
  /** Compact mode: name only, no "focus" sub-line — for tight header bars. */
  compact?: boolean;
}

type Props = GreetProps | ListenProps;

/**
 * CharacterCompanion — the child's chosen character shown alongside them.
 *
 * variant="greet"  → big pose + waving hand + speech bubble with the
 *                     character's own greeting line. Used right when the
 *                     child arrives at a screen (e.g. MapScreen briefing).
 * variant="listen" → small pose with a pulsing focus ring + breathing
 *                     animation + blinking dots, signalling the companion
 *                     is "with" the child while they read/answer. Used in
 *                     AdventureScreen's header.
 */
export default function CharacterCompanion(props: Props) {
  const { character, variant } = props;

  if (variant === "greet") {
    const size = props.size ?? 220;
    return (
      <div className="flex flex-col items-center text-center">
        <div
          className="animate-bubble-in rounded-2xl px-5 py-3 mb-3 max-w-xs text-sm font-semibold"
          style={{
            background: "rgba(17,24,39,0.75)",
            border: `1px solid ${character.color}45`,
            color: "#f0e6c8",
            borderRadius: "18px 18px 18px 4px",
          }}
        >
          {character.greeting}
        </div>
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: size * 0.95,
              height: size * 0.95,
              background: `radial-gradient(circle, ${character.color}33, transparent 70%)`,
            }}
          />
          <img
            src={character.image}
            alt={character.name}
            className="animate-idle-bob relative"
            style={{
              height: size,
              objectFit: "contain",
              filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.5))",
            }}
          />
          <span
            className="animate-wave-hand absolute"
            style={{ top: "10%", right: "6%", color: character.color }}
          >
            <Icon name="waving-hand" size={size * 0.16} filled />
          </span>
        </div>
      </div>
    );
  }

  const size = props.size ?? 56;
  const compact = props.compact ?? false;
  const label = props.label ?? `${character.name} يستمع معك`;
  return (
    <div
      className={`flex items-center gap-2 rounded-full ${compact ? "px-2 py-1" : "px-3 py-2"}`}
      style={{ background: `${character.color}12`, border: `1px solid ${character.color}30` }}
    >
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <div
          className="animate-ring-pulse absolute inset-0 rounded-full"
          style={{ border: `2px solid ${character.color}` }}
        />
        <img
          src={character.image}
          alt={character.name}
          className="animate-listen-breathe relative"
          style={{ height: size * 1.15, objectFit: "contain", objectPosition: "top", marginTop: -size * 0.08 }}
        />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold truncate hidden sm:block" style={{ color: character.color }}>{label}</div>
        {!compact && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-semibold hidden sm:inline" style={{ color: "#6b7f8e" }}>في وضع التركيز</span>
            <span className="flex items-center gap-0.5 mr-1">
              <span className="animate-dot-blink w-1 h-1 rounded-full" style={{ background: character.color }} />
              <span className="animate-dot-blink w-1 h-1 rounded-full" style={{ background: character.color, animationDelay: ".2s" }} />
              <span className="animate-dot-blink w-1 h-1 rounded-full" style={{ background: character.color, animationDelay: ".4s" }} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
