import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, Menu, Play, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { projects, type Project } from '@/data/projects';
import { languageOptions, LanguageProvider, useLanguage } from '@/lib/i18n';
import '@/index.css';

const queryClient = new QueryClient();
type Filter = 'ALL' | 'MOTION DESIGN' | 'VIDEO EDITING';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const links = [
    { href: '/work', label: t.nav.work, testId: 'work' },
    { href: '/about', label: t.nav.about, testId: 'about' },
    { href: '/contact', label: t.nav.contact, testId: 'contact' },
  ];
  return (
    <header className="site-header" data-testid="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" data-testid="link-home">Gio</Link>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label={t.navigation.primary}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? 'is-current' : ''}`} data-testid={`link-${link.testId}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="language-switcher" role="group" aria-label={t.navigation.language}>
            {languageOptions.map((option) => (
              <button
                type="button"
                key={option.code}
                className={`language-button ${language === option.code ? 'is-active' : ''}`}
                onClick={() => setLanguage(option.code)}
                aria-pressed={language === option.code}
                data-testid={`language-${option.code}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? t.navigation.close : t.navigation.open} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={17} strokeWidth={1.4} /> : <Menu size={17} strokeWidth={1.4} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label={t.navigation.mobile}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link" data-testid={`mobile-link-${link.testId}`}>
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
          <a href="mailto:hello@giooliveira.com" data-testid="link-footer-email">{t.footer.email}</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a>
          <span>© Gio</span>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    <div className="placeholder-visual" style={{ '--project-index': projects.indexOf(project) + 1 } as CSSProperties}>
      <span className="placeholder-mark" aria-hidden="true">G / {String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
      <span className="placeholder-label">{t.media.placeholder}</span>
      <span className="placeholder-ratio">{project.aspectRatio.replace('/', ' : ')}</span>
    </div>
  );
}

function MediaVisual({ project, showVideo = false }: { project: Project; showVideo?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.videoUrl) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play();
      else video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [project.videoUrl]);
  return (
    <div className={`media-frame ${project.aspectRatio === '9/16' ? 'is-vertical' : ''}`} style={{ aspectRatio: project.aspectRatio }} data-testid={`media-${project.slug}`}>
      {project.videoUrl ? (
        <video ref={videoRef} className="media-content" src={project.videoUrl} poster={project.thumbnail || undefined} muted loop playsInline preload="metadata" aria-label={`${project.title} ${t.project.videoPreview}`} />
      ) : project.thumbnail ? (
        <img className="media-content" src={project.thumbnail} alt={`${project.title} ${t.project.thumbnail}`} loading="lazy" />
      ) : (
        <PlaceholderVisual project={project} />
      )}
      {showVideo && project.videoUrl && <span className="play-indicator" aria-hidden="true"><Play size={11} fill="currentColor" strokeWidth={1.2} /></span>}
      {project.placeholder && <span className="placeholder-badge">{t.media.placeholderBadge}</span>}
    </div>
  );
}

function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t } = useLanguage();
  const category = project.category === 'MOTION DESIGN' ? t.filters.motion : t.filters.editing;
  return (
    <Reveal delay={(index % 3) + 1} className={`project-card-wrap ${project.aspectRatio === '9/16' ? 'card-vertical' : ''}`}>
      <Link href={`/work/${project.slug}`} className="project-card group" data-testid={`card-project-${project.slug}`}>
        <MediaVisual project={project} showVideo />
        <div className="project-card-meta">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-kicker">{category} <span>/</span> {project.year}</p>
          </div>
          <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={15} strokeWidth={1.2} /></span>
        </div>
      </Link>
    </Reveal>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function FilterBar({ filter, setFilter }: { filter: Filter; setFilter: (filter: Filter) => void }) {
  const { t } = useLanguage();
  const filterLabels: Record<Filter, string> = {
    ALL: t.filters.all,
    'MOTION DESIGN': t.filters.motion,
    'VIDEO EDITING': t.filters.editing,
  };
  return (
    <div className="filter-bar" role="group" aria-label={t.navigation.filterWork}>
      {(['ALL', 'MOTION DESIGN', 'VIDEO EDITING'] as Filter[]).map((item) => (
        <button type="button" key={item} className={`filter-button ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}>
          {filterLabels[item]}
        </button>
      ))}
    </div>
  );
}

function WorkGrid({ filter }: { filter: Filter }) {
  const visibleProjects = filter === 'ALL' ? projects : projects.filter((project) => project.category === filter);
  return (
    <div className="work-grid">
      {visibleProjects.map((project, index) => (
        <div key={project.slug} className={`grid-position grid-position-${index % 5}`}>
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}

function Home() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const { t } = useLanguage();
  return (
    <>
      <section className="hero-section" data-testid="section-home-hero">
        <div className="page-width">
          <Reveal><Eyebrow>{t.hero.eyebrow}</Eyebrow></Reveal>
          <div className="hero-copy">
            <div className="clip-reveal"><h1 className="hero-title">Gio</h1></div>
            <Reveal delay={1}><p className="hero-role">{t.hero.editor} /<br />{t.hero.motion}</p></Reveal>
          </div>
          <Reveal delay={2} className="hero-intro">
            <p>{t.hero.description}</p>
            <span className="hero-location">{t.hero.based}<br />{t.hero.availability}</span>
          </Reveal>
        </div>
      </section>
      <section className="selected-work-section" data-testid="section-selected-work">
        <div className="page-width">
          <div className="section-heading">
            <div><Eyebrow>{t.home.selectedWork}</Eyebrow><h2 className="section-title">{t.home.sectionFirst}<br /><i>{t.home.sectionSecond}</i></h2></div>
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
          <WorkGrid filter={filter} />
        </div>
      </section>
      <section className="point-of-view" data-testid="section-home-about">
        <div className="page-width point-grid">
          <Eyebrow>{t.home.workEyebrow}</Eyebrow>
          <div><p className="statement">{t.home.statement}</p></div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function Work() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const { t } = useLanguage();
  return (
    <section className="page-section work-page" data-testid="page-work">
      <div className="page-width">
        <Reveal><Eyebrow>{t.work.archiveEyebrow}</Eyebrow><h1 className="page-title">{t.work.title}</h1></Reveal>
        <Reveal delay={1} className="page-lead">{t.work.lead}</Reveal>
        <div className="work-toolbar"><FilterBar filter={filter} setFilter={setFilter} /><span className="work-count">{projects.length} {t.work.countSuffix}</span></div>
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
        <Reveal><Eyebrow>{t.about.eyebrow}</Eyebrow><h1 className="page-title about-title">{t.about.titleFirst}<br /><i>{t.about.titleSecond}</i></h1></Reveal>
        <div className="about-grid">
          <div className="about-index"><span>01</span><span>{t.about.indexName}</span></div>
          <div>
            <p className="about-lead">{t.about.lead}</p>
            <p className="about-copy">{t.about.copy}</p>
            <div className="skills-block">
              <Eyebrow>{t.about.focus}</Eyebrow>
              <div className="skill-list"><span>{t.about.videoEditing}</span><span>{t.about.motionDesign}</span><span>After Effects</span><span>Premiere Pro</span><span>Blender</span></div>
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
        <div className="contact-band-row"><h2>{t.contact.bandTitleFirst}<br /><i>{t.contact.bandTitleSecond}</i></h2><Link href="/contact" className="text-link light" data-testid="link-start-conversation">{t.contact.startConversation} <ArrowUpRight size={14} strokeWidth={1.3} /></Link></div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();
  return (
    <section className="page-section contact-page" data-testid="page-contact">
      <div className="page-width">
        <Reveal><Eyebrow>{t.contact.eyebrow}</Eyebrow><h1 className="page-title">{t.contact.title}</h1></Reveal>
        <div className="contact-grid">
          <div className="contact-details">
            <p className="contact-lead">{t.contact.lead}</p>
            <a href="mailto:hello@giooliveira.com" className="text-link" data-testid="link-contact-email"><Mail size={15} strokeWidth={1.3} /> hello@giooliveira.com</a>
            <div className="social-links"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-contact-instagram">Instagram</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" data-testid="link-contact-youtube">YouTube</a></div>
          </div>
          <div>
            {sent ? (
              <div className="sent-message" data-testid="status-contact-sent"><p>{t.contact.messageNoted}</p><span>{t.contact.thanks}</span><button type="button" className="text-link" onClick={() => setSent(false)} data-testid="button-send-another">{t.contact.sendAnother}</button></div>
            ) : (
              <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }} data-testid="form-contact">
                <label><span>{t.contact.name}</span><input required name="name" placeholder={t.contact.namePlaceholder} data-testid="input-contact-name" /></label>
                <label><span>{t.contact.email}</span><input required type="email" name="email" placeholder={t.contact.emailPlaceholder} data-testid="input-contact-email" /></label>
                <label><span>{t.contact.project}</span><textarea required name="message" rows={4} placeholder={t.contact.projectPlaceholder} data-testid="input-contact-message" /></label>
                <button type="submit" className="form-submit" data-testid="button-send-message">{t.contact.sendMessage} <ArrowUpRight size={15} strokeWidth={1.3} /></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) {
    return <section className="page-section"><div className="page-width"><Eyebrow>{t.project.notFoundEyebrow}</Eyebrow><h1 className="page-title">{t.project.notFoundTitle}</h1><Link href="/work" className="text-link">{t.project.notFoundBack}</Link></div></section>;
  }
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  return (
    <article data-testid={`page-project-${project.slug}`}>
      <section className="project-intro page-width">
        <Link href="/work" className="back-link" data-testid="link-back-work"><ArrowLeft size={14} strokeWidth={1.3} /> {t.project.backToWork}</Link>
        <div className="project-heading"><div><Eyebrow>{project.category === 'MOTION DESIGN' ? t.filters.motion : t.filters.editing} / {project.year}</Eyebrow><h1 className="page-title">{project.title}</h1>{project.placeholder && <p className="project-status">{t.project.placeholderStatus}</p>}</div><p className="project-description">{t.projectDescriptions[project.slug as keyof typeof t.projectDescriptions]}</p></div>
      </section>
      <section className="project-media-section" data-testid="section-project-media">
        <div className="page-width"><div className="project-player" style={{ aspectRatio: project.aspectRatio }}>{project.videoUrl ? <video className="media-content" src={project.videoUrl} poster={project.thumbnail || undefined} controls playsInline preload="metadata" aria-label={`${project.title} project film`} /> : <PlaceholderVisual project={project} />}</div></div>
      </section>
      <section className="project-notes page-width">
        <Eyebrow>{t.project.notes}</Eyebrow>
        <div className="notes-grid"><div><span>{t.project.role}</span><p>{project.role === 'Motion design' ? t.projectRoles.motion : t.projectRoles.editing}</p></div><div><span>{t.project.software}</span><p>{project.software.join(' / ')}</p></div>{project.client && <div><span>{t.project.client}</span><p>{project.client}</p></div>}</div>
      </section>
      {project.gallery && project.gallery.length > 0 && <section className="project-gallery page-width"><Eyebrow>{t.project.additionalMedia}</Eyebrow><div className="gallery-grid">{project.gallery.map((media) => <img key={media.src} src={media.src} alt={media.alt || `${project.title} ${t.project.additionalMediaAlt}`} style={{ aspectRatio: media.aspectRatio || '4/3' }} loading="lazy" />)}</div></section>}
      <nav className="project-nav page-width" aria-label={t.navigation.project}>
        <Link href={`/work/${previousProject.slug}`} className="project-nav-link" data-testid="link-previous-project"><ArrowLeft size={15} strokeWidth={1.2} /><span><small>{t.project.previous}</small>{previousProject.title}</span></Link>
        <Link href={`/work/${nextProject.slug}`} className="project-nav-link next" data-testid="link-next-project"><span><small>{t.project.next}</small>{nextProject.title}</span><ArrowRight size={15} strokeWidth={1.2} /></Link>
      </nav>
    </article>
  );
}

function Router() {
  return (
    <Layout>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work/:slug" component={ProjectPage} />
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
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;