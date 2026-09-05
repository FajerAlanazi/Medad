import { useState, useEffect } from "react";
import Stars from "./Stars";
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
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const el = document.querySelector(".landing-scroll");
    const onScroll = () => setScrollY(el?.scrollTop ?? 0);
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveFeature((p) => (p + 1) % 3), 3500);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: "🗺️", title: "استكشف مناطق المملكة", desc: "١٣ منطقة سعودية حقيقية تصبح مسرحاً لمغامراتك التعليمية" },
    { icon: "🤖", title: "ذكاء اصطناعي تكيّفي", desc: "يتعلم من أدائك ويضبط الصعوبة والتلميحات في الوقت الفعلي" },
    { icon: "🏆", title: "تعلّم حقيقي قابل للقياس", desc: "تقارير مفصلة تُظهر تحقق الفهم لكل مفهوم دراسي" },
  ];

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
        <div className="absolute bottom-14 right-8 text-8xl opacity-15 pointer-events-none select-none"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}>🌴</div>
        <div className="absolute bottom-20 right-36 text-5xl opacity-10 pointer-events-none select-none"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}>🌴</div>
        <div className="absolute bottom-16 left-8 text-6xl opacity-10 pointer-events-none select-none">🌴</div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #d4a843, #8b6914)" }}>
              <span className="text-sm font-bold" style={{ color: "#090f1a" }}>م</span>
            </div>
            <span className="font-display text-lg" style={{ color: "#d4a843" }}>مداد</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#6b7f8e" }}>
            {["كيف يعمل؟", "المواد الدراسية", "للمعلمين", "القصص"].map((item) => (
              <a key={item} href="#" className="hover:text-amber-400 transition-colors">{item}</a>
            ))}
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
            <span className="ornament text-lg">❋ ✦ ❋</span>
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
            <button onClick={() => onStart()} className="btn-primary px-12 py-5 rounded-2xl text-xl font-black animate-pulse-glow">
              ابدأ المغامرة ✦
            </button>
            <button className="px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/5 flex items-center gap-2"
              style={{ color: "#8fa3b0", border: "1px solid rgba(212,168,67,0.15)" }}>
              <span>▶</span> شاهد كيف يعمل
            </button>
          </div>

          {/* Animated feature strip */}
          <div className="card-glass rounded-2xl p-5 max-w-lg mx-auto animate-slide-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}>
            {features.map((f, i) => (
              <div key={i} className={`transition-all duration-500 ${i === activeFeature ? "block" : "hidden"}`}>
                <div className="flex items-center gap-4 text-right">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ color: "#d4a843" }}>{f.title}</div>
                    <div className="text-sm" style={{ color: "#8fa3b0" }}>{f.desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-3">
              {features.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === activeFeature ? 24 : 6, background: i === activeFeature ? "#d4a843" : "rgba(212,168,67,0.2)" }} />
              ))}
            </div>
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
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {preset.icon}
                  </div>
                  <div className="text-xs font-bold mb-1.5" style={{ color: "#d4a843" }}>{preset.subject}</div>
                  <div className="font-display text-lg mb-1.5" style={{ color: "#f0e6c8" }}>{preset.lesson}</div>
                  <div className="text-xs mb-3" style={{ color: "#6b7f8e" }}>
                    {preset.regionEmoji} {preset.region}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6b7f8e" }}>
                      <span>⏱</span><span>{preset.duration}</span>
                    </div>
                    {preset.story ? (
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                        style={{ background: "rgba(212,168,67,0.15)", color: "#d4a843" }}>
                        متاح ✦
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
              className="px-10 py-4 rounded-xl font-bold transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(212,168,67,0.2)", color: "#8fa3b0" }}>
              ✎ أو أدخل موضوعاً خاصاً بك
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
            {[
              { step: "١", icon: "📚", title: "اختر درسك", desc: "حدد المادة والمرحلة الدراسية" },
              { step: "٢", icon: "🤖", title: "الذكاء يبني", desc: "يصنع قصة تفاعلية في منطقة سعودية" },
              { step: "٣", icon: "⚔️", title: "عِش المغامرة", desc: "قرارات وألغاز وتحديات حقيقية" },
              { step: "٤", icon: "📊", title: "احصد النتائج", desc: "تقرير مفصل لما أتقنته وما تحتاجه" },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                {/* Connector line */}
                {i < 3 && (
                  <div className="absolute top-8 left-0 w-full hidden md:block" style={{ height: 1 }}>
                    <div className="h-full mx-auto" style={{ marginLeft: "60%", marginRight: "-60%", background: "linear-gradient(to right, rgba(212,168,67,0.3), transparent)" }} />
                  </div>
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
                  <span className="text-2xl">{s.icon}</span>
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

      {/* ── STATS + CTA ── */}
      <section style={{ background: "#0a1120" }} className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[
              { num: "+٢٠٠", label: "مغامرة تعليمية", icon: "📖" },
              { num: "١٣", label: "منطقة سعودية", icon: "🗺️" },
              { num: "٩٨٪", label: "نسبة رضا الطلاب", icon: "⭐" },
            ].map((s) => (
              <div key={s.label} className="text-center card-glass rounded-2xl p-6">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display text-3xl font-bold mb-1" style={{ color: "#d4a843" }}>{s.num}</div>
                <div className="text-xs" style={{ color: "#6b7f8e" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center card-glass rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.3), transparent 60%)" }} />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: "#f0e6c8" }}>
                ابدأ رحلتك اليوم
              </h2>
              <p className="mb-8 text-base" style={{ color: "#8fa3b0" }}>
                انضم لآلاف الطلاب الذين يتعلمون بالقصة والمغامرة
              </p>
              <button onClick={() => onStart()} className="btn-primary px-14 py-5 rounded-2xl text-xl font-black">
                ابدأ مجاناً ✦
              </button>
              <p className="mt-4 text-xs" style={{ color: "#4a5568" }}>لا يحتاج تسجيل — ابدأ مباشرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#090f1a", borderTop: "1px solid rgba(212,168,67,0.08)", color: "#4a5568" }}
        className="px-8 py-6 flex items-center justify-between text-xs">
        <span>مداد © ١٤٤٦هـ</span>
        <div className="flex items-center gap-2">
          <span className="ornament text-amber-600">❋</span>
          <span>صُنع بفخر في المملكة العربية السعودية</span>
        </div>
      </footer>
    </div>
  );
}
