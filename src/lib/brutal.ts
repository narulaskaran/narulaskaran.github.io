import type { CSSProperties } from "react";

export type BrutalHoverState = {
  title: string;
  color: string;
  ink: string;
};

const DARK_INK = "rgba(0, 0, 0, 0.78)";
const LIGHT_INK = "#ffffff";

export function brutalInk(invert = false) {
  return invert ? DARK_INK : LIGHT_INK;
}

export type BrutalHoverOptions = {
  title: string;
  color: string;
  /** Dark letters on the color wash (bright accents). */
  invert?: boolean;
};

/** Accent color, wash metadata, and CSS vars for icon hovers. */
export function brutalHoverProps({ title, color, invert = false }: BrutalHoverOptions) {
  return {
    "data-brutal-title": title,
    "data-brutal-color": color,
    "data-brutal-invert": invert ? "true" : "false",
    style: {
      "--brutal-link": color,
      "--brutal-link-ink": brutalInk(invert),
    } as CSSProperties,
  };
}

export function brutalTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest("[data-brutal-title]");
  return el instanceof HTMLElement ? el : null;
}

export function readBrutal(el: HTMLElement): BrutalHoverState | null {
  const washTitle = el.dataset.brutalTitle;
  if (!washTitle) return null;
  return {
    title: washTitle,
    color: el.dataset.brutalColor || "#8bd5ff",
    ink: brutalInk(el.dataset.brutalInvert === "true"),
  };
}

export function sameBrutal(a: BrutalHoverState | null, b: BrutalHoverState | null) {
  return a?.title === b?.title && a?.color === b?.color && a?.ink === b?.ink;
}
