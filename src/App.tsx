import React from "react";
import { Bug } from "lucide-react";
import { BugMode } from "@/components/BugMode";
import { HammerMode } from "@/components/HammerMode";
import { BrutalHover } from "@/components/brutal-hover";
import { brutalHoverProps, brutalInk } from "@/lib/brutal";
import { cn } from "@/lib/utils";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.414-1.414M6.464 6.464 5.05 5.05m12.02 0-1.414 1.414M6.464 17.536 5.05 18.95"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
    />
  </svg>
);

const NailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="8.2" rx="6.8" ry="5.1" />
    <path d="M9.4 12.2 12 21.2 14.6 12.2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
    <path
      fill="currentColor"
      d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true">
    <path
      fill="currentColor"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    />
  </svg>
);

const KofiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.265-1.782 3.168-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
    />
  </svg>
);

type HeroVariant = "split" | "backdrop" | "slab";

const profileData = {
  firstName: "Karan",
  lastName: "Narula",
  role: "software engineer / new york",
};

const heroVariantFromUrl = (): HeroVariant => {
  if (typeof window === "undefined") return "split";
  const value = new URLSearchParams(window.location.search).get("hero");
  return value === "backdrop" || value === "slab" ? value : "split";
};

type ToggleVariant = "chip" | "pop" | "spin";

const toggleVariantFromUrl = (): ToggleVariant => {
  if (typeof window === "undefined") return "chip";
  const value = new URLSearchParams(window.location.search).get("toggle");
  return value === "pop" || value === "spin" ? value : "chip";
};

const projects = [
  {
    name: "Party Planner",
    washTitle: "Party",
    mark: "party" as const,
    url: "https://party.narula.xyz/",
    imageUrl: "/assets/project-img/party.svg",
    color: "#9524ff",
    motion: "pulse",
  },
  {
    name: "Receipt Splitter",
    washTitle: "Split",
    mark: "receipt" as const,
    url: "https://split.narula.xyz/",
    imageUrl: "/assets/project-img/receipt-splitter.svg",
    color: "#2478ff",
    motion: "rise",
  },
  {
    name: "AQI Monitor",
    washTitle: "Air",
    mark: "aqi" as const,
    url: "https://aqi.narula.xyz/",
    imageUrl: "/assets/project-img/aqi.svg",
    color: "#24ff70",
    motion: "ripple",
  },
  {
    name: "Seam Carving",
    washTitle: "Seam",
    mark: "seam" as const,
    url: "https://github.com/narulaskaran/seam-carving",
    imageUrl: "/assets/project-img/seam-carving.svg",
    color: "#ff5724",
    motion: "spin",
  },
  {
    name: "Twitter News Digest",
    washTitle: "News",
    mark: "twitter" as const,
    url: "https://github.com/narulaskaran/news-digest",
    imageUrl: "/assets/project-img/twitter-outline.svg",
    color: "#8bd5ff",
    motion: "pulse",
  },
];

const socials = [
  {
    href: "https://www.linkedin.com/in/narulaskaran/",
    label: "LinkedIn",
    color: "#0a66c2",
    icon: <LinkedInIcon />,
  },
  {
    href: "https://github.com/narulaskaran/",
    label: "GitHub",
    color: "#333333",
    icon: <GitHubIcon />,
  },
  {
    href: "https://ko-fi.com/Y8Y21CC8IA",
    label: "Ko-fi",
    color: "#8bd5ff",
    icon: <KofiIcon />,
  },
];

function SocialLinks({ isDark }: { isDark: boolean }) {
  return (
    <nav className="elsewhere elsewhere--bottom" aria-label="Elsewhere">
      {socials.map((social) => (
        <a
          key={social.label}
          className="brutal-icon social-icon"
          href={social.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={social.label}
          {...brutalHoverProps({
            title: social.label,
            color:
              social.label === "GitHub" && isDark ? "#f2f2f2" : social.color,
            invert: social.label === "GitHub" && isDark,
          })}
        >
          {social.icon}
        </a>
      ))}
    </nav>
  );
}

function ProjectNav() {
  return (
    <nav className="project-nav project-nav--hero" aria-label="Projects">
      {projects.map((project) => (
        <a
          key={project.name}
          className={`project-link${project.motion === "ripple" ? " is-ripple" : ""}`}
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={project.name}
          {...brutalHoverProps({
            title: project.washTitle,
            color: project.color,
            invert: project.motion === "ripple",
          })}
        >
          <span
            className={`project-glyph is-${project.motion}`}
            style={
              {
                "--icon-url": `url("${project.imageUrl}")`,
                "--project-color": project.color,
              } as React.CSSProperties
            }
          />
        </a>
      ))}
    </nav>
  );
}

const App: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const [bugMode, setBugMode] = React.useState(
    () => localStorage.getItem("bugMode") === "on"
  );
  const [nailMode, setNailMode] = React.useState(
    () => localStorage.getItem("nailMode") === "on"
  );
  const [themeTransitionKey, setThemeTransitionKey] = React.useState(0);
  const [themeTransitionColor, setThemeTransitionColor] = React.useState("#8bd5ff");
  const heroVariant = heroVariantFromUrl();
  const backdropOnly = heroVariant !== "split";
  const toggleVariant = toggleVariantFromUrl();

  React.useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", event.matches);
        setIsDark(event.matches);
      }
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setThemeTransitionColor(newDark ? "#8bd5ff" : "#8d2525");
    setThemeTransitionKey((key) => key + 1);
  };

  const setPosterMode = (mode: "off" | "bug" | "nail") => {
    const nextBug = mode === "bug";
    const nextNail = mode === "nail";
    setBugMode(nextBug);
    setNailMode(nextNail);
    localStorage.setItem("bugMode", nextBug ? "on" : "off");
    localStorage.setItem("nailMode", nextNail ? "on" : "off");
  };

  const toggleBugMode = () => setPosterMode(bugMode ? "off" : "bug");
  const toggleNailMode = () => setPosterMode(nailMode ? "off" : "nail");

  return (
    <>
      <div
        className={cn(
          "fixed top-4 z-[105] flex items-center gap-1",
          bugMode || nailMode ? "right-4" : "right-16",
          nailMode && "text-neutral-800",
          bugMode && "text-white",
          !nailMode && !bugMode && "text-foreground"
        )}
      >
        <button
          type="button"
          className={cn(
            "bug-toggle inline-flex h-10 w-10 items-center justify-center rounded-md text-current focus-visible:outline-2 focus-visible:outline-offset-2",
            !bugMode && !nailMode && "hover:bg-muted",
            nailMode && "hover:bg-black/10 hover:text-neutral-900",
            bugMode &&
              "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 hover:text-amber-200"
          )}
          aria-pressed={bugMode}
          aria-label={bugMode ? "Turn off bug mode" : "Turn on bug mode"}
          onClick={toggleBugMode}
        >
          <Bug className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md text-current focus-visible:outline-2 focus-visible:outline-offset-2",
            !bugMode && !nailMode && "hover:bg-muted",
            nailMode &&
              "bg-orange-500/20 text-orange-800 hover:bg-orange-500/25 hover:text-orange-900",
            bugMode && "hover:bg-white/10 hover:text-white"
          )}
          aria-pressed={nailMode}
          aria-label={nailMode ? "Turn off nail mode" : "Turn on nail mode"}
          onClick={toggleNailMode}
        >
          <NailIcon />
        </button>
      </div>
      {nailMode ? (
        <HammerMode socials={socials} projects={projects} />
      ) : bugMode ? (
        <BugMode role={profileData.role} socials={socials} projects={projects} />
      ) : (
        <BrutalHover>
          <div className="fixed top-4 right-4 z-[104]">
            <button
              type="button"
              className={cn(
                "theme-toggle",
                `theme-toggle--${toggleVariant}`,
                toggleVariant === "pop" && "brutal-icon"
              )}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
              style={
                {
                  "--brutal-link": isDark ? "#ffe14a" : "#111111",
                  "--brutal-link-ink": brutalInk(isDark),
                } as React.CSSProperties
              }
            >
              {themeTransitionKey > 0 ? (
                <span
                  key={themeTransitionKey}
                  className="theme-toggle-halo"
                  style={{ "--theme-transition-color": themeTransitionColor } as React.CSSProperties}
                  aria-hidden="true"
                />
              ) : null}
              {isDark ? <SunIcon /> : <MoonIcon />}
              {toggleVariant === "pop" ? (
                <span className="theme-toggle-label" aria-hidden="true">
                  {isDark ? "Light" : "Dark"}
                </span>
              ) : null}
            </button>
          </div>
          <div className={`site-shell hero-variant-${heroVariant}`}>
            <header className="site-header name-only-hero">
              <div
                className={`hero-backdrop${backdropOnly ? " hero-backdrop--full" : ""}${heroVariant === "slab" ? " hero-backdrop--slab" : ""}`}
                aria-hidden="true"
              >
                {backdropOnly && heroVariant === "slab" ? (
                  <>
                    <span>KARAN</span>
                    <span>NARULA</span>
                  </>
                ) : (
                  <span>{backdropOnly ? "KARAN NARULA" : "NARULA"}</span>
                )}
              </div>
              <div className="hero-intro">
                {backdropOnly ? (
                  <>
                    <h1 className="sr-only">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="hero-role site-enter">{profileData.role}</p>
                  </>
                ) : (
                  <>
                    <p className="hero-role site-enter">{profileData.role}</p>
                    <h1 className="hero-name site-enter site-enter-delay-1">
                      <span className="hero-first-name">{profileData.firstName}</span>
                      <span className="hero-last-name">{profileData.lastName}</span>
                    </h1>
                  </>
                )}
              </div>
              <ProjectNav />
            </header>
            <SocialLinks isDark={isDark} />
          </div>
        </BrutalHover>
      )}
    </>
  );
};

export default App;
