import React from "react";
import {
  brutalTarget,
  readBrutal,
  sameBrutal,
  type BrutalHoverState,
} from "@/lib/brutal";

const RESTING_TITLE = "Narula";

/**
 * Full-viewport color wash and giant label (past.jgthms.com/2017-02).
 * Driven by `[data-brutal-*]` on icons and project links.
 */
export function BrutalHover({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = React.useState<BrutalHoverState | null>(null);
  const pointerRef = React.useRef<HTMLElement | null>(null);
  const focusRef = React.useRef<HTMLElement | null>(null);
  const fromPointerRef = React.useRef(false);

  const publish = React.useCallback(() => {
    const el = pointerRef.current ?? focusRef.current;
    const next = el ? readBrutal(el) : null;
    setHover((prev) => (sameBrutal(prev, next) ? prev : next));
  }, []);

  React.useEffect(() => {
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = brutalTarget(event.target);
      publish();
    };

    const onOut = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = brutalTarget(event.relatedTarget);
      publish();
    };

    const onPointerDown = () => {
      fromPointerRef.current = true;
    };

    const onPointerUp = () => {
      window.setTimeout(() => {
        fromPointerRef.current = false;
      }, 0);
    };

    const onFocusIn = (event: FocusEvent) => {
      if (fromPointerRef.current) return;
      focusRef.current = brutalTarget(event.target);
      publish();
    };

    const onFocusOut = (event: FocusEvent) => {
      focusRef.current = brutalTarget(event.relatedTarget);
      publish();
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [publish]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("is-hovering", hover !== null);
    if (hover) {
      root.style.setProperty("--page-wash", hover.color);
    } else {
      root.style.removeProperty("--page-wash");
    }
  }, [hover]);

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
