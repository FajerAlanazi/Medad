import { useState } from "react";
import Stars from "./Stars";
import { PlayerProfile, getLevel, allBadges, CompletedAdventure } from "../data/progress";
import { subjectPresets } from "../data/stories";

interface Props {
  profile: PlayerProfile;
  onStartAdventure: (preset?: (typeof subjectPresets)[0]) => void;
  onEditName: (name: string) => void;
}

function XPBar({ xp, nextXP, color }: { xp: number; nextXP: number; color: string }) {
  const pct = Math.min((xp / nextXP) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5" style={{ color: "#6b7f8e" }}>
        <span>{xp} XP</span>
        <span>{nextXP} XP</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

function AdventureCard({ adv }: { adv: CompletedAdventure }) {
  const stars = adv.stars;
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/5"
      style={{ background: "rgba(17,24,39,0.6)", border: "1px solid rgba(212,168,67,0.1)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: "rgba(212,168,67,0.1)" }}
      >
        {adv.regionEmoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate" style={{ color: "#f0e6c8" }}>{adv.storyTitle}</p>
        <p className="text-xs mt-0.5" style={{ color: "#6b7f8e" }}>
          {adv.region} · {adv.date}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex gap-0.5">
            {[1,2,3].map(s => (
              <span key={s} className="text-xs" style={{ filter: s <= stars ? "none" : "grayscale(1) opacity(0.2)" }}>⭐</span>
            ))}
          </div>
          <span className="text-xs" style={{ color: "#8fa3b0" }}>{adv.pct}٪</span>
          <span className="text-xs" style={{ color: "#4a5568" }}>·</span>
          <span className="text-xs" style={{ color: "#d4a843" }}>+{adv.score} XP</span>
        </div>
      </div>
      <div className="text-lg shrink-0">{adv.characterEmoji}</div>
    </div>
  );
}

export default function DashboardScreen({ profile, onStartAdventure, onEditName }: Props) {
  const levelInfo = getLevel(profile.totalXP);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [activeTab, setActiveTab] = useState<"home" | "badges" | "history">("home");

  const earnedBadgeIds = new Set(profile.badgesEarned);

  return (
    <div className="relative h-full desert-gradient overflow-hidden flex flex-col">
      <Stars count={60} />

      {/* ── HEADER ── */}
      <header
        className="relative z-20 shrink-0 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(212,168,67,0.1)", background: "rgba(9,15,26,0.85)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
              style={{ background: "linear-gradient(135deg, #d4a843, #8b6914)", color: "#090f1a" }}>ر</div>
            <span className="font-display text-base hidden sm:block" style={{ color: "#d4a843" }}>رحّالة المعرفة</span>
          </div>

          {/* Player chip */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
              {editingName ? (
                <form onSubmit={(e) => { e.preventDefault(); onEditName(nameInput); setEditingName(false); }}
                  className="flex items-center gap-2">
                  <input value={nameInput} onChange={e => setNameInput(e.target.value)} autoFocus
                    className="bg-transparent border-b text-sm outline-none px-1 text-center"
                    style={{ borderColor: "#d4a843", color: "#f0e6c8", maxWidth: 120 }} />
                  <button type="submit" className="text-xs" style={{ color: "#d4a843" }}>✓</button>
                </form>
              ) : (
                <button onClick={() => setEditingName(true)} className="text-sm font-bold hover:text-amber-400 transition-colors"
                  style={{ color: "#f0e6c8" }}>
                  {profile.name} ✎
                </button>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ background: `${levelInfo.color}15`, border: `1px solid ${levelInfo.color}30`, color: levelInfo.color }}>
                <span>Lv.{levelInfo.level}</span>
                <span className="font-semibold">{levelInfo.title}</span>
              </div>
            </div>
          </div>

          {/* Total XP */}
          <div className="shrink-0 text-center">
            <div className="font-display text-xl font-bold" style={{ color: "#d4a843" }}>{profile.totalXP}</div>
            <div className="text-xs" style={{ color: "#6b7f8e" }}>XP</div>
          </div>
        </div>
      </header>

      {/* ── TABS ── */}
      <div className="relative z-20 shrink-0 flex gap-1 px-6 pt-4 max-w-4xl mx-auto w-full">
        {[
          { id: "home", label: "الرئيسية", icon: "🏠" },
          { id: "badges", label: "الإنجازات", icon: "🏅" },
          { id: "history", label: "المغامرات", icon: "📖" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? "rgba(212,168,67,0.15)" : "transparent",
              color: activeTab === tab.id ? "#d4a843" : "#6b7f8e",
              border: activeTab === tab.id ? "1px solid rgba(212,168,67,0.25)" : "1px solid transparent",
            }}>
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6 pb-12">

          {/* ── HOME TAB ── */}
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* XP Progress card */}
              <div className="card-glass rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "#6b7f8e" }}>مستواك الحالي</p>
                    <p className="font-display text-2xl font-bold" style={{ color: levelInfo.color }}>{levelInfo.title}</p>
                  </div>
                  <div className="text-5xl animate-float">
                    {levelInfo.level === 1 ? "🌱" : levelInfo.level === 2 ? "🌿" : levelInfo.level === 3 ? "⚔️" : levelInfo.level === 4 ? "🔮" : "👑"}
                  </div>
                </div>
                <XPBar xp={profile.totalXP} nextXP={levelInfo.nextXP} color={levelInfo.color} />
                <p className="text-xs mt-2" style={{ color: "#4a5568" }}>
                  {levelInfo.nextXP - profile.totalXP} نقطة للمستوى التالي
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "🗺️", value: profile.adventures.length, label: "مغامرة" },
                  { icon: "🏅", value: profile.badgesEarned.length, label: "إنجاز" },
                  { icon: "⭐", value: profile.adventures.reduce((a, c) => a + c.stars, 0), label: "نجمة" },
                ].map((stat) => (
                  <div key={stat.label} className="card-glass rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-display text-2xl font-bold" style={{ color: "#d4a843" }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: "#6b7f8e" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Start adventure CTA */}
              <div
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.12), rgba(26,74,62,0.2))", border: "1px solid rgba(212,168,67,0.2)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #d4a843, transparent)" }} />
                <h3 className="font-display text-2xl mb-2" style={{ color: "#f0e6c8" }}>مغامرة جديدة تنتظرك</h3>
                <p className="text-sm mb-5" style={{ color: "#8fa3b0" }}>اختر درسك وانطلق في قلب المملكة</p>
                <div className="flex flex-wrap gap-3">
                  {subjectPresets.filter(p => p.story).map((preset) => (
                    <button key={preset.lesson} onClick={() => onStartAdventure(preset)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.2)", color: "#d4a843" }}>
                      <span>{preset.icon}</span>
                      <span>{preset.lesson}</span>
                    </button>
                  ))}
                  <button onClick={() => onStartAdventure()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8fa3b0" }}>
                    <span>✎</span>
                    <span>موضوع خاص</span>
                  </button>
                </div>
              </div>

              {/* Recent adventure */}
              {profile.adventures.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#6b7f8e" }}>آخر مغامرة</p>
                  <AdventureCard adv={profile.adventures[0]} />
                </div>
              )}
            </div>
          )}

          {/* ── BADGES TAB ── */}
          {activeTab === "badges" && (
            <div>
              <p className="text-sm mb-5" style={{ color: "#6b7f8e" }}>
                {profile.badgesEarned.length} من {allBadges.length} إنجاز مكتسب
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {allBadges.map((badge) => {
                  const earned = earnedBadgeIds.has(badge.id);
                  return (
                    <div key={badge.id}
                      className="rounded-2xl p-5 text-center transition-all"
                      style={{
                        background: earned ? `${badge.color}12` : "rgba(17,24,39,0.5)",
                        border: `1px solid ${earned ? `${badge.color}30` : "rgba(255,255,255,0.05)"}`,
                        filter: earned ? "none" : "grayscale(1) opacity(0.35)",
                      }}>
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <div className="font-bold text-sm mb-1" style={{ color: earned ? badge.color : "#4a5568" }}>
                        {badge.title}
                      </div>
                      <div className="text-xs leading-relaxed" style={{ color: "#6b7f8e" }}>{badge.desc}</div>
                      {earned && (
                        <div className="mt-2 text-xs" style={{ color: badge.color }}>✓ مكتسب</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <div>
              {profile.adventures.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4 opacity-30">📖</div>
                  <p style={{ color: "#6b7f8e" }}>لم تُكمل أي مغامرة بعد</p>
                  <button onClick={() => onStartAdventure()} className="btn-primary mt-6 px-8 py-3 rounded-xl font-bold">
                    ابدأ الآن ✦
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile.adventures.map((adv, i) => (
                    <AdventureCard key={i} adv={adv} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
