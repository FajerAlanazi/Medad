import { IconName } from "../components/Icons";

export interface CompletedAdventure {
  storyId: string;
  storyTitle: string;
  region: string;
  regionIcon: IconName;
  score: number;
  maxScore: number;
  pct: number;
  stars: number;
  conceptsMastered: string[];
  characterId: string;
  characterIcon: IconName;
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

/** Wipes all saved progress (XP, adventures, badges) and returns a fresh profile. */
export function resetProfile(): PlayerProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  return { ...defaultProfile, joinDate: new Date().toLocaleDateString("ar-SA") };
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

export function getLevel(xp: number): { level: number; title: string; nextXP: number; color: string; icon: IconName } {
  const thresholds: { xp: number; level: number; title: string; color: string; icon: IconName }[] = [
    { xp: 0,    level: 1, title: "مستكشف مبتدئ",   color: "#8fa3b0", icon: "sprout" },
    { xp: 100,  level: 2, title: "رحّالة الواحة",    color: "#7ecdb8", icon: "leaf" },
    { xp: 250,  level: 3, title: "فارس المعرفة",    color: "#60a5fa", icon: "sword" },
    { xp: 500,  level: 4, title: "حكيم الصحراء",    color: "#c084fc", icon: "crystal-ball" },
    { xp: 900,  level: 5, title: "أسطورة المملكة",  color: "#d4a843", icon: "crown" },
  ];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i].xp) {
      const next = thresholds[i + 1];
      return {
        level: thresholds[i].level,
        title: thresholds[i].title,
        nextXP: next ? next.xp : thresholds[i].xp,
        color: thresholds[i].color,
        icon: thresholds[i].icon,
      };
    }
  }
  return { level: 1, title: "مستكشف مبتدئ", nextXP: 100, color: "#8fa3b0", icon: "sprout" };
}

export const allBadges: { id: string; icon: IconName; title: string; desc: string; color: string }[] = [
  { id: "first_adventure", icon: "sword",        title: "أول مغامرة", desc: "أكملت مغامرتك الأولى", color: "#d4a843" },
  { id: "three_star",      icon: "star",         title: "ثلاث نجوم",  desc: "حصلت على ٣ نجوم",         color: "#f0d070" },
  { id: "perfectionist",   icon: "trophy",       title: "المثالي",    desc: "فوق ٩٠٪ في مغامرة",      color: "#f0c050" },
  { id: "explorer",        icon: "map",          title: "المستكشف",  desc: "أكملت ٣ مغامرات",         color: "#7ecdb8" },
  { id: "veteran",         icon: "medal-ribbon", title: "المحارب",   desc: "أكملت ٥ مغامرات",         color: "#c084fc" },
  { id: "xp_500",          icon: "sparkle-swirl",title: "٥٠٠ نقطة",  desc: "تجاوزت ٥٠٠ نقطة XP",     color: "#60a5fa" },
  { id: "scholar",         icon: "book-stack",   title: "العالِم",    desc: "أتقنت ١٠ مفاهيم",         color: "#86efac" },
  { id: "saudi_heart",     icon: "palm-tree",    title: "ابن الوطن", desc: "زرت ٣ مناطق سعودية",      color: "#f97316" },
];
