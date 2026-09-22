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
    height: "100%",
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

const columnClassName =
  "group relative block min-w-0 flex-1 origin-bottom overflow-hidden rounded-t-[999px] transition duration-300 ease-out hover:-translate-y-2 hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:focus-visible:outline-white";

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
}: {
  spec: ColumnSpec;
  project?: BugProject;
  edge: "left" | "right" | "none";
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
    <span className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20 motion-reduce:transition-none" />
  );

  if (!project) {
    return <div className={className} style={style} aria-hidden="true" data-bug-column={spec.id}>{shine}</div>;
  }

  return (
    <a
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
        <span className="mt-2 max-w-[8.5rem] text-center font-plex-mono text-[clamp(0.5rem,1vw,0.68rem)] font-medium uppercase leading-tight tracking-[0.12em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
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

  return (
    <div className="min-h-screen bg-stone-200 p-3 text-black sm:p-4 dark:bg-neutral-900 dark:text-white">
      <div className="flex min-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[28px] bg-white sm:min-h-[calc(100dvh-2rem)] dark:bg-black">
        <header className="shrink-0 px-5 pr-24 pt-8 sm:px-10 sm:pr-28 sm:pt-12">
          <h1 className="font-fraunces text-[clamp(2.7rem,7vw,6.4rem)] leading-[0.86] font-medium tracking-[-0.045em] [font-optical-sizing:auto]">
            <span className="block sm:inline">KARAN </span>
            <span className="block sm:inline">
              NARULA
              <span
                className="ml-[0.08em] inline-block size-[0.13em] translate-y-[-0.08em] rounded-full bg-[#9a3412] align-middle dark:bg-[#f5c451]"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="mt-5 font-plex-mono text-[0.68rem] font-medium tracking-[0.16em] text-[#9a3412] uppercase sm:text-sm dark:text-[#f5c451]">
            {role}
          </p>
          <nav
            aria-label="Profiles"
            className="mt-2 flex flex-wrap items-center font-plex-mono text-[0.68rem] font-medium tracking-[0.16em] text-[#9a3412] uppercase sm:text-sm dark:text-[#f5c451]"
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

        <div className="mt-auto flex h-[clamp(220px,52vh,600px)] items-end gap-2 px-0 sm:gap-3">
          {columns.map((spec, index) => (
            <PosterColumn
              key={spec.id}
              spec={spec}
              project={spec.mark ? byMark.get(spec.mark) : undefined}
              edge={index === 0 ? "left" : index === columns.length - 1 ? "right" : "none"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
