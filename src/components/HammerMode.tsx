import * as React from "react";
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

const IMPACT_AT_MS = 410;
const REDIRECT_AT_MS = 620;

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

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const later = React.useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  React.useEffect(() => {
    later(() => setHintVisible(false), 4200);
    return () => {
      busyRef.current = false;
      clearTimers();
    };
  }, [clearTimers, later]);

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
    if (!project || busyRef.current) return;

    setHintVisible(false);
    setHoverMark(mark);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.assign(project.url);
      return;
    }

    busyRef.current = true;
    setSwingMark(null);
    setHitMark(null);
    setImpact(false);

    requestAnimationFrame(() => {
      setSwingMark(mark);
    });

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
        <div
          className={cn(
            "hammer",
            swingMark && "swinging",
            swingMark && `swing-${swingMark}`,
            impact && "impact"
          )}
        >
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
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
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
