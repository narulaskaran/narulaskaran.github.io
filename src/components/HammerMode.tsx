import * as React from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import type { BugProject, BugSocialLink } from "@/components/BugMode";

export type HammerProject = BugProject;
export type HammerSocialLink = BugSocialLink;

const NAILS: Array<{
  mark: HammerProject["mark"];
  left: string;
  color: string;
}> = [
  { mark: "party", left: "26.17%", color: "#714b9e" },
  { mark: "receipt", left: "37.89%", color: "#3b63b8" },
  { mark: "aqi", left: "49.69%", color: "#3d845c" },
  { mark: "seam", left: "61.56%", color: "#ce8c38" },
  { mark: "twitter", left: "73.44%", color: "#c7343a" },
];

/** Broad bottom of the hammer face, as a fraction of the hammer graphic. */
const STRIKE = { x: 0.142, y: 0.947 };
const HOVER_LIFT_PX = 10;

const WINDUP_MS = 210;
const STRIKE_MS = 250;
const FOLLOW_THROUGH_MS = 45;
const RECOVERY_MS = 155;
const SWING_MS = WINDUP_MS + STRIKE_MS + FOLLOW_THROUGH_MS + RECOVERY_MS;
const IMPACT_AT_MS = WINDUP_MS + STRIKE_MS;
const REDIRECT_AT_MS = SWING_MS + 240;

const SOCIAL_HIT_CLASS: Record<string, string> = {
  LinkedIn: "social-hit-linkedin",
  GitHub: "social-hit-github",
  "Ko-fi": "social-hit-kofi",
};

type Pose = { tx: number; ty: number; theta: number };

function formatPose({ tx, ty, theta }: Pose) {
  return `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${theta.toFixed(2)}deg)`;
}

function nailContact(nail: HTMLElement) {
  const rect = nail.getBoundingClientRect();
  const currentTy = new DOMMatrix(getComputedStyle(nail).transform).m42 || 0;
  const settledTop = rect.top - currentTy - HOVER_LIFT_PX;
  return {
    x: rect.left + rect.width / 2,
    y: settledTop + rect.height * 0.05,
  };
}

/** Pose that plants the hammer face on the nail, leaned toward that nail. */
function impactPose(hammerRect: DOMRect, nail: HTMLElement): Pose {
  const strike = {
    x: hammerRect.left + STRIKE.x * hammerRect.width,
    y: hammerRect.top + STRIKE.y * hammerRect.height,
  };
  const nailPoint = nailContact(nail);
  const tx = nailPoint.x - strike.x;
  const ty = nailPoint.y - strike.y;
  const raw = (Math.atan2(tx, Math.max(ty, 24)) * 180) / Math.PI;
  return { tx, ty, theta: Math.max(-26, Math.min(30, raw * 0.5)) };
}

/** Cock the head up and away from the nail before the downswing. */
function windupPose(impact: Pose): Pose {
  const lift = Math.min(84, Math.max(40, Math.abs(impact.ty) * 0.28));
  const away = Math.min(56, Math.max(18, Math.abs(impact.tx) * 0.2));
  return {
    tx: -Math.sign(impact.tx || 1) * away,
    ty: -lift,
    theta: -impact.theta * 0.4 - Math.sign(impact.theta || 1) * 12,
  };
}

/** Early downswing: still high, swung out, so the head travels an arc. */
function arcPose(wind: Pose, impact: Pose): Pose {
  const bulge = Math.min(64, Math.max(20, Math.hypot(impact.tx, impact.ty) * 0.1));
  return {
    tx: wind.tx + (impact.tx - wind.tx) * 0.2 - Math.sign(impact.tx || 1) * bulge,
    ty: wind.ty + (impact.ty - wind.ty) * 0.16,
    theta: wind.theta + (impact.theta - wind.theta) * 0.2,
  };
}

function followThroughPose(impact: Pose): Pose {
  const distance = 4;
  const len = Math.hypot(impact.tx, impact.ty) || 1;
  return {
    tx: impact.tx + (impact.tx / len) * distance,
    ty: impact.ty + (impact.ty / len) * distance,
    theta: impact.theta,
  };
}

/** A small rebound after contact, preserving the swing's arc. */
function recoilPose(impact: Pose): Pose {
  const distance = 2;
  const len = Math.hypot(impact.tx, impact.ty) || 1;
  return {
    tx: impact.tx - (impact.tx / len) * distance,
    ty: impact.ty - (impact.ty / len) * distance,
    theta: impact.theta - Math.sign(impact.theta || 1) * 1.5,
  };
}

function NailShape() {
  return (
    <svg className="nail-svg" viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse className="head" cx="55" cy="42" rx="49" ry="40" />
      <path className="stem" d="M40 76 L55 124 L70 76 Z" />
    </svg>
  );
}

export function HammerMode({
  socials,
  projects,
}: {
  socials: HammerSocialLink[];
  projects: HammerProject[];
}) {
  const byMark = React.useMemo(
    () => new Map(projects.map((project) => [project.mark, project])),
    [projects]
  );
  const [hoverMark, setHoverMark] = React.useState<HammerProject["mark"] | null>(null);
  const [swingMark, setSwingMark] = React.useState<HammerProject["mark"] | null>(null);
  const [hitMark, setHitMark] = React.useState<HammerProject["mark"] | null>(null);
  const [impact, setImpact] = React.useState(false);
  const [hintVisible, setHintVisible] = React.useState(true);
  const busyRef = React.useRef(false);
  const timersRef = React.useRef<number[]>([]);
  const hammerRef = React.useRef<HTMLDivElement>(null);
  const nailRefs = React.useRef(new Map<HammerProject["mark"], HTMLButtonElement>());

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const later = React.useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const resetSwing = React.useCallback(() => {
    busyRef.current = false;
    clearTimers();
    const hammer = hammerRef.current;
    hammer?.getAnimations().forEach((animation) => animation.cancel());
    if (document.activeElement instanceof HTMLElement && document.activeElement.classList.contains("nail")) {
      document.activeElement.blur();
    }
    flushSync(() => {
      setSwingMark(null);
      setHitMark(null);
      setImpact(false);
      setHoverMark(null);
    });
  }, [clearTimers]);

  React.useEffect(() => {
    later(() => setHintVisible(false), 4200);
    return () => {
      busyRef.current = false;
      clearTimers();
    };
  }, [clearTimers, later]);

  React.useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted || busyRef.current) resetSwing();
    };
    const onPageHide = () => {
      if (busyRef.current) resetSwing();
    };
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [resetSwing]);

  const showProject = (mark: HammerProject["mark"]) => {
    if (busyRef.current) return;
    setHoverMark(mark);
    setHintVisible(false);
  };

  const restoreIdle = () => {
    if (busyRef.current) return;
    setHoverMark(null);
  };

  const hitNail = (mark: HammerProject["mark"]) => {
    const project = byMark.get(mark);
    const hammer = hammerRef.current;
    const nail = nailRefs.current.get(mark);
    if (!project || !hammer || !nail || busyRef.current) return;

    setHintVisible(false);
    setHoverMark(mark);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.assign(project.url);
      return;
    }

    const impact = impactPose(hammer.getBoundingClientRect(), nail);
    const wind = windupPose(impact);
    const arc = arcPose(wind, impact);
    const followThrough = followThroughPose(impact);
    const recoil = recoilPose(impact);

    busyRef.current = true;
    setSwingMark(mark);
    setHitMark(null);
    setImpact(false);
    hammer.getAnimations().forEach((animation) => animation.cancel());

    hammer.animate(
      [
        {
          transform: "translate(0px, 0px) rotate(0deg)",
          easing: "cubic-bezier(0.4, 0, 0.6, 1)",
        },
        {
          transform: formatPose(wind),
          offset: WINDUP_MS / SWING_MS,
          easing: "cubic-bezier(0.35, 0.1, 0.4, 1)",
        },
        {
          transform: formatPose(arc),
          offset: (WINDUP_MS + STRIKE_MS * 0.38) / SWING_MS,
          easing: "cubic-bezier(0.12, 0.65, 0.25, 1)",
        },
        {
          transform: formatPose(impact),
          offset: IMPACT_AT_MS / SWING_MS,
          easing: "cubic-bezier(0.12, 0.72, 0.32, 1)",
        },
        {
          transform: formatPose(followThrough),
          offset: (IMPACT_AT_MS + FOLLOW_THROUGH_MS) / SWING_MS,
          easing: "cubic-bezier(0.2, 0.7, 0.35, 1)",
        },
        { transform: formatPose(recoil), offset: 1 },
      ],
      { duration: SWING_MS, fill: "forwards" }
    );

    later(() => {
      setImpact(true);
      setHitMark(mark);
    }, IMPACT_AT_MS);

    later(() => {
      window.location.assign(project.url);
    }, REDIRECT_AT_MS);
  };

  return (
    <div className="hammer-mode">
      <h1 className="sr-only">Karan Narula — Software Engineer · Based in New York</h1>
      <p className={cn("hint", !hintVisible && "hide")} id="hammer-hint">
        Hover a nail · click to swing ✦
      </p>
      <div className="stage" aria-busy={swingMark !== null}>
        <div ref={hammerRef} className={cn("hammer", swingMark && "swinging", impact && "impact")}>
          <img
            className="hammer-body"
            src="assets/hammer-body.png"
            alt="Karan Narula — Software Engineer · Based in New York"
            width={808}
            height={456}
            draggable={false}
          />
          <div className="impact-flash" aria-hidden="true" />
          <div className="hammer-content">
            <div className="social-hits">
              {socials.map((social) => (
                <a
                  key={social.href}
                  className={SOCIAL_HIT_CLASS[social.label]}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  title={social.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="nails">
          {NAILS.map((nail) => {
            const project = byMark.get(nail.mark);
            if (!project) return null;
            return (
              <button
                key={nail.mark}
                type="button"
                ref={(node) => {
                  if (node) nailRefs.current.set(nail.mark, node);
                  else nailRefs.current.delete(nail.mark);
                }}
                className={cn(
                  "nail",
                  hoverMark === nail.mark && "is-hover",
                  hitMark === nail.mark && "is-hit"
                )}
                style={{ left: nail.left, ["--c"]: nail.color } as React.CSSProperties}
                aria-label={project.name}
                onPointerEnter={() => showProject(nail.mark)}
                onPointerLeave={restoreIdle}
                onFocus={() => showProject(nail.mark)}
                onBlur={restoreIdle}
                onClick={() => hitNail(nail.mark)}
              >
                <div className="nail-pop">
                  <div className="nail-pop-icon">
                    <img src={project.imageUrl} alt="" />
                  </div>
                  <div className="nail-pop-text">{project.name}</div>
                </div>
                <NailShape />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
