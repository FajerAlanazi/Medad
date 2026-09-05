import { useEffect, useState } from "react";
import Stars from "./Stars";
import { Story } from "../data/stories";
import { Character } from "../data/characters";

interface Props {
  story: Story;
  character: Character;
  score: number;
  maxScore: number;
  conceptsMastered: string[];
  onRestart: () => void;
  onHome: () => void;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  desc: string;
  earned: boolean;
  color: string;
}

export default function ResultsScreen({ story, character, score, maxScore, conceptsMastered, onRestart, onHome }: Props) {
  const pct = Math.round((score / maxScore) * 100);
  const clamped = Math.min(pct, 100);
  const stars = clamped >= 85 ? 3 : clamped >= 60 ? 2 : 1;
  const level = clamped >= 85 ? "بطل" : clamped >= 60 ? "متقدم" : "مبتدئ";
  const levelColor = clamped >= 85 ? "#d4a843" : clamped >= 60 ? "#7ecdb8" : "#8fa3b0";
  const allConcepts = story.concepts;
  const [animScore, setAnimScore] = useState(0);

  const achievements: Achievement[] = [
    {
      id: "first_blood",
      icon: "⚔️",
      title: "أول انتصار",
      desc: "أكملت مغامرتك الأولى",
      earned: true,
      color: "#d4a843",
    },
    {
      id: "perfectionist",
      icon: "🏆",
      title: "المثالي",
      desc: "أجبت على كل شيء صحيحاً",
      earned: clamped >= 90,
      color: "#f0d070",
    },
    {
      id: "scholar",
      icon: "📚",
      title: "العالِم",
      desc: `أتقنت ${conceptsMastered.length} مفاهيم`,
      earned: conceptsMastered.length >= 3,
      color: "#7ecdb8",
    },
    {
      id: "noHints",
      icon: "🧠",
      title: "بلا تلميح",
      desc: "أكملت المغامرة دون طلب تلميح",
      earned: clamped >= 70,
      color: "#c084fc",
    },
    {
      id: "saudi",
      icon: "🌴",
      title: "ابن الوطن",
      desc: "استكشفت منطقة سعودية جديدة",
      earned: true,
      color: "#60a5fa",
    },
  ];

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const step = clamped / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= clamped) { setAnimScore(clamped); clearInterval(interval); }
      else setAnimScore(Math.round(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [clamped]);

  const circumference = 2 * Math.PI * 52;

  return (
    <div className="relative h-full desert-gradient overflow-y-auto">
      <Stars count={100} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        {/* Hero section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float inline-block">
            {clamped >= 85 ? "🏆" : clamped >= 60 ? "🌟" : "📖"}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: `${levelColor}20`, border: `1px solid ${levelColor}40`, color: levelColor }}>
            <span className="text-lg">{character.emoji}</span>
            {character.name} — مستوى {level}
          </div>

          <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#f0e6c8" }}>
            {clamped >= 85 ? "أداء رائع!" : clamped >= 60 ? "عمل جيد!" : "واصل التعلم!"}
          </h1>
          <p className="text-sm" style={{ color: "#6b7f8e" }}>{story.title}</p>
        </div>

        {/* Stars + Score ring */}
        <div className="flex items-center justify-center gap-12 mb-8">
          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <span key={s} className="text-4xl transition-all duration-500"
                style={{ filter: s <= stars ? "none" : "grayscale(1) opacity(0.15)", animationDelay: `${s * 200}ms` }}>
                ⭐
              </span>
            ))}
          </div>

          {/* Score ring */}
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#d4a843" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${circumference * (animScore / 100)} ${circumference}`}
                style={{ transition: "stroke-dasharray 0.05s linear" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold" style={{ color: "#d4a843" }}>{animScore}٪</span>
              <span className="text-xs" style={{ color: "#6b7f8e" }}>{score}/{maxScore}</span>
            </div>
          </div>
        </div>

        {/* Concepts mastery */}
        <div className="card-glass rounded-2xl p-5 mb-5">
          <h3 className="text-sm font-bold mb-4" style={{ color: "#d4a843" }}>📊 تقرير المفاهيم</h3>
          <div className="space-y-2.5">
            {allConcepts.map((c) => {
              const mastered = conceptsMastered.includes(c);
              const barW = mastered ? "100%" : "30%";
              return (
                <div key={c}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                      style={{
                        background: mastered ? "rgba(22,101,52,0.4)" : "rgba(255,255,255,0.05)",
                        color: mastered ? "#4ade80" : "#4a5568",
                      }}>
                      {mastered ? "✓ مُتقَن" : "يحتاج مراجعة"}
                    </span>
                    <span className="text-sm" style={{ color: mastered ? "#d4c89e" : "#6b7f8e" }}>{c}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: barW, background: mastered ? "linear-gradient(90deg, #1a4a3e, #4ade80)" : "rgba(100,116,139,0.3)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="rounded-2xl p-5 mb-5 text-right text-sm leading-loose"
          style={{ background: "rgba(26,74,62,0.2)", border: "1px solid rgba(126,205,184,0.15)", color: "#a8c8be" }}>
          <p className="font-bold mb-2" style={{ color: "#7ecdb8" }}>🤖 تقييم الذكاء الاصطناعي:</p>
          {clamped >= 85 ? (
            <p>تفوّقت في فهم {story.subject.split("—")[1]?.trim() || story.subject}! يمكنك الانتقال لمواضيع أكثر تعقيداً. جرب مغامرتنا القادمة في منطقة جديدة.</p>
          ) : clamped >= 60 ? (
            <p>أداء جيد! ننصح بمراجعة <strong style={{ color: "#7ecdb8" }}>{allConcepts.filter((c) => !conceptsMastered.includes(c)).join(" و") || "المفاهيم الأساسية"}</strong> قبل الانتقال للمستوى التالي.</p>
          ) : (
            <p>أنت في بداية رحلة رائعة! أعد المغامرة مرة أخرى — المحاولة الثانية دائماً أفضل بكثير.</p>
          )}
        </div>

        {/* Achievements */}
        <div className="card-glass rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-bold mb-4" style={{ color: "#d4a843" }}>🏅 الإنجازات المكتسبة</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="flex flex-col items-center text-center p-3 rounded-xl transition-all"
                style={{
                  background: ach.earned ? `${ach.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${ach.earned ? `${ach.color}30` : "rgba(255,255,255,0.05)"}`,
                  filter: ach.earned ? "none" : "grayscale(1) opacity(0.35)",
                }}
              >
                <span className="text-2xl mb-1">{ach.icon}</span>
                <span className="text-xs font-bold leading-tight" style={{ color: ach.earned ? ach.color : "#4a5568" }}>
                  {ach.title}
                </span>
                <span className="text-xs mt-1 leading-tight" style={{ color: "#6b7f8e" }}>
                  {ach.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onRestart} className="btn-primary px-8 py-4 rounded-xl font-bold">
            العب مرة أخرى ↺
          </button>
          <button onClick={onHome}
            className="px-8 py-4 rounded-xl font-bold transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(212,168,67,0.2)", color: "#8fa3b0" }}>
            اختر مغامرة جديدة
          </button>
        </div>

        <p className="mt-8 text-xs text-center" style={{ color: "#4a5568" }}>
          شارك نتيجتك مع معلمك ✦ {story.region} • {story.grade}
        </p>
      </div>
    </div>
  );
}
