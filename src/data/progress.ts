export interface CompletedAdventure {
  storyId: string;
  storyTitle: string;
  region: string;
  regionEmoji: string;
  score: number;
  maxScore: number;
  pct: number;
  stars: number;
  conceptsMastered: string[];
  characterId: string;
  characterEmoji: string;
  date: string;
}

export interface PlayerProfile {
  name: string;
  totalXP: number;
  adventures: CompletedAdventure[];
  badgesEarned: string[];
  joinDate: string;
}

const STORAGE_KEY = "rahhala_profile";

export const defaultProfile: PlayerProfile = {
  name: "الطالب",
  totalXP: 0,
  adventures: [],
  badgesEarned: [],
  joinDate: new Date().toLocaleDateString("ar-SA"),
};

export function loadProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PlayerProfile;
  } catch {}
  return { ...defaultProfile };
}

export function saveProfile(profile: PlayerProfile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

export function addAdventureToProfile(
  profile: PlayerProfile,
  adventure: CompletedAdventure
): PlayerProfile {
  const updated: PlayerProfile = {
    ...profile,
    totalXP: profile.totalXP + adventure.score,
    adventures: [adventure, ...profile.adventures].slice(0, 20),
  };
  // Auto-award badges
  const badges = new Set(profile.badgesEarned);
  if (adventure.pct >= 90) badges.add("perfectionist");
  if (adventure.stars === 3) badges.add("three_star");
  if (updated.adventures.length >= 1) badges.add("first_adventure");
  if (updated.adventures.length >= 3) badges.add("explorer");
  if (updated.adventures.length >= 5) badges.add("veteran");
  if (updated.totalXP >= 500) badges.add("xp_500");
  updated.badgesEarned = Array.from(badges);
  saveProfile(updated);
  return updated;
}

export function getLevel(xp: number): { level: number; title: string; nextXP: number; color: string } {
  const thresholds = [
    { xp: 0,    level: 1, title: "مستكشف مبتدئ",   color: "#8fa3b0" },
    { xp: 100,  level: 2, title: "رحّالة الواحة",    color: "#7ecdb8" },
    { xp: 250,  level: 3, title: "فارس المعرفة",    color: "#60a5fa" },
    { xp: 500,  level: 4, title: "حكيم الصحراء",    color: "#c084fc" },
    { xp: 900,  level: 5, title: "أسطورة المملكة",  color: "#d4a843" },
  ];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i].xp) {
      const next = thresholds[i + 1];
      return {
        level: thresholds[i].level,
        title: thresholds[i].title,
        nextXP: next ? next.xp : thresholds[i].xp,
        color: thresholds[i].color,
      };
    }
  }
  return { level: 1, title: "مستكشف مبتدئ", nextXP: 100, color: "#8fa3b0" };
}

export const allBadges = [
  { id: "first_adventure", icon: "⚔️", title: "أول مغامرة", desc: "أكملت مغامرتك الأولى", color: "#d4a843" },
  { id: "three_star",      icon: "🌟", title: "ثلاث نجوم",  desc: "حصلت على ٣ نجوم",         color: "#f0d070" },
  { id: "perfectionist",  icon: "🏆", title: "المثالي",    desc: "فوق ٩٠٪ في مغامرة",      color: "#f0c050" },
  { id: "explorer",       icon: "🗺️", title: "المستكشف",  desc: "أكملت ٣ مغامرات",         color: "#7ecdb8" },
  { id: "veteran",        icon: "🎖️", title: "المحارب",   desc: "أكملت ٥ مغامرات",         color: "#c084fc" },
  { id: "xp_500",         icon: "💫", title: "٥٠٠ نقطة",  desc: "تجاوزت ٥٠٠ نقطة XP",     color: "#60a5fa" },
  { id: "scholar",        icon: "📚", title: "العالِم",    desc: "أتقنت ١٠ مفاهيم",         color: "#86efac" },
  { id: "saudi_heart",    icon: "🌴", title: "ابن الوطن", desc: "زرت ٣ مناطق سعودية",      color: "#f97316" },
];
