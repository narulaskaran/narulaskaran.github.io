import * as React from "react";
import { cn } from "@/lib/utils";

export type BugProject = {
  name: string;
  url: string;
  imageUrl: string;
  mark: "party" | "receipt" | "aqi" | "seam" | "twitter";
};

export type BugSocialLink = {
  label: string;
  href: string;
};

type ColumnSpec = {
  id: string;
  height: string;
  from: string;
  to: string;
  ink: string;
  mark?: BugProject["mark"];
};

const columns: ColumnSpec[] = [
  { id: "edge-left", height: "46%", from: "#FFE08A", to: "#E8A317", ink: "#854D0E" },
  {
    id: "party",
    height: "74%",
    from: "#FFB347",
    to: "#F97316",
    ink: "#9A3412",
    mark: "party",
  },
  {
    id: "receipt",
    height: "36%",
    from: "#FFE7A3",
    to: "#F6C453",
    ink: "#854D0E",
    mark: "receipt",
  },
  {
    id: "aqi",
    height: "92%",
    from: "#FF6A2C",
    to: "#DC2626",
    ink: "#7F1D1D",
    mark: "aqi",
  },
  {
    id: "seam",
    height: "56%",
    from: "#FFC83D",
    to: "#F59E0B",
    ink: "#92400E",
    mark: "seam",
  },
  {
    id: "twitter",
    height: "84%",
    from: "#FF9A1F",
    to: "#EA580C",
    ink: "#9A3412",
    mark: "twitter",
  },
  { id: "edge-right", height: "30%", from: "#FFE9B0", to: "#F8D48A", ink: "#854D0E" },
];

const bugRoute = [1, 5, 2, 4, 3];

const columnClassName =
  "bug-column group relative block min-w-0 flex-1 origin-bottom overflow-hidden rounded-t-[999px] transition duration-300 ease-out hover:-translate-y-2 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function CuteBug({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 15 17 8M40 15l7-7M17 27 7 22M47 27l10-5M15 37H5M49 37h10M18 47 9 54M46 47l9 7"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M18 22c0-8 6-14 14-14s14 6 14 14v4c4 5 6 12 6 19 0 10-9 17-20 17s-20-7-20-17c0-7 2-14 6-19v-4Z"
        fill="currentColor"
      />
      <path d="M32 35v23" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      <circle cx="26" cy="23" r="2" fill="#111" />
      <circle cx="38" cy="23" r="2" fill="#111" />
      <path d="M27 29c1.5 1.5 3.2 2.2 5 2.2s3.5-.7 5-2.2" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProjectMark({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-[clamp(1.55rem,4vw,3.25rem)] w-[clamp(1.55rem,4vw,3.25rem)] bg-current"
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskMode: "alpha",
      }}
    />
  );
}

function PosterColumn({
  spec,
  project,
  edge,
  columnRef,
}: {
  spec: ColumnSpec;
  project?: BugProject;
  edge: "left" | "right" | "none";
  columnRef: (node: HTMLElement | null) => void;
}) {
  const className = cn(
    columnClassName,
    edge === "left" && "-ml-8 sm:-ml-14",
    edge === "right" && "-mr-8 sm:-mr-14"
  );
  const style = {
    height: spec.height,
    background: `linear-gradient(180deg, ${spec.from} 0%, ${spec.to} 100%)`,
    color: spec.ink,
  };

  const shine = (
    <span className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
  );

  if (!project) {
    return <div ref={columnRef} className={className} style={style} aria-hidden="true" data-bug-column={spec.id}>{shine}</div>;
  }

  return (
    <a
      ref={columnRef}
      className={className}
      style={style}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      data-bug-column={project.name}
    >
      {shine}
      <span className="pointer-events-none absolute inset-x-0 top-[11%] flex flex-col items-center px-1">
        <ProjectMark src={project.imageUrl} />
        <span className="mt-2 max-w-[8.5rem] text-center font-plex-mono text-[clamp(0.5rem,1vw,0.68rem)] font-medium uppercase leading-tight tracking-[0.12em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {project.name}
        </span>
      </span>
    </a>
  );
}

export function BugMode({
  role,
  socials,
  projects,
}: {
  role: string;
  socials: BugSocialLink[];
  projects: BugProject[];
}) {
  const byMark = new Map(projects.map((project) => [project.mark, project]));
  const stageRef = React.useRef<HTMLDivElement>(null);
  const columnRefs = React.useRef(new Map<number, HTMLElement>());
  const [bugColumnIndex, setBugColumnIndex] = React.useState(bugRoute[0]);
  const [bugPoint, setBugPoint] = React.useState<{ x: number; y: number } | null>(null);
  const [flight, setFlight] = React.useState<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    toIndex: number;
  } | null>(null);

  const getColumnPoint = React.useCallback((index: number) => {
    const stage = stageRef.current;
    const column = columnRefs.current.get(index);
    if (!stage || !column) return null;

    const stageRect = stage.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    return {
      x: columnRect.left - stageRect.left + columnRect.width / 2,
      y: columnRect.top - stageRect.top + 6,
    };
  }, []);

  React.useLayoutEffect(() => {
    if (flight) return;

    const updateBugPoint = () => {
      const point = getColumnPoint(bugColumnIndex);
      if (point) setBugPoint(point);
    };

    updateBugPoint();
    const observer = new ResizeObserver(updateBugPoint);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener("resize", updateBugPoint);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBugPoint);
    };
  }, [bugColumnIndex, flight, getColumnPoint]);

  const tossBug = () => {
    if (flight || !bugPoint) return;
    const currentRouteIndex = bugRoute.indexOf(bugColumnIndex);
    const toIndex = bugRoute[(currentRouteIndex + 1) % bugRoute.length];
    const to = getColumnPoint(toIndex);
    if (!to) return;
    setFlight({ from: bugPoint, to, toIndex });
  };

  const finishFlight = () => {
    if (!flight) return;
    setBugColumnIndex(flight.toIndex);
    setBugPoint(flight.to);
    setFlight(null);
  };

  const flightStyle = flight
    ? ({
        left: flight.from.x,
        top: flight.from.y,
        "--bug-dx": `${flight.to.x - flight.from.x}px`,
        "--bug-dy": `${flight.to.y - flight.from.y}px`,
        "--bug-mid-x": `${(flight.to.x - flight.from.x) / 2}px`,
        "--bug-mid-y": `${(flight.to.y - flight.from.y) / 2 - 180}px`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className="flex h-dvh flex-col bg-neutral-900 px-3 pt-3 text-white sm:px-4 sm:pt-4">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[28px] bg-black">
        <header className="shrink-0 px-5 pr-24 pt-8 sm:px-10 sm:pr-28 sm:pt-12">
          <h1 className="font-fraunces text-[clamp(3rem,8vw,7.25rem)] leading-[0.84] font-bold tracking-[-0.045em] [font-optical-sizing:auto]">
            <span className="block sm:inline">KARAN </span>
            <span className="block sm:inline">
              NARULA
              <span
                className="ml-[0.08em] inline-block size-[0.13em] translate-y-[-0.08em] rounded-full bg-[#f5c451] align-middle"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="mt-5 font-plex-mono text-[0.68rem] font-medium tracking-[0.16em] text-[#f5c451] uppercase sm:text-sm">
            {role}
          </p>
          <nav
            aria-label="Profiles"
            className="mt-2 flex flex-wrap items-center font-plex-mono text-[0.68rem] font-medium tracking-[0.16em] text-[#f5c451] uppercase sm:text-sm"
          >
            {socials.map((social, index) => (
              <span key={social.href} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="px-[0.45em]" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <a
                  href={social.href}
                  className="underline-offset-4 transition-opacity hover:opacity-70 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                >
                  {social.label}
                </a>
              </span>
            ))}
          </nav>
        </header>

        <div ref={stageRef} className="relative mt-auto min-h-[220px] w-full flex-1">
          <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
            {columns.map((spec, index) => (
              <PosterColumn
                key={spec.id}
                spec={spec}
                project={spec.mark ? byMark.get(spec.mark) : undefined}
                edge={index === 0 ? "left" : index === columns.length - 1 ? "right" : "none"}
                columnRef={(node) => {
                  if (node) columnRefs.current.set(index, node);
                  else columnRefs.current.delete(index);
                }}
              />
            ))}
          </div>
          {!flight && bugPoint ? (
            <button
              type="button"
              className="absolute z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)] transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ left: bugPoint.x, top: bugPoint.y }}
              aria-label="Toss the bug to another column"
              onMouseEnter={tossBug}
              onClick={tossBug}
            >
              <CuteBug className="size-8 sm:size-9" />
            </button>
          ) : null}
          {flight ? (
            <div
              className="bug-flight pointer-events-none absolute z-30 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]"
              style={flightStyle}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) finishFlight();
              }}
              aria-hidden="true"
            >
              <CuteBug className="bug-flight-icon size-8 sm:size-9" />
              <span className="bug-wheeee absolute left-12 top-0 whitespace-nowrap font-plex-mono text-xs font-medium tracking-wide text-white sm:text-sm">
                Wheeee!
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
