import React from "react";
import {
  brutalTarget,
  readBrutal,
  sameBrutal,
  type BrutalHoverState,
} from "@/lib/brutal";

const RESTING_TITLE = "Narula";

/**
 * Full-viewport color wash and giant label, driven by `[data-brutal-*]`
 * on links and icons. Pointer hovers run only for fine pointers so a tap
 * does not leave the wash stuck on screen.
 */
export function BrutalHover({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = React.useState<BrutalHoverState | null>(null);
  const pointerRef = React.useRef<HTMLElement | null>(null);
  const focusRef = React.useRef<HTMLElement | null>(null);

  const publish = React.useCallback(() => {
    const el = pointerRef.current ?? focusRef.current;
    const next = el ? readBrutal(el) : null;
    setHover((prev) => (sameBrutal(prev, next) ? prev : next));
  }, []);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const onOver = (event: MouseEvent) => {
      if (!fine.matches) return;
      pointerRef.current = brutalTarget(event.target);
      publish();
    };

    const onOut = (event: MouseEvent) => {
      if (!fine.matches) return;
      pointerRef.current = brutalTarget(event.relatedTarget);
      publish();
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (
        fine.matches &&
        target instanceof Element &&
        target.closest("[data-brutal-title]")?.matches(":hover")
      ) {
        return;
      }
      focusRef.current = brutalTarget(target);
      publish();
    };

    const onFocusOut = (event: FocusEvent) => {
      focusRef.current = brutalTarget(event.relatedTarget);
      publish();
    };

    const onClick = () => {
      requestAnimationFrame(() => {
        if (!pointerRef.current && !focusRef.current) return;
        publish();
      });
    };

    const onPointerModeChange = () => {
      if (!fine.matches) {
        pointerRef.current = null;
        publish();
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("click", onClick);
    fine.addEventListener("change", onPointerModeChange);

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("click", onClick);
      fine.removeEventListener("change", onPointerModeChange);
    };
  }, [publish]);

  return (
    <>
      {children}
      <div
        className={hover ? "brutal-title is-active" : "brutal-title"}
        style={
          hover
            ? ({
                "--brutal-color": hover.color,
                "--brutal-ink": hover.ink,
              } as React.CSSProperties)
            : undefined
        }
        aria-hidden="true"
      >
        <div>{hover?.title ?? RESTING_TITLE}</div>
      </div>
    </>
  );
}
