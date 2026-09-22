import type { CSSProperties } from "react";

const DARK_INK = "rgba(0,0,0,0.82)";
const LIGHT_INK = "#ffffff";

/** Accent color for an icon or project tile hover. */
export function iconTone(color: string, invert = false) {
  return {
    style: {
      "--brutal-link": color,
      "--brutal-link-ink": invert ? DARK_INK : LIGHT_INK,
    } as CSSProperties,
  };
}
