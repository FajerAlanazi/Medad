import malakImg from "../assets/characters/malak.png";
import fahadImg from "../assets/characters/fahad.png";
import salemImg from "../assets/characters/salem.png";
import danaImg from "../assets/characters/dana.png";
import { IconName } from "../components/Icons";

export interface Character {
  id: string;
  name: string;
  title: string;
  icon: IconName;
  image: string;
  region: string;
  trait: string;
  color: string;
  bgGradient: string;
  bonus: string;
  greeting: string;
}

export const characters: Character[] = [
  {
    id: "explorer",
    name: "ملك",
    title: "المستكشفة",
    icon: "compass",
    image: malakImg,
    region: "جدة",
    trait: "فضولية وذكية",
    color: "#c084fc",
    bgGradient: "from-purple-900/60 to-violet-900/40",
    bonus: "+١٠٪ نقاط على الأسئلة العلمية",
    greeting: "أهلاً فيك! أنا ملك، ومتحمسة أتعلم وياك اليوم",
  },
  {
    id: "healer",
    name: "فهد",
    title: "الفارس الشجاع",
    icon: "sword",
    image: fahadImg,
    region: "العُلا",
    trait: "شجاع ومغامر",
    color: "#d4a843",
    bgGradient: "from-amber-900/60 to-yellow-900/40",
    bonus: "+١ تلميح مجاني في كل مغامرة",
    greeting: "هلا والله! أنا فهد، جاهز لأقوى مغامرة تعلّم",
  },
  {
    id: "warrior",
    name: "سالم",
    title: "الحكيم الهادئ",
    icon: "beads",
    image: salemImg,
    region: "الأحساء",
    trait: "هادئ وذكي",
    color: "#7ecdb8",
    bgGradient: "from-teal-900/60 to-emerald-900/40",
    bonus: "+٢٠ نقطة على كل قرار صحيح",
    greeting: "مرحباً بك، أنا سالم. خلّنا نبدأ بهدوء ونتعلم خطوة خطوة",
  },
  {
    id: "sage",
    name: "دانة",
    title: "الودودة المتحمسة",
    icon: "telescope",
    image: danaImg,
    region: "الطائف",
    trait: "ودودة ومتحمسة",
    color: "#60a5fa",
    bgGradient: "from-blue-900/60 to-indigo-900/40",
    bonus: "يرى تلميحاً إضافياً في الألغاز",
    greeting: "يا هلا فيك! أنا دانة، وايد متحمسة إنك جيت",
  },
];
