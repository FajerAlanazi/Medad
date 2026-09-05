import { useState, useEffect } from "react";
import { MatchPair } from "../data/stories";

interface Props {
  pairs: MatchPair[];
  onComplete: (correct: boolean, points: number) => void;
}

type MatchState = "idle" | "selected" | "matched" | "wrong";

export default function MatchPuzzle({ pairs, onComplete }: Props) {
  const [shuffledDefs, setShuffledDefs] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ term: string; def: string } | null>(null);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const defs = [...pairs.map((p) => p.definition)].sort(() => Math.random() - 0.5);
    setShuffledDefs(defs);
  }, [pairs]);

  const handleTermClick = (term: string) => {
    if (matched.has(term) || completed) return;
    setSelectedTerm(term);
    setSelectedDef(null);
    setWrongPair(null);
  };

  const handleDefClick = (def: string) => {
    if (completed) return;
    const alreadyMatchedTerm = pairs.find((p) => p.definition === def && matched.has(p.term));
    if (alreadyMatchedTerm) return;

    if (!selectedTerm) return;
    setSelectedDef(def);

    const correctPair = pairs.find((p) => p.term === selectedTerm);
    if (correctPair && correctPair.definition === def) {
      const newMatched = new Set(matched);
      newMatched.add(selectedTerm);
      setMatched(newMatched);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (newMatched.size === pairs.length) {
        setTimeout(() => {
          setCompleted(true);
          const points = Math.max(0, 50 - errors * 10);
          onComplete(true, points);
        }, 600);
      }
    } else {
      setWrongPair({ term: selectedTerm, def });
      setErrors((e) => e + 1);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 900);
    }
  };

  const isTermMatched = (term: string) => matched.has(term);
  const isDefMatched = (def: string) => {
    return pairs.some((p) => p.definition === def && matched.has(p.term));
  };

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="text-sm mb-5 px-1" style={{ color: "#8fa3b0" }}>
        انقر على مفهوم في العمود الأيمن ثم اختر تعريفه المناسب في العمود الأيسر
      </div>

      {/* Errors indicator */}
      {errors > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: "#f87171" }}>
          <span>✗ أخطاء: {errors}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Terms column (right) */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-center pb-1" style={{ color: "#d4a843", borderBottom: "1px solid rgba(212,168,67,0.15)" }}>
            المفهوم
          </p>
          {pairs.map((pair) => {
            const isMatched = isTermMatched(pair.term);
            const isSelected = selectedTerm === pair.term;
            const isWrong = wrongPair?.term === pair.term;
            return (
              <button
                key={pair.term}
                onClick={() => handleTermClick(pair.term)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200"
                style={{
                  background: isMatched
                    ? "rgba(22,101,52,0.5)"
                    : isSelected
                    ? "rgba(212,168,67,0.2)"
                    : isWrong
                    ? "rgba(127,29,29,0.5)"
                    : "rgba(255,255,255,0.05)",
                  border: isMatched
                    ? "1px solid rgba(74,222,128,0.4)"
                    : isSelected
                    ? "1px solid #d4a843"
                    : isWrong
                    ? "1px solid rgba(248,113,113,0.4)"
                    : "1px solid rgba(212,168,67,0.12)",
                  color: isMatched ? "#4ade80" : isSelected ? "#d4a843" : isWrong ? "#f87171" : "#d4c89e",
                  cursor: isMatched ? "default" : "pointer",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
              >
                {isMatched ? "✓ " : ""}{pair.term}
              </button>
            );
          })}
        </div>

        {/* Definitions column (left) */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-center pb-1" style={{ color: "#7ecdb8", borderBottom: "1px solid rgba(126,205,184,0.15)" }}>
            التعريف
          </p>
          {shuffledDefs.map((def) => {
            const isMatched = isDefMatched(def);
            const isSelected = selectedDef === def;
            const isWrong = wrongPair?.def === def;
            return (
              <button
                key={def}
                onClick={() => handleDefClick(def)}
                className="px-4 py-3 rounded-xl text-xs text-right leading-relaxed transition-all duration-200"
                style={{
                  background: isMatched
                    ? "rgba(22,101,52,0.4)"
                    : isSelected
                    ? "rgba(126,205,184,0.15)"
                    : isWrong
                    ? "rgba(127,29,29,0.4)"
                    : "rgba(255,255,255,0.04)",
                  border: isMatched
                    ? "1px solid rgba(74,222,128,0.35)"
                    : isSelected
                    ? "1px solid rgba(126,205,184,0.5)"
                    : isWrong
                    ? "1px solid rgba(248,113,113,0.35)"
                    : "1px solid rgba(126,205,184,0.1)",
                  color: isMatched ? "#4ade80" : isWrong ? "#f87171" : "#a8b9c8",
                  cursor: isMatched ? "default" : "pointer",
                }}
              >
                {def}
              </button>
            );
          })}
        </div>
      </div>

      {completed && (
        <div
          className="mt-5 rounded-xl px-5 py-4 text-center animate-slide-up"
          style={{ background: "rgba(22,101,52,0.4)", border: "1px solid rgba(74,222,128,0.3)", color: "#86efac" }}
        >
          <span className="text-lg font-bold">✓ أحسنت! ربطت جميع المفاهيم بشكل صحيح</span>
        </div>
      )}
    </div>
  );
}
