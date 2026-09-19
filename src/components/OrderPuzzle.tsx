import { useState, useEffect } from "react";
import Icon from "./Icons";

interface Props {
  items: string[];
  correctOrder: string[];
  onComplete: (correct: boolean, points: number) => void;
}

export default function OrderPuzzle({ items, correctOrder, onComplete }: Props) {
  const [order, setOrder] = useState<string[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    setOrder([...items].sort(() => Math.random() - 0.5));
  }, []);

  const handleDragStart = (idx: number) => setDragging(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOver(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragging === null || dragging === idx) { setDragging(null); setDragOver(null); return; }
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragging, 1);
    newOrder.splice(idx, 0, moved);
    setOrder(newOrder);
    setDragging(null);
    setDragOver(null);
  };

  const handleCheck = () => {
    const correct = order.every((item, i) => item === correctOrder[i]);
    if (correct) {
      setChecked(true);
      onComplete(true, Math.max(10, 50 - errors * 10));
    } else {
      setErrors((e) => e + 1);
      // Shake effect via state
    }
  };

  const getItemState = (item: string, idx: number) => {
    if (!checked) return "idle";
    return item === correctOrder[idx] ? "correct" : "wrong";
  };

  return (
    <div className="w-full">
      <p className="text-xs mb-4" style={{ color: "#8fa3b0" }}>
        اسحب العناصر لترتيبها بالتسلسل الصحيح (من الأول إلى الأخير)
      </p>

      <div className="space-y-2 mb-5">
        {order.map((item, idx) => {
          const state = getItemState(item, idx);
          const isDraggingThis = dragging === idx;
          const isDragOverThis = dragOver === idx;
          return (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={() => { setDragging(null); setDragOver(null); }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 select-none"
              style={{
                background:
                  state === "correct" ? "rgba(22,101,52,0.5)" :
                  state === "wrong" ? "rgba(127,29,29,0.5)" :
                  isDragOverThis ? "rgba(212,168,67,0.15)" :
                  "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  state === "correct" ? "rgba(74,222,128,0.4)" :
                  state === "wrong" ? "rgba(248,113,113,0.4)" :
                  isDragOverThis ? "#d4a843" :
                  "rgba(212,168,67,0.1)"}`,
                opacity: isDraggingThis ? 0.4 : 1,
                transform: isDragOverThis ? "scale(1.01)" : "scale(1)",
              }}
            >
              {/* Drag handle */}
              <div className="flex flex-col gap-0.5 shrink-0" style={{ color: "#4a5568" }}>
                <div className="w-4 h-0.5 rounded" style={{ background: "currentColor" }} />
                <div className="w-4 h-0.5 rounded" style={{ background: "currentColor" }} />
                <div className="w-4 h-0.5 rounded" style={{ background: "currentColor" }} />
              </div>

              {/* Position number */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: state === "correct" ? "#4ade80" : state === "wrong" ? "#f87171" : "rgba(212,168,67,0.15)",
                  color: state !== "idle" ? "#090f1a" : "#d4a843",
                }}
              >
                {idx + 1}
              </div>

              <span className="text-sm flex-1" style={{ color: "#d4c89e" }}>{item}</span>

              {state === "correct" && <Icon name="check" size={13} className="text-green-400" />}
              {state === "wrong" && <Icon name="cross" size={13} className="text-red-400" />}
            </div>
          );
        })}
      </div>

      {errors > 0 && !checked && (
        <p className="text-xs mb-3" style={{ color: "#f87171" }}>
          الترتيب غير صحيح، حاول مرة أخرى ({errors} محاولة)
        </p>
      )}

      {!checked && (
        <button onClick={handleCheck} className="btn-primary px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2">
          تحقق من الترتيب <Icon name="check" size={14} />
        </button>
      )}

      {checked && (
        <div className="rounded-xl px-5 py-4 text-sm animate-slide-up inline-flex items-center gap-2"
          style={{ background: "rgba(22,101,52,0.4)", border: "1px solid rgba(74,222,128,0.3)", color: "#86efac" }}>
          <Icon name="check" size={15} /> ترتيب صحيح! أحسنت.
        </div>
      )}
    </div>
  );
}
