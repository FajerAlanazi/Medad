import { CSSProperties } from "react";

export type IconName =
  | "compass" | "map" | "trophy" | "book" | "book-stack" | "brain" | "robot"
  | "target" | "puzzle" | "link" | "lock" | "bulb" | "medal" | "medal-ribbon"
  | "home" | "sprout" | "leaf" | "crystal-ball" | "crown" | "sparkle" | "sparkle-swirl"
  | "ornament" | "anchor" | "cube" | "moon" | "barrel" | "dune" | "columns" | "wave"
  | "rose" | "camel" | "eagle" | "mosque" | "jar" | "droplet" | "gear" | "masks"
  | "warning" | "undo" | "chart" | "pencil" | "check" | "cross" | "pin" | "clock"
  | "arrow-left" | "arrow-right" | "star" | "sword" | "telescope" | "palm-tree"
  | "beads" | "flag" | "shield" | "play" | "waving-hand";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Fill instead of stroke, for solid glyphs like a rating star. */
  filled?: boolean;
}

/**
 * A small line-icon set used throughout مداد instead of emoji, so every
 * glyph actually takes the app's colors (emoji ignore `color`) and stays
 * crisp at any size. Kept intentionally simple/geometric to match the
 * app's minimal gold-on-navy aesthetic.
 */
export default function Icon({ name, size = 20, className, style, filled = false }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    style,
  };
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "compass":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5l-2 5-5 2 2-5z" />
        </svg>
      );
    case "map":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M7 4h10v5a5 5 0 01-10 0z" />
          <path d="M7 5H4a3 3 0 003 3M17 5h3a3 3 0 01-3 3" />
          <path d="M12 14v3M9 20h6M8.5 20l.5-3h6l.5 3" />
        </svg>
      );
    case "book":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 5.5A2.5 2.5 0 016.5 3H12v18H6.5A2.5 2.5 0 014 18.5z" />
          <path d="M20 5.5A2.5 2.5 0 0017.5 3H12v18h5.5a2.5 2.5 0 002.5-2.5z" />
        </svg>
      );
    case "book-stack":
      return (
        <svg {...common} {...strokeProps}>
          <rect x="4" y="4" width="12" height="3.2" rx="0.8" />
          <rect x="4" y="9" width="16" height="3.2" rx="0.8" />
          <rect x="4" y="14" width="9" height="3.2" rx="0.8" />
          <path d="M4 19.5h16" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8V15a3 3 0 003 3 3 3 0 003 3V4z" />
          <path d="M15 4a3 3 0 013 3 3 3 0 011 5.8V15a3 3 0 01-3 3 3 3 0 01-3 3V4z" />
        </svg>
      );
    case "robot":
      return (
        <svg {...common} {...strokeProps}>
          <rect x="5" y="9" width="14" height="10" rx="2.5" />
          <path d="M12 3v3.5M9 13.5h.01M15 13.5h.01M9 17h6" />
          <path d="M3 12.5h2M19 12.5h2" />
        </svg>
      );
    case "target":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M9 4h4v2.2a1.8 1.8 0 003.6 0V4H20v4.4a1.8 1.8 0 000 3.6V20h-4.2a1.8 1.8 0 00-3.6 0V20H8v-4.2a1.8 1.8 0 000-3.6z" />
        </svg>
      );
    case "link":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M10 14a4 4 0 005.7.2l2.1-2.1a4 4 0 00-5.6-5.6l-1.2 1.1" />
          <path d="M14 10a4 4 0 00-5.7-.2L6.2 11.9a4 4 0 005.6 5.6l1.1-1.1" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common} {...strokeProps}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
        </svg>
      );
    case "medal":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="14.5" r="5.5" />
          <path d="M9.5 10L7 3.5h3L12 8l2-4.5h3L14.5 10" />
          <path d="M12 12.2l1 2.1 2.3.2-1.7 1.5.5 2.3-2.1-1.2-2.1 1.2.5-2.3-1.7-1.5 2.3-.2z" />
        </svg>
      );
    case "medal-ribbon":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="9" r="5.5" />
          <path d="M9 13.5L7 20l5-2.3L17 20l-2-6.5" />
          <path d="M12 6.3l.9 1.9 2.1.2-1.6 1.4.5 2.1-1.9-1.1-1.9 1.1.5-2.1-1.6-1.4 2.1-.2z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 11l8-7 8 7" />
          <path d="M6 9.5V20h12V9.5" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 21V11" />
          <path d="M12 12C12 8 9 6 5 6c0 4 3 6.5 7 6z" />
          <path d="M12 10c0-3 2.5-5 6-5 0 3.5-2.5 5.8-6 6z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M5 19c9 1 14-4 14-14C10 5 5 10 5 19z" />
          <path d="M6 18c3-4 6-6.5 11-10" />
        </svg>
      );
    case "crystal-ball":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="10" r="6.5" />
          <path d="M6 20h12M8.5 20l1-3M15.5 20l-1-3" />
          <path d="M9 8a3 3 0 013-3" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 18h16l-1.4-8-4.1 3.2L12 7l-2.5 6.2L5.4 10z" />
          <path d="M4 20.5h16" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common} {...strokeProps} strokeWidth={filled ? 0 : 1.6} fill={filled ? "currentColor" : "none"}>
          <path d="M12 3l1.8 5.6L19.5 10.5l-5.7 1.9L12 18l-1.8-5.6L4.5 10.5l5.7-1.9z" />
        </svg>
      );
    case "sparkle-swirl":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 4l1.3 4L17 9.5l-3.7 1.5L12 15l-1.3-4L7 9.5l3.7-1.5z" />
          <path d="M18 16l.6 1.8L20.5 18.4l-1.9.6L18 21l-.6-1.9-1.9-.7 1.9-.6z" />
        </svg>
      );
    case "ornament":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 3v18M6 8l6 4-6 4M18 8l-6 4 6 4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "anchor":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v13M7 13H5a7 7 0 007 7 7 7 0 007-7h-2" />
          <path d="M8 10h8" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
          <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M20 14.5A8.5 8.5 0 1110 3a7 7 0 0010 11.5z" />
        </svg>
      );
    case "barrel":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M7 4h10l1.2 8L17 20H7l-1.2-8z" />
          <path d="M6.3 8.5h11.4M6.8 15.5h10.4" />
        </svg>
      );
    case "dune":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M2 17c3-4 6-1 9-3s5-6 11-4" />
          <path d="M2 20h20" />
          <circle cx="17" cy="6" r="2" />
        </svg>
      );
    case "columns":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 8l8-4 8 4M5 8v11M9.5 8v11M14.5 8v11M19 8v11M3 21h18" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M2 15c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6-0.2" />
          <path d="M2 19c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6-.2" />
        </svg>
      );
    case "rose":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="7" r="4" />
          <path d="M12 11v10M9 21h6M8 15c-2 0-3-1.5-3-3M16 15c2 0 3-1.5 3-3" />
        </svg>
      );
    case "camel":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M3 18c1-4 3-5 4-5 .5-2 2-3 3-1 .5-2.5 2-3 3-1.5.8-1.2 2-1.2 2.5.5 1 .2 2 1.5 3 1v6" />
          <path d="M3 18h15M18 18v-4M18 14a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          <path d="M6 18l-.8 3M11 18l.3 3" />
        </svg>
      );
    case "eagle":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 5c2 3 6 4 10 3-2 4-6 5-8 4.5L12 19l-2-6.5C8 13 4 12 2 8c4 1 8 0 10-3z" />
        </svg>
      );
    case "mosque":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 20V12a3.5 3.5 0 017 0v8M13 20V12a3.5 3.5 0 017 0v8" />
          <path d="M2 20h20M9.5 6.5a2 2 0 013 0" />
          <path d="M3 12l2-3M21 12l-2-3" />
        </svg>
      );
    case "jar":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M9 3h6v3l1.5 2v11a2 2 0 01-2 2h-5a2 2 0 01-2-2V8L9 6z" />
          <path d="M9.5 12h5" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5M18.4 18.4l-1.5-1.5M7.1 7.1L5.6 5.6" />
        </svg>
      );
    case "masks":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 6c3 0 4 2 4 4.5 0 3.5-2 5.5-4 5.5-1 0-1.5-1-1.5-2.5" />
          <path d="M20 6c-3 0-4 2-4 4.5 0 3.5 2 5.5 4 5.5 1 0 1.5-1 1.5-2.5" />
          <circle cx="6.5" cy="9.5" r=".6" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="9.5" r=".6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 4l9 16H3z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
      );
    case "undo":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M7 8H4V5" />
          <path d="M4.5 8A8 8 0 1112 20" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 20V10M11 20V4M18 20v-7" />
          <path d="M2 20h20" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 20l1-4.2L15.8 5A2 2 0 0118.6 7.8L7.7 18.6z" />
          <path d="M13.5 6.5l4 4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M4 12.5l5 5L20 7" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} strokeWidth={filled ? 0 : 1.6} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8z" />
        </svg>
      );
    case "sword":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M14.5 3.5L20.5 9.5 11 19l-3-3z" />
          <path d="M8 16l-4.5 4.5M9 12.5l-3 3M6 15.5l1.7 1.7" />
        </svg>
      );
    case "telescope":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M3 15l12-6.5 2 3.8L5 19z" />
          <path d="M14 10l3.5-2M12 20l-2.5-4.5M6 20l2-3.5" />
          <circle cx="18" cy="6.5" r="1.4" />
        </svg>
      );
    case "palm-tree":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 21V11" />
          <path d="M12 11c-2-3-6-3-8-1 2 2.5 5 3 8 1zM12 11c2-3 6-3 8-1-2 2.5-5 3-8 1zM12 11c-1-3-1-5 0-7 1 2 1 4 0 7z" />
        </svg>
      );
    case "beads":
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="8" cy="5" r="1.6" />
          <circle cx="13" cy="4.5" r="1.6" />
          <circle cx="17.5" cy="7" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
          <circle cx="17" cy="17" r="1.6" />
          <circle cx="12" cy="19.5" r="1.6" />
          <circle cx="7" cy="17.5" r="1.6" />
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="6" cy="8.5" r="1.6" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M5 21V4" />
          <path d="M5 4h13l-3 4 3 4H5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} {...strokeProps}>
          <path d="M12 3l7 3v6c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} strokeWidth={filled ? 0 : 1.8} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4l14 8-14 8z" />
        </svg>
      );
    case "waving-hand":
      return (
        <svg {...common} strokeWidth={filled ? 0 : 1.8} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12.5V6a1.5 1.5 0 013 0v5M11 11V4.5a1.5 1.5 0 013 0V11M14 11.2V6a1.5 1.5 0 013 0v8" />
          <path d="M17 11.5a1.5 1.5 0 013 0v3.5c0 3.5-2.5 6-6.5 6-3 0-4.5-1-6-3l-3-4.5c-.6-1 .3-2.3 1.5-2 .6.2 1 .5 1.3 1L9 14" />
          <path d="M5.5 3c-.8.8-1.2 1.7-1.2 2.7" />
        </svg>
      );
    default:
      return null;
  }
}
