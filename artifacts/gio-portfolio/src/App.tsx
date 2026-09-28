import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowUp, ArrowUpRight, Mail, Menu, Moon, Play, Sun, Volume2, VolumeX, X } from "lucide-react";
import {
  Link,
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
} from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { projects, type Project } from "@/data/projects";
import { languageOptions, LanguageProvider, useLanguage } from "@/lib/i18n";
import { ThemeProvider, useTheme } from "@/lib/theme";
import "@/index.css";

const queryClient = new QueryClient();
type Filter = "ALL" | "MOTION DESIGN" | "VIDEO EDITING";

const VOLUME_STORAGE_KEY = "gio-portfolio-volume";
const DEFAULT_VOLUME = 0.3;

function getStoredVolume() {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  const saved = Number.parseFloat(
    window.localStorage.getItem(VOLUME_STORAGE_KEY) ?? "",
  );
  return Number.isFinite(saved) ? Math.min(1, Math.max(0, saved)) : DEFAULT_VOLUME;
}

// keeps only a handful of videos decoding at once so weaker devices don't choke
const MAX_CONCURRENT_VIDEOS = 4;
const activeVideos: HTMLVideoElement[] = [];
const waitingVideos: HTMLVideoElement[] = [];

function requestVideoPlayback(video: HTMLVideoElement) {
  if (activeVideos.includes(video)) {
    // already active, just bump it to most-recently-used
    activeVideos.splice(activeVideos.indexOf(video), 1);
    activeVideos.push(video);
    void video.play().catch(() => undefined);
    return;
  }
  const waitingIndex = waitingVideos.indexOf(video);
  if (waitingIndex !== -1) waitingVideos.splice(waitingIndex, 1);
  if (activeVideos.length >= MAX_CONCURRENT_VIDEOS) {
    // don't pause a video that's still on screen with nothing to wake it back up later,
    // just queue it so it plays as soon as a slot frees
    waitingVideos.push(video);
    return;
  }
  activeVideos.push(video);
  void video.play().catch(() => undefined);
}

function releaseVideoPlayback(video: HTMLVideoElement) {
  const activeIndex = activeVideos.indexOf(video);
  if (activeIndex !== -1) activeVideos.splice(activeIndex, 1);
  const waitingIndex = waitingVideos.indexOf(video);
  if (waitingIndex !== -1) waitingVideos.splice(waitingIndex, 1);
  video.pause();
  const next = waitingVideos.shift();
  if (next) {
    activeVideos.push(next);
    void next.play().catch(() => undefined);
  }
}

function isVerticalAspectRatio(aspectRatio: string) {
  const [width, height] = aspectRatio.split("/").map(Number);
  return Boolean(width) && Boolean(height) && width < height;
}

function PageTransition({ active }: { active: boolean }) {
  return <div className={`page-transition ${active ? "is-active" : ""}`} aria-hidden="true" />;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    if (pointerQuery.matches || !cursorRef.current) return;

    const cursor = cursorRef.current;
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      setVisible(true);
      setInteractive(
        event.target instanceof Element &&
          Boolean(event.target.closest("a, button, [data-cursor='interactive']")),
      );
    };
    const handleLeave = () => setVisible(false);

    document.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`site-cursor ${visible ? "is-visible" : ""} ${interactive ? "is-interactive" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="site-cursor-pointer"
        viewBox="0 0 18 22"
        aria-hidden="true"
      >
        <path
          d="M2 1.5v18l4.7-4.4 3.2 5.5 2.2-1.3-3.2-5.5h6.1L2 1.5Z"
          fill="currentColor"
          stroke="hsl(var(--background))"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const links = [
    { href: "/about", label: t.nav.about, testId: "about" },
    { href: "/contact", label: t.nav.contact, testId: "contact" },
  ];
  return (
    <header className="site-header" data-testid="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" data-testid="link-home">
          <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
          {t.nav.home}
        </Link>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label={t.navigation.primary}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${location === link.href ? "is-current" : ""}`}
                data-testid={`link-${link.testId}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div
            className="language-switcher"
            role="group"
            aria-label={t.navigation.language}
          >
            {languageOptions.map((option) => (
              <button
                type="button"
                key={option.code}
                className={`language-button ${language === option.code ? "is-active" : ""}`}
                onClick={() => setLanguage(option.code)}
                aria-pressed={language === option.code}
                data-testid={`language-${option.code}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.navigation.lightMode : t.navigation.darkMode}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun size={16} strokeWidth={1.4} />
            ) : (
              <Moon size={16} strokeWidth={1.4} />
            )}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.navigation.close : t.navigation.open}
            aria-expanded={menuOpen}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? (
              <X size={17} strokeWidth={1.4} />
            ) : (
              <Menu size={17} strokeWidth={1.4} />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label={t.navigation.mobile}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-nav-link"
              data-testid={`mobile-link-${link.testId}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-inner">
        <p className="footer-note">{t.footer.role}</p>
        <div className="footer-links">
          <a href="mailto:gio@lusonihongo.com" data-testid="link-footer-email">
            {t.footer.email}
          </a>
          <a
            href="https://www.instagram.com/it0na/"
            target="_blank"
            rel="noreferrer"
            data-testid="link-footer-instagram"
          >
            Instagram
          </a>
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="button-back-to-top"
          >
            <ArrowUp size={13} strokeWidth={1.4} />
            {t.footer.backToTop}
          </button>
          <span>© Gio</span>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  useEffect(() => {
    const handleNavigation = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      const nextLocation = `${url.pathname}${url.search}${url.hash}`;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate(nextLocation);
        return;
      }
      setIsTransitioning(true);
      const changeRoute = window.setTimeout(() => navigate(nextLocation), 430);
      const finishTransition = window.setTimeout(() => setIsTransitioning(false), 900);
      window.addEventListener("beforeunload", () => {
        window.clearTimeout(changeRoute);
        window.clearTimeout(finishTransition);
      }, { once: true });
    };
    document.addEventListener("click", handleNavigation, true);
    return () => document.removeEventListener("click", handleNavigation, true);
  }, [location, navigate]);
  useEffect(() => {
    const updatePageEnd = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setAtPageEnd(remaining <= 24);
      setIsScrolled(window.scrollY > 24);
    };
    updatePageEnd();
    window.addEventListener("scroll", updatePageEnd, { passive: true });
    window.addEventListener("resize", updatePageEnd);
    return () => {
      window.removeEventListener("scroll", updatePageEnd);
      window.removeEventListener("resize", updatePageEnd);
    };
  }, []);
  return (
    <div
      className={`site-shell ${atPageEnd ? "is-at-page-end" : ""} ${isScrolled ? "is-scrolled" : ""}`}
    >
      <PageTransition active={isTransitioning} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function MagneticLink({
  href,
  className,
  children,
  testId,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  testId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.25 });
  const smoothY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="magnetic-link-wrap"
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={(event) => {
        if (prefersReducedMotion || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link href={href} className={className} data-testid={testId}>
        {children}
      </Link>
    </motion.div>
  );
}

function PlaceholderVisual({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <div
      className="placeholder-visual"
      style={
        { "--project-index": projects.indexOf(project) + 1 } as CSSProperties
      }
    >
      <span className="placeholder-mark" aria-hidden="true">
        G / {String(projects.indexOf(project) + 1).padStart(2, "0")}
      </span>
      <span className="placeholder-label">{t.media.placeholder}</span>
      <span className="placeholder-ratio">
        {project.aspectRatio.replace("/", " : ")}
      </span>
    </div>
  );
}

function MediaVisual({
  project,
  showVideo = false,
}: {
  project: Project;
  showVideo?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(getStoredVolume);
  const prefersReducedMotion = useReducedMotion();
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const mediaScale = useMotionValue(1);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothX = useSpring(parallaxX, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothY = useSpring(parallaxY, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothScale = useSpring(mediaScale, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothTiltX = useSpring(tiltX, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 180, damping: 24, mass: 0.45 });
  const { t } = useLanguage();
  const handleMediaMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    if (!prefersReducedMotion) {
      parallaxX.set(x * -20);
      parallaxY.set(y * -20);
      tiltX.set(y * -3.5);
      tiltY.set(x * 3.5);
    }
  };
  const resetMediaMotion = () => {
    parallaxX.set(0);
    parallaxY.set(0);
    tiltX.set(0);
    tiltY.set(0);
    mediaScale.set(1);
  };
  const toggleAudio = () => {
    const video = videoRef.current;
    const nextMutedState = !isMuted;
    if (video && !nextMutedState) {
      window.dispatchEvent(
        new CustomEvent<HTMLVideoElement>("portfolio:video-audio", {
          detail: video,
        }),
      );
    }
    setIsMuted(nextMutedState);
  };
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(nextVolume));
    window.dispatchEvent(
      new CustomEvent<number>("portfolio:video-volume", { detail: nextVolume }),
    );
  };
  useEffect(() => {
    const frame = mediaFrameRef.current;
    if (!frame || !project.videoUrl) return;
    // mounts the <video> tag well ahead of the viewport so it has time to buffer
    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { threshold: 0, rootMargin: "900px 0px" },
    );
    mountObserver.observe(frame);
    return () => mountObserver.disconnect();
  }, [project.videoUrl]);
  useEffect(() => {
    const frame = mediaFrameRef.current;
    if (!frame || !project.videoUrl) return;
    // only actually decodes/plays once the card is close to visible, keeping concurrency low
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          if (!prefersReducedMotion && videoRef.current) {
            requestVideoPlayback(videoRef.current);
          }
        } else if (videoRef.current) {
          releaseVideoPlayback(videoRef.current);
        }
      },
      { threshold: [0, 0.3], rootMargin: "0px 0px -10% 0px" },
    );
    playObserver.observe(frame);
    return () => {
      playObserver.disconnect();
      if (videoRef.current) releaseVideoPlayback(videoRef.current);
    };
  }, [project.videoUrl, prefersReducedMotion]);
  useEffect(() => {
    const handleOtherVideoAudio = (event: Event) => {
      const activeVideo = (event as CustomEvent<HTMLVideoElement>).detail;
      if (activeVideo !== videoRef.current) {
        if (videoRef.current) videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    window.addEventListener("portfolio:video-audio", handleOtherVideoAudio);
    return () =>
      window.removeEventListener("portfolio:video-audio", handleOtherVideoAudio);
  }, []);
  useEffect(() => {
    const handleVolumeSync = (event: Event) => {
      setVolume((event as CustomEvent<number>).detail);
    };
    window.addEventListener("portfolio:video-volume", handleVolumeSync);
    return () =>
      window.removeEventListener("portfolio:video-volume", handleVolumeSync);
  }, []);
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume, shouldLoad]);
  return (
    <motion.div
      ref={mediaFrameRef}
      className={`media-frame ${isVerticalAspectRatio(project.aspectRatio) ? "is-vertical" : ""}`}
      style={{
        aspectRatio: project.aspectRatio,
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformPerspective: 900,
      }}
      data-testid={`media-${project.slug}`}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.025, y: -8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMediaMove}
      onMouseEnter={() => {
        if (!prefersReducedMotion) mediaScale.set(1.045);
      }}
      onMouseLeave={resetMediaMotion}
    >
      {project.videoUrl && shouldLoad ? (
        <motion.video
          ref={videoRef}
          className="media-content"
          style={{ x: smoothX, y: smoothY, scale: smoothScale }}
          src={project.videoUrl}
          poster={project.thumbnail || undefined}
          muted={isMuted}
          autoPlay={!prefersReducedMotion}
          loop
          playsInline
          preload="auto"
          onClick={toggleAudio}
          aria-label={`${project.title} ${t.project.videoPreview}`}
        />
      ) : project.videoUrl && project.thumbnail ? (
        <motion.img
          className="media-content video-poster"
          src={project.thumbnail}
          alt={`${project.title} ${t.project.thumbnail}`}
          loading="eager"
          decoding="async"
        />
      ) : project.thumbnail ? (
        <motion.img
          className="media-content"
          style={{ x: smoothX, y: smoothY, scale: smoothScale }}
          src={project.thumbnail}
          alt={`${project.title} ${t.project.thumbnail}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <PlaceholderVisual project={project} />
      )}
      {showVideo && project.videoUrl && shouldLoad && (
        <>
          <span className="play-indicator" aria-hidden="true">
            <Play size={11} fill="currentColor" strokeWidth={1.2} />
          </span>
          {!isMuted && (
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              aria-label="Video volume"
              onClick={(event) => event.stopPropagation()}
              onChange={handleVolumeChange}
            />
          )}
          <button
            type="button"
            className="sound-toggle"
            aria-label={isMuted ? "Turn sound on" : "Mute video"}
            title={isMuted ? "Turn sound on" : "Mute video"}
            onClick={(event) => {
              event.stopPropagation();
              toggleAudio();
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </>
      )}
      {project.placeholder && (
        <span className="placeholder-badge">{t.media.placeholderBadge}</span>
      )}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { t } = useLanguage();
  const category =
    project.category === "MOTION DESIGN" ? t.filters.motion : t.filters.editing;
  return (
    <Reveal
      delay={index}
      className={`project-card-wrap ${isVerticalAspectRatio(project.aspectRatio) ? "card-vertical" : ""}`}
    >
      <div
        className="project-card group"
        data-testid={`card-project-${project.slug}`}
      >
        <MediaVisual project={project} showVideo />
        <div className="project-card-meta">
          <p className="project-kicker">{category}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function FilterBar({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) {
  const { t } = useLanguage();
  const filterLabels: Record<Filter, string> = {
    ALL: t.filters.all,
    "MOTION DESIGN": t.filters.motion,
    "VIDEO EDITING": t.filters.editing,
  };
  return (
    <div
      className="filter-bar"
      role="group"
      aria-label={t.navigation.filterWork}
    >
      {(["ALL", "MOTION DESIGN", "VIDEO EDITING"] as Filter[]).map((item) => (
        <button
          type="button"
          key={item}
          className={`filter-button ${filter === item ? "is-active" : ""}`}
          onClick={() => setFilter(item)}
          aria-pressed={filter === item}
          data-testid={`filter-${item.toLowerCase().replaceAll(" ", "-")}`}
        >
          {filterLabels[item]}
        </button>
      ))}
    </div>
  );
}

// interleaves landscape/portrait videos so the masonry mixes orientations across the whole width
function buildMosaicOrder(items: Project[]) {
  const wide = items.filter((project) => !isVerticalAspectRatio(project.aspectRatio));
  const tall = items.filter((project) => isVerticalAspectRatio(project.aspectRatio));
  const ordered: Project[] = [];
  let wideIndex = 0;
  let tallIndex = 0;
  while (wideIndex < wide.length || tallIndex < tall.length) {
    if (wideIndex < wide.length) ordered.push(wide[wideIndex++]);
    for (let i = 0; i < 2 && tallIndex < tall.length; i++) {
      ordered.push(tall[tallIndex++]);
    }
  }
  return ordered;
}

function WorkGrid({ filter, limit }: { filter: Filter; limit?: number }) {
  const visibleProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) => project.category === filter);
  const displayedProjects = limit
    ? visibleProjects.slice(0, limit)
    : visibleProjects;
  const orderedProjects = buildMosaicOrder(displayedProjects);
  return (
    <div className="work-grid">
      {orderedProjects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

function Home() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const { t } = useLanguage();
  return (
    <>
      <section className="hero-section" data-testid="section-home-hero">
        <div className="page-width">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <div className="hero-copy">
            <div className="clip-reveal">
              <h1 className="hero-title">Gio</h1>
            </div>
          </div>
          <Reveal delay={2} className="hero-intro">
            <p>{t.hero.description}</p>
            <span className="hero-location">
              {t.hero.based}
              <br />
              {t.hero.availability}
            </span>
          </Reveal>
        </div>
      </section>
      <section
        className="selected-work-section"
        data-testid="section-selected-work"
      >
        <div className="page-width">
          <div className="section-heading">
            <div>
              <h2 className="section-title">
                {t.home.sectionFirst}
                {t.home.sectionSecond && (
                  <>
                    <br />
                    <i>{t.home.sectionSecond}</i>
                  </>
                )}
              </h2>
            </div>
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
          <WorkGrid filter={filter} />
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function About() {
  const { t } = useLanguage();
  return (
    <section className="page-section" data-testid="page-about">
      <div className="page-width">
        <Reveal>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h1 className="page-title about-title">
            {t.about.titleFirst}
            <br />
            <i>{t.about.titleSecond}</i>
          </h1>
        </Reveal>
        <div className="about-grid">
          <div className="about-index">
            <img
              className="about-photo"
              src={`${import.meta.env.BASE_URL}media/gioHomepagePic.png`}
              alt={t.about.photoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="about-lead">
              <strong>{t.about.lead}</strong>
            </p>
            <p className="about-copy">{t.about.copy}</p>
            <div className="skills-block">
              <Eyebrow>{t.about.focus}</Eyebrow>
              <div className="skill-list">
                <span>{t.about.videoEditing}</span>
                <span>{t.about.motionDesign}</span>
                <span>After Effects</span>
                <span>Premiere Pro</span>
                <span>Photoshop</span>
                <span>Figma</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  const { t } = useLanguage();
  return (
    <section className="contact-band" data-testid="section-contact-band">
      <div className="page-width">
        <Eyebrow>{t.contact.bandEyebrow}</Eyebrow>
        <div className="contact-band-row">
          <h2>
            {t.contact.bandTitleFirst}
            <br />
            <i>{t.contact.bandTitleSecond}</i>
          </h2>
          <MagneticLink
            href="/contact"
            className="text-link light"
            testId="link-start-conversation"
          >
            {t.contact.startConversation}{" "}
            <ArrowUpRight size={14} strokeWidth={1.3} />
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useLanguage();
  return (
    <section className="page-section contact-page" data-testid="page-contact">
      <div className="page-width">
        <Reveal>
          <Eyebrow>{t.contact.eyebrow}</Eyebrow>
          <h1 className="page-title">{t.contact.title}</h1>
        </Reveal>
        <div className="contact-grid">
          <div className="contact-details">
            <p className="contact-lead">{t.contact.lead}</p>
            <a
              href="mailto:gio@lusonihongo.com"
              className="text-link"
              data-testid="link-contact-email"
            >
              <Mail size={15} strokeWidth={1.3} /> gio@lusonihongo.com
            </a>
            <div className="social-links">
              <a
                href="https://www.instagram.com/it0na/"
                target="_blank"
                rel="noreferrer"
                data-testid="link-contact-instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@abikyoukan2"
                target="_blank"
                rel="noreferrer"
                data-testid="link-contact-youtube"
              >
                YouTube
              </a>
            </div>
          </div>
          <div>
            {sent ? (
              <div
                className="sent-message"
                role="status"
                aria-live="polite"
                data-testid="status-contact-sent"
              >
                <p>{t.contact.messageNoted}</p>
                <span>{t.contact.thanks}</span>
                <span>{t.contact.confirmationDetails}</span>
                <a className="text-link" href="mailto:gio@lusonihongo.com">
                  {t.contact.emailDirect}
                </a>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setSent(false)}
                  data-testid="button-send-another"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setSubmitting(true);
                  setError(false);
                  const form = event.currentTarget;
                  const apiBaseUrl =
                    import.meta.env.VITE_API_URL ||
                    "/api";
                  try {
                    const response = await fetch(`${apiBaseUrl}/contact`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(
                        Object.fromEntries(new FormData(form)),
                      ),
                    });
                    if (response.ok) {
                      setSent(true);
                    } else {
                      setError(true);
                    }
                  } catch {
                    setError(true);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                data-testid="form-contact"
              >
                <input
                  className="contact-trap"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <label>
                  <span>{t.contact.name}</span>
                  <input
                    required
                    name="name"
                    placeholder={t.contact.namePlaceholder}
                    data-testid="input-contact-name"
                  />
                </label>
                <label>
                  <span>{t.contact.email}</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={t.contact.emailPlaceholder}
                    data-testid="input-contact-email"
                  />
                </label>
                <label>
                  <span>{t.contact.project}</span>
                  <input
                    required
                    name="project"
                    placeholder={t.contact.projectPlaceholder}
                    data-testid="input-contact-project"
                  />
                </label>
                <label>
                  <span>{t.contact.message}</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    data-testid="input-contact-message"
                  />
                </label>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={submitting}
                  data-testid="button-send-message"
                >
                  {submitting ? t.contact.sending : t.contact.sendMessage}{" "}
                  <ArrowUpRight size={15} strokeWidth={1.3} />
                </button>
                {error && (
                  <p className="form-error" role="alert">
                    {t.contact.error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Router() {
  return (
    <Layout>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
