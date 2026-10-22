import React from "react";
import { brutalHoverProps } from "@/lib/brutal";
import { prefersReducedMotion } from "@/lib/motion";

export type IndexProject = {
  name: string;
  washTitle: string;
  url: string;
  imageUrl: string;
  color: string;
  motion: string;
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*/<>#";

/** Decodes text left-to-right through random glyphs while active. */
function Scramble({ text, active }: { text: string; active: boolean }) {
  const [out, setOut] = React.useState(text);
  React.useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const duration = 420;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) =>
            i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      );
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, text]);
  return <>{active ? out : text}</>;
}

const hostLabel = (url: string) => {
  const u = new URL(url);
  return u.host === "github.com" ? `gh${u.pathname.replace(/^\/[^/]+/, "")}` : u.host;
};

const formatNycTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

function NycClock() {
  const [time, setTime] = React.useState(formatNycTime);
  React.useEffect(() => {
    const id = window.setInterval(() => setTime(formatNycTime()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

/**
 * Editorial project index: each row leads with the project's mark, then a
 * serif name that scramble-decodes on hover. Rows drive the brutal page wash.
 */
export function ProjectIndex({ projects }: { projects: IndexProject[] }) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <nav className="project-index" aria-label="Projects">
      <div className="index-kicker">
        <span>
          Index <em>/</em> {String(projects.length).padStart(2, "0")} things I&rsquo;ve built
        </span>
        <span className="index-live">
          <i aria-hidden="true" /> NYC <NycClock />
        </span>
      </div>
      <ol className="index-list">
        {projects.map((project, i) => (
          <li key={project.name} style={{ "--i": i } as React.CSSProperties}>
            <a
              className="index-row"
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={project.name}
              onPointerEnter={() => setActive(project.name)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(project.name)}
              onBlur={() => setActive(null)}
              {...brutalHoverProps({
                title: project.washTitle,
                color: project.color,
                invert: project.motion === "ripple",
              })}
            >
              <span
                className="index-glyph"
                style={
                  {
                    "--icon-url": `url("${project.imageUrl}")`,
                    "--project-color": project.color,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
              <span className="index-name">
                <Scramble text={project.name} active={active === project.name} />
              </span>
              <span className="index-host">{hostLabel(project.url)}</span>
              <span className="index-arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
