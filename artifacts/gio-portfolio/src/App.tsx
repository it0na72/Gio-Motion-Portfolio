import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Mail, Menu, Play, Volume2, VolumeX, X } from "lucide-react";
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
import "@/index.css";

const queryClient = new QueryClient();
type Filter = "ALL" | "MOTION DESIGN" | "VIDEO EDITING";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.08,
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
  const links = [
    { href: "/work", label: t.nav.work, testId: "work" },
    { href: "/about", label: t.nav.about, testId: "about" },
    { href: "/contact", label: t.nav.contact, testId: "contact" },
  ];
  return (
    <header className="site-header" data-testid="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" data-testid="link-home">
          Gio
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
          <span>© Gio</span>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
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
  const [isMuted, setIsMuted] = useState(true);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const mediaScale = useMotionValue(1);
  const smoothX = useSpring(parallaxX, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothY = useSpring(parallaxY, { stiffness: 180, damping: 24, mass: 0.45 });
  const smoothScale = useSpring(mediaScale, { stiffness: 180, damping: 24, mass: 0.45 });
  const { t } = useLanguage();
  const handleMediaMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    parallaxX.set(x * -20);
    parallaxY.set(y * -20);
  };
  const resetMediaMotion = () => {
    parallaxX.set(0);
    parallaxY.set(0);
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
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.videoUrl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play();
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [project.videoUrl]);
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
  return (
    <motion.div
      className={`media-frame ${project.aspectRatio === "9/16" ? "is-vertical" : ""}`}
      style={{ aspectRatio: project.aspectRatio }}
      data-testid={`media-${project.slug}`}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.025, y: -8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMediaMove}
      onMouseEnter={() => mediaScale.set(1.06)}
      onMouseLeave={resetMediaMotion}
    >
      {project.videoUrl ? (
        <motion.video
          ref={videoRef}
          className="media-content"
          style={{ x: smoothX, y: smoothY, scale: smoothScale }}
          src={project.videoUrl}
          poster={project.thumbnail || undefined}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onClick={toggleAudio}
          aria-label={`${project.title} ${t.project.videoPreview}`}
        />
      ) : project.thumbnail ? (
        <motion.img
          className="media-content"
          style={{ x: smoothX, y: smoothY, scale: smoothScale }}
          src={project.thumbnail}
          alt={`${project.title} ${t.project.thumbnail}`}
          loading="lazy"
        />
      ) : (
        <PlaceholderVisual project={project} />
      )}
      {showVideo && project.videoUrl && (
        <>
          <span className="play-indicator" aria-hidden="true">
            <Play size={11} fill="currentColor" strokeWidth={1.2} />
          </span>
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
      delay={(index % 3) + 1}
      className={`project-card-wrap ${project.aspectRatio === "9/16" ? "card-vertical" : ""}`}
    >
      <div
        className="project-card group"
        data-testid={`card-project-${project.slug}`}
      >
        <MediaVisual project={project} showVideo />
        <div className="project-card-meta">
          <div>
            <motion.h3
              className="project-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: (index % 5) * 0.08 + 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t.projectTitles[project.slug as keyof typeof t.projectTitles]}
            </motion.h3>
            <p className="project-kicker">{category}</p>
          </div>
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

function WorkGrid({ filter }: { filter: Filter }) {
  const visibleProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) => project.category === filter);
  return (
    <div className="work-grid">
      {visibleProjects.map((project, index) => (
        <div
          key={project.slug}
          className={`grid-position grid-position-${index % 5}`}
        >
          <ProjectCard project={project} index={index} />
        </div>
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
            <Reveal delay={1}>
              <p className="hero-role">{t.about.lead}</p>
            </Reveal>
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

function Work() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const { t } = useLanguage();
  return (
    <section className="page-section work-page" data-testid="page-work">
      <div className="page-width">
        <Reveal>
          <Eyebrow>{t.work.archiveEyebrow}</Eyebrow>
          <h1 className="page-title">{t.work.title}</h1>
        </Reveal>
        <div className="work-toolbar">
          <FilterBar filter={filter} setFilter={setFilter} />
          <span className="work-count">
            {projects.length} {t.work.countSuffix}
          </span>
        </div>
        <WorkGrid filter={filter} />
      </div>
    </section>
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
            <span>01</span>
            <img
              className="about-photo"
              src={`${import.meta.env.BASE_URL}media/gioHomepagePic.png`}
              alt={t.about.photoAlt}
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
          <Link
            href="/contact"
            className="text-link light"
            data-testid="link-start-conversation"
          >
            {t.contact.startConversation}{" "}
            <ArrowUpRight size={14} strokeWidth={1.3} />
          </Link>
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
              <div className="sent-message" data-testid="status-contact-sent">
                <p>{t.contact.messageNoted}</p>
                <span>{t.contact.thanks}</span>
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
                  try {
                    const response = await fetch(
                      `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(
                          Object.fromEntries(new FormData(form)),
                        ),
                      },
                    );
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
                {error && <p className="form-error">{t.contact.error}</p>}
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
          <Route path="/work" component={Work} />
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
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
