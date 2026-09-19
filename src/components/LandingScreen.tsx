import { useState, useEffect } from "react";
import Stars from "./Stars";
import Icon, { IconName } from "./Icons";
import { subjectPresets } from "../data/stories";

interface Props {
  onStart: (preset?: (typeof subjectPresets)[0]) => void;
}

function Fireflies() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 3,
            height: 3 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${30 + Math.random() * 60}%`,
            background: `rgba(${i % 2 === 0 ? "212,168,67" : "126,205,184"},0.7)`,
            boxShadow: `0 0 8px 2px rgba(${i % 2 === 0 ? "212,168,67" : "126,205,184"},0.4)`,
            animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingScreen({ onStart }: Props) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = document.querySelector(".landing-scroll");
    const onScroll = () => setScrollY(el?.scrollTop ?? 0);
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-scroll h-full overflow-y-auto">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen overflow-hidden desert-gradient">
        <Stars count={140} />
        <Fireflies />

        {/* Parallax moon */}
        <div
          className="absolute top-12 left-14 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 35% 35%, #f5e070, #c9970a)",
            boxShadow: "0 0 50px rgba(212,168,67,0.45), 0 0 100px rgba(212,168,67,0.18)",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/3 right-12 w-6 h-6 rounded-full animate-float opacity-40"
          style={{ background: "#7ecdb8", boxShadow: "0 0 20px #7ecdb8", animationDelay: "1s" }} />
        <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full animate-float opacity-30"
          style={{ background: "#d4a843", boxShadow: "0 0 16px #d4a843", animationDelay: "2.5s" }} />

        {/* Layered dune silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
          <svg viewBox="0 0 1440 280" fill="none" className="w-full">
            <path d="M0 280 L0 200 Q200 120 400 180 Q600 240 800 160 Q1000 80 1200 150 Q1380 200 1440 140 L1440 280Z"
              fill="rgba(30,18,6,0.5)" />
            <path d="M0 280 L0 230 Q150 170 300 210 Q450 250 600 205 Q750 160 900 195 Q1050 230 1200 200 Q1320 175 1440 190 L1440 280Z"
              fill="rgba(20,12,4,0.7)" />
            <path d="M0 280 L0 250 Q100 225 200 245 Q300 265 400 240 Q500 215 600 240 Q700 265 800 248 Q900 230 1000 248 Q1100 266 1200 252 Q1320 238 1440 256 L1440 280Z"
              fill="rgba(10,6,2,0.95)" />
          </svg>
        </div>

        {/* Palm trees */}
        <div className="absolute bottom-14 right-8 opacity-15 pointer-events-none select-none"
          style={{ transform: `translateY(${scrollY * 0.05}px)`, color: "#d4a843" }}><Icon name="palm-tree" size={110} /></div>
        <div className="absolute bottom-20 right-36 opacity-10 pointer-events-none select-none"
          style={{ transform: `translateY(${scrollY * 0.03}px)`, color: "#d4a843" }}><Icon name="palm-tree" size={64} /></div>
        <div className="absolute bottom-16 left-8 opacity-10 pointer-events-none select-none" style={{ color: "#d4a843" }}><Icon name="palm-tree" size={80} /></div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #d4a843, #8b6914)" }}>
              <span className="text-sm font-bold" style={{ color: "#090f1a" }}>م</span>
            </div>
            <span className="font-display text-lg" style={{ color: "#d4a843" }}>مداد</span>
          </div>
          <button onClick={() => onStart()}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold hidden sm:block">
            ابدأ مجاناً
          </button>
        </nav>

        {/* Hero content */}
        <main className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-48 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, #d4a84360)" }} />
            <span className="ornament text-lg flex items-center gap-2">
              <Icon name="ornament" size={18} /> <Icon name="sparkle" size={14} filled /> <Icon name="ornament" size={18} />
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, #d4a84360)" }} />
          </div>

          <p className="text-xs tracking-[0.3em] mb-5 animate-fade-in" style={{ color: "#6b7f8e" }}>
            منصة التعلم التفاعلي الذكي — المملكة العربية السعودية
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}>
            <span className="text-shimmer">تعلّم وأنت</span>
            <br />
            <span style={{ color: "#f0e6c8" }}>بطل القصة</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-loose animate-slide-up"
            style={{ color: "#a8b9c8", animationDelay: "0.2s", opacity: 0 }}>
            الذكاء الاصطناعي يحوّل دروسك الدراسية إلى مغامرات تفاعلية
            <br />في قلب المناطق السعودية الأصيلة
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: "0.35s", opacity: 0 }}>
            <button onClick={() => onStart()} className="btn-primary px-12 py-5 rounded-2xl text-xl font-black animate-pulse-glow inline-flex items-center gap-2">
              ابدأ المغامرة <Icon name="sparkle" size={20} filled />
            </button>
          </div>
        </main>
      </section>

      {/* ── SUBJECT PRESETS ── */}
      <section style={{ background: "#0a1120" }} className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: "#f0e6c8" }}>
              اختر درسك واستعد للرحلة
            </h2>
            <p style={{ color: "#6b7f8e" }}>مغامرات جاهزة أو أدخل موضوعك الخاص</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {subjectPresets.map((preset, i) => (
              <button
                key={preset.lesson}
                onClick={() => onStart(preset)}
                className="group relative rounded-3xl p-6 text-right cursor-pointer transition-all duration-250 hover:-translate-y-2 overflow-hidden"
                style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(212,168,67,0.1)" }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,168,67,0.08), transparent 70%)" }} />

                <div className="relative z-10">
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110 inline-block" style={{ color: "#d4a843" }}>
                    <Icon name={preset.icon} size={40} />
                  </div>
                  <div className="text-xs font-bold mb-1.5" style={{ color: "#d4a843" }}>{preset.subject}</div>
                  <div className="font-display text-lg mb-1.5" style={{ color: "#f0e6c8" }}>{preset.lesson}</div>
                  <div className="text-xs mb-3 flex items-center gap-1" style={{ color: "#6b7f8e" }}>
                    <Icon name={preset.regionIcon} size={12} /> {preset.region}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6b7f8e" }}>
                      <Icon name="clock" size={12} /><span>{preset.duration}</span>
                    </div>
                    {preset.story ? (
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1"
                        style={{ background: "rgba(212,168,67,0.15)", color: "#d4a843" }}>
                        متاح <Icon name="sparkle" size={10} filled />
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#4a5568" }}>
                        قريباً
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => onStart()}
              className="px-10 py-4 rounded-xl font-bold transition-all hover:bg-white/5 inline-flex items-center gap-2"
              style={{ border: "1px solid rgba(212,168,67,0.2)", color: "#8fa3b0" }}>
              <Icon name="pencil" size={14} /> أو أدخل موضوعاً خاصاً بك
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#090f1a" }} className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,168,67,0.08), transparent 60%)" }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: "#f0e6c8" }}>
              كيف تعمل المغامرة؟
            </h2>
            <p style={{ color: "#6b7f8e" }}>أربع خطوات تحوّل الدرس إلى تجربة لا تُنسى</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { step: "١", icon: "book-stack", title: "اختر درسك", desc: "حدد المادة والمرحلة الدراسية" },
              { step: "٢", icon: "robot", title: "الذكاء يبني", desc: "يصنع قصة تفاعلية في منطقة سعودية" },
              { step: "٣", icon: "sword", title: "عِش المغامرة", desc: "قرارات وألغاز وتحديات حقيقية" },
              { step: "٤", icon: "chart", title: "احصد النتائج", desc: "تقرير مفصل لما أتقنته وما تحتاجه" },
            ] as { step: string; icon: IconName; title: string; desc: string }[]).map((s, i) => (
              <div key={i} className="text-center relative">
                {/* Connector line */}
                {i < 3 && (
                  <div className="absolute top-8 left-0 w-full hidden md:block" style={{ height: 1 }}>
                    <div className="h-full mx-auto" style={{ marginLeft: "60%", marginRight: "-60%", background: "linear-gradient(to right, rgba(212,168,67,0.3), transparent)" }} />
                  </div>
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
                  <Icon name={s.icon} size={24} style={{ color: "#d4a843" }} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ background: "#d4a843", color: "#090f1a" }}>{s.step}</span>
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#f0e6c8" }}>{s.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#6b7f8e" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#090f1a", borderTop: "1px solid rgba(212,168,67,0.08)", color: "#4a5568" }}
        className="px-8 py-6 flex items-center justify-between text-xs">
        <span>مداد © ١٤٤٨هـ</span>
        <div className="flex items-center gap-2">
          <Icon name="ornament" size={14} className="ornament text-amber-600" />
          <span>صُنع بفخر في المملكة العربية السعودية</span>
        </div>
      </footer>
    </div>
  );
}
