import React from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Magnetic pull toward the pointer, written to `--mag-x`/`--mag-y` on each match. */
export function useMagnetic(selector: string, enabled = true, radius = 90, strength = 0.28) {
  React.useEffect(() => {
    if (!enabled || prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    let frame = 0;
    let px = -9999;
    let py = -9999;
    const apply = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const pull = d < radius ? (1 - d / radius) * strength : 0;
        el.style.setProperty("--mag-x", `${dx * pull}px`);
        el.style.setProperty("--mag-y", `${dy * pull}px`);
      });
    };
    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [selector, enabled, radius, strength]);
}
