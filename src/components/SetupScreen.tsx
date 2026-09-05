import { useState } from "react";
import Stars from "./Stars";
import { subjectPresets } from "../data/stories";

interface Props {
  initialPreset?: (typeof subjectPresets)[0];
  onGenerate: (lesson: string, grade: string, subject: string) => void;
  onBack: () => void;
}

const grades = [
  "الصف الأول الابتدائي",
  "الصف الثاني الابتدائي",
  "الصف الثالث الابتدائي",
  "الصف الرابع الابتدائي",
  "الصف الخامس الابتدائي",
  "الصف السادس الابتدائي",
  "الصف الأول المتوسط",
  "الصف الثاني المتوسط",
  "الصف الثالث المتوسط",
];

export default function SetupScreen({ initialPreset, onGenerate, onBack }: Props) {
  const [lesson, setLesson] = useState(initialPreset?.lesson ?? "");
  const [grade, setGrade] = useState(initialPreset?.grade ? grades.find(g => g.includes(initialPreset.grade.replace("الصف ",""))) ?? grades[4] : grades[4]);
  const [subject, setSubject] = useState(initialPreset?.subject ?? "");
  const [customMode, setCustomMode] = useState(!initialPreset);

  const canSubmit = lesson.trim().length > 0;

  return (
    <div className="relative h-full desert-gradient overflow-y-auto">
      <Stars count={60} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-amber-400"
          style={{ color: "#8fa3b0" }}
        >
          <span>→</span>
          العودة للرئيسية
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4 animate-float inline-block">✦</div>
          <h1 className="font-display text-4xl mb-3" style={{ color: "#f0e6c8" }}>
            جهّز مغامرتك
          </h1>
          <p style={{ color: "#8fa3b0" }}>أخبر الذكاء الاصطناعي بدرسك وسيبني لك عالماً كاملاً</p>
        </div>

        {/* Card */}
        <div className="card-glass rounded-3xl p-8 space-y-6">
          {/* Preset pills */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#d4a843" }}>
              اختر من الدروس المتاحة أو أدخل موضوعك
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {subjectPresets.map((p) => (
                <button
                  key={p.lesson}
                  onClick={() => {
                    setLesson(p.lesson);
                    setSubject(p.subject);
                    setCustomMode(false);
                  }}
                  className="px-4 py-2 rounded-full text-sm transition-all"
                  style={{
                    background: lesson === p.lesson ? "rgba(212,168,67,0.25)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${lesson === p.lesson ? "#d4a843" : "rgba(212,168,67,0.15)"}`,
                    color: lesson === p.lesson ? "#d4a843" : "#8fa3b0",
                  }}
                >
                  {p.icon} {p.lesson}
                </button>
              ))}
              <button
                onClick={() => { setLesson(""); setCustomMode(true); }}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  background: customMode && !lesson ? "rgba(212,168,67,0.25)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${customMode && !lesson ? "#d4a843" : "rgba(212,168,67,0.15)"}`,
                  color: customMode && !lesson ? "#d4a843" : "#8fa3b0",
                }}
              >
                ✎ موضوع خاص
              </button>
            </div>
          </div>

          {/* Lesson input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#a8b9c8" }}>
              موضوع الدرس *
            </label>
            <input
              type="text"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              placeholder="مثال: دورة الماء، تكاثر النباتات، الكسور..."
              className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,168,67,0.2)",
                color: "#f0e6c8",
                caretColor: "#d4a843",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d4a843")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.2)")}
            />
          </div>

          {/* Subject input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#a8b9c8" }}>
              المادة الدراسية
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="مثال: علوم الأرض، الرياضيات، الأحياء..."
              className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,168,67,0.2)",
                color: "#f0e6c8",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d4a843")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.2)")}
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#a8b9c8" }}>
              المرحلة الدراسية
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all appearance-none"
              style={{
                background: "rgba(17,24,39,0.9)",
                border: "1px solid rgba(212,168,67,0.2)",
                color: "#f0e6c8",
              }}
            >
              {grades.map((g) => (
                <option key={g} value={g} style={{ background: "#111827" }}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Info box */}
          <div
            className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: "rgba(26,74,62,0.25)", border: "1px solid rgba(126,205,184,0.15)", color: "#7ecdb8" }}
          >
            <span className="font-bold">الذكاء الاصطناعي سيبني لك: </span>
            قصة تفاعلية في منطقة سعودية مناسبة، مع تحديات وأسئلة مرتبطة بمفاهيم الدرس، وتغذية راجعة فورية تساعدك على الفهم.
          </div>

          {/* Submit */}
          <button
            onClick={() => canSubmit && onGenerate(lesson, grade, subject)}
            disabled={!canSubmit}
            className="w-full py-5 rounded-xl text-lg font-bold transition-all"
            style={{
              background: canSubmit ? "linear-gradient(135deg, #d4a843, #b8892e)" : "rgba(255,255,255,0.05)",
              color: canSubmit ? "#090f1a" : "#4a5568",
              cursor: canSubmit ? "pointer" : "not-allowed",
              boxShadow: canSubmit ? "0 8px 30px rgba(212,168,67,0.25)" : "none",
            }}
          >
            {canSubmit ? "ابنِ مغامرتي ✦" : "أدخل موضوع الدرس أولاً"}
          </button>
        </div>
      </div>
    </div>
  );
}
