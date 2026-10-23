import React from "react";
import {
  brutalTarget,
  readBrutal,
  sameBrutal,
  type BrutalHoverState,
} from "@/lib/brutal";

/**
 * Full-viewport color wash and giant label (past.jgthms.com/2017-05).
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
      focusRef.current = null;
      publish();
    };

    const onPointerUp = () => {
      window.setTimeout(() => {
        fromPointerRef.current = false;
      }, 0);
    };

    const onFocusIn = (event: FocusEvent) => {
      if (fromPointerRef.current) return;
      const target = brutalTarget(event.target);
      focusRef.current = target?.matches(":focus-visible") ? target : null;
      publish();
    };

    const onFocusOut = () => {
      focusRef.current = null;
      publish();
    };

    const onWindowBlur = () => {
      pointerRef.current = null;
      focusRef.current = null;
      fromPointerRef.current = false;
      publish();
    };

    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("blur", onWindowBlur);
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
      root.style.setProperty("--page-ink", hover.ink);
    }
  }, [hover]);

  React.useEffect(() => () => {
    const root = document.documentElement;
    root.classList.remove("is-hovering");
    root.style.removeProperty("--page-wash");
    root.style.removeProperty("--page-ink");
  }, []);

  const probeRef = React.useRef<HTMLDivElement>(null);

  // One font size for every hover word: the largest that fits the longest of them.
  React.useLayoutEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;
    const root = document.documentElement;

    const fit = () => {
      const titles = new Set<string>();
      document
        .querySelectorAll<HTMLElement>("[data-brutal-title]")
        .forEach((el) => {
          if (el.dataset.brutalTitle) titles.add(el.dataset.brutalTitle);
        });

      probe.replaceChildren(
        ...[...titles].map((title) => {
          const word = document.createElement("span");
          word.textContent = title;
          return word;
        }),
      );

      const style = getComputedStyle(probe);
      const avail =
        probe.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      const widest = Math.max(
        0,
        ...[...probe.children].map((el) => el.getBoundingClientRect().width),
      );

      if (widest > avail && widest > 0) {
        root.style.setProperty(
          "--brutal-size",
          `${(parseFloat(style.fontSize) * avail) / widest}px`,
        );
      } else {
        root.style.removeProperty("--brutal-size");
      }
    };

    let timer: number | undefined;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fit, 100);
    };

    fit();
    void document.fonts?.ready.then(fit);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      root.style.removeProperty("--brutal-size");
    };
  }, []);

  return (
    <>
      {children}
      <div className="brutal-wash" aria-hidden="true" />
      <div ref={probeRef} className="brutal-title brutal-probe" aria-hidden="true" />
      {hover ? (
        <div
          className="brutal-title is-active"
          style={
            {
              "--brutal-color": hover.color,
              "--brutal-ink": hover.ink,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <div>{hover.title}</div>
        </div>
      ) : null}
    </>
  );
}
