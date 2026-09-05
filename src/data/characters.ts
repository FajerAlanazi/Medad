export interface Character {
  id: string;
  name: string;
  title: string;
  emoji: string;
  region: string;
  trait: string;
  color: string;
  bgGradient: string;
  bonus: string;
}

export const characters: Character[] = [
  {
    id: "explorer",
    name: "نورة",
    title: "المستكشفة",
    emoji: "🧭",
    region: "الرياض",
    trait: "فضولية وذكية",
    color: "#d4a843",
    bgGradient: "from-amber-900/60 to-yellow-900/40",
    bonus: "+١٠٪ نقاط على الأسئلة العلمية",
  },
  {
    id: "healer",
    name: "فهد",
    title: "الحكيم",
    emoji: "📿",
    region: "الأحساء",
    trait: "صبور وحكيم",
    color: "#7ecdb8",
    bgGradient: "from-teal-900/60 to-emerald-900/40",
    bonus: "+١ تلميح مجاني في كل مغامرة",
  },
  {
    id: "warrior",
    name: "سلمى",
    title: "الشجاعة",
    emoji: "⚔️",
    region: "العُلا",
    trait: "شجاعة وحازمة",
    color: "#c084fc",
    bgGradient: "from-purple-900/60 to-violet-900/40",
    bonus: "+٢٠ نقطة على كل قرار صحيح",
  },
  {
    id: "sage",
    name: "عبدالله",
    title: "العالِم",
    emoji: "🔭",
    region: "الطائف",
    trait: "دقيق وتحليلي",
    color: "#60a5fa",
    bgGradient: "from-blue-900/60 to-indigo-900/40",
    bonus: "يرى تلميحاً إضافياً في الألغاز",
  },
];
