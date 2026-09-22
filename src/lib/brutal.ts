import type { CSSProperties } from "react";

export type BrutalOptions = {
  title: string;
  color: string;
  /** Dark letters on the color wash. Use for bright accents. */
  invert?: boolean;
};

export type BrutalHoverState = {
  title: string;
  color: string;
  ink: string;
};

const DARK_INK = "rgba(0,0,0,0.78)";
const LIGHT_INK = "#ffffff";

export function brutalInk(invert = false) {
  return invert ? DARK_INK : LIGHT_INK;
}

export function brutalProps({ title, color, invert = false }: BrutalOptions) {
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
  const title = el.dataset.brutalTitle;
  if (!title) return null;
  return {
    title,
    color: el.dataset.brutalColor || "#ff2450",
    ink: brutalInk(el.dataset.brutalInvert === "true"),
  };
}

export function sameBrutal(a: BrutalHoverState | null, b: BrutalHoverState | null) {
  return a?.title === b?.title && a?.color === b?.color && a?.ink === b?.ink;
}
