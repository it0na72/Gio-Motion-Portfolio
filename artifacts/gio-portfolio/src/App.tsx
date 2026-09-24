import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, Menu, Play, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { projects, type Project } from '@/data/projects';
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
  const links = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="site-header" data-testid="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" data-testid="link-home">Gio Oliveira</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? 'is-current' : ''}`} data-testid={`link-${link.label.toLowerCase()}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
          {menuOpen ? <X size={17} strokeWidth={1.4} /> : <Menu size={17} strokeWidth={1.4} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link" data-testid={`mobile-link-${link.label.toLowerCase()}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-inner">
        <p className="footer-note">Editing time into feeling.</p>
        <div className="footer-links">
          <a href="mailto:hello@giooliveira.com" data-testid="link-footer-email">Email</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a>
          <span>© {new Date().getFullYear()} Gio Oliveira</span>
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
  return (
    <div className="placeholder-visual" style={{ '--project-index': projects.indexOf(project) + 1 } as CSSProperties}>
      <span className="placeholder-mark" aria-hidden="true">G / {String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
      <span className="placeholder-label">MEDIA PLACEHOLDER</span>
      <span className="placeholder-ratio">{project.aspectRatio.replace('/', ' : ')}</span>
    </div>
  );
}

function MediaVisual({ project, showVideo = false }: { project: Project; showVideo?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
        <video ref={videoRef} className="media-content" src={project.videoUrl} poster={project.thumbnail || undefined} muted loop playsInline preload="metadata" aria-label={`${project.title} video preview`} />
      ) : project.thumbnail ? (
        <img className="media-content" src={project.thumbnail} alt={`${project.title} thumbnail`} loading="lazy" />
      ) : (
        <PlaceholderVisual project={project} />
      )}
      {showVideo && project.videoUrl && <span className="play-indicator" aria-hidden="true"><Play size={11} fill="currentColor" strokeWidth={1.2} /></span>}
      {project.placeholder && <span className="placeholder-badge">Placeholder</span>}
    </div>
  );
}

function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={(index % 3) + 1} className={`project-card-wrap ${project.aspectRatio === '9/16' ? 'card-vertical' : ''}`}>
      <Link href={`/work/${project.slug}`} className="project-card group" data-testid={`card-project-${project.slug}`}>
        <MediaVisual project={project} showVideo />
        <div className="project-card-meta">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-kicker">{project.category} <span>/</span> {project.year}</p>
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
  return (
    <div className="filter-bar" role="group" aria-label="Filter selected work">
      {(['ALL', 'MOTION DESIGN', 'VIDEO EDITING'] as Filter[]).map((item) => (
        <button type="button" key={item} className={`filter-button ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}>
          {item}
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
  return (
    <>
      <section className="hero-section" data-testid="section-home-hero">
        <div className="page-width">
          <Reveal><Eyebrow>Independent editor / motion designer</Eyebrow></Reveal>
          <div className="hero-copy">
            <div className="clip-reveal"><h1 className="hero-title">Gio Oliveira</h1></div>
            <Reveal delay={1}><p className="hero-role">Video editor /<br />Motion designer</p></Reveal>
          </div>
          <Reveal delay={2} className="hero-intro">
            <p>I edit videos, build motion systems, and make things move.</p>
            <span className="hero-location">Based in Japan<br />Available worldwide</span>
          </Reveal>
        </div>
      </section>
      <section className="selected-work-section" data-testid="section-selected-work">
        <div className="page-width">
          <div className="section-heading">
            <div><Eyebrow>Selected work</Eyebrow><h2 className="section-title">A moving<br /><i>picture.</i></h2></div>
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
          <WorkGrid filter={filter} />
        </div>
      </section>
      <section className="point-of-view" data-testid="section-home-about">
        <div className="page-width point-grid">
          <Eyebrow>Point of view</Eyebrow>
          <div>
            <p className="statement">Good editing is a kind of listening. It knows when to move, when to stay, and when a quiet frame is doing all the work.</p>
            <Link href="/about" className="text-link" data-testid="link-read-about">More about Gio <ArrowUpRight size={14} strokeWidth={1.3} /></Link>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function Work() {
  const [filter, setFilter] = useState<Filter>('ALL');
  return (
    <section className="page-section work-page" data-testid="page-work">
      <div className="page-width">
        <Reveal><Eyebrow>Archive / selected work</Eyebrow><h1 className="page-title">The work</h1></Reveal>
        <Reveal delay={1} className="page-lead">Video editing and motion design, with the project context left visible.</Reveal>
        <div className="work-toolbar"><FilterBar filter={filter} setFilter={setFilter} /><span className="work-count">{projects.length} projects / currently being filled</span></div>
        <WorkGrid filter={filter} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-section" data-testid="page-about">
      <div className="page-width">
        <Reveal><Eyebrow>About / the person behind the timeline</Eyebrow><h1 className="page-title about-title">Make it move<br /><i>with purpose.</i></h1></Reveal>
        <div className="about-grid">
          <div className="about-index"><span>01</span><span>GIO OLIVEIRA</span></div>
          <div>
            <p className="about-lead">Gio is a video editor and motion designer based in Japan.</p>
            <p className="about-copy">Working from the cut outward, Gio builds films and motion systems around rhythm, clarity, and the details that stay in your head after the frame is gone.</p>
            <div className="skills-block">
              <Eyebrow>Focus</Eyebrow>
              <div className="skill-list"><span>Video Editing</span><span>Motion Design</span><span>After Effects</span><span>Premiere Pro</span><span>Blender</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="contact-band" data-testid="section-contact-band">
      <div className="page-width">
        <Eyebrow>Have a project in mind?</Eyebrow>
        <div className="contact-band-row"><h2>Let’s make<br /><i>something move.</i></h2><Link href="/contact" className="text-link light" data-testid="link-start-conversation">Start a conversation <ArrowUpRight size={14} strokeWidth={1.3} /></Link></div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="page-section contact-page" data-testid="page-contact">
      <div className="page-width">
        <Reveal><Eyebrow>Contact / hello</Eyebrow><h1 className="page-title">Let’s talk.</h1></Reveal>
        <div className="contact-grid">
          <div className="contact-details">
            <p className="contact-lead">Have a project in mind?</p>
            <a href="mailto:hello@giooliveira.com" className="text-link" data-testid="link-contact-email"><Mail size={15} strokeWidth={1.3} /> hello@giooliveira.com</a>
            <div className="social-links"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-contact-instagram">Instagram</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" data-testid="link-contact-youtube">YouTube</a></div>
          </div>
          <div>
            {sent ? (
              <div className="sent-message" data-testid="status-contact-sent"><p>Message noted.</p><span>Thanks for reaching out. Gio will be in touch soon.</span><button type="button" className="text-link" onClick={() => setSent(false)} data-testid="button-send-another">Send another</button></div>
            ) : (
              <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }} data-testid="form-contact">
                <label><span>Name</span><input required name="name" placeholder="Your name" data-testid="input-contact-name" /></label>
                <label><span>Email</span><input required type="email" name="email" placeholder="you@studio.com" data-testid="input-contact-email" /></label>
                <label><span>Project</span><textarea required name="message" rows={4} placeholder="A few words about the project..." data-testid="input-contact-message" /></label>
                <button type="submit" className="form-submit" data-testid="button-send-message">Send message <ArrowUpRight size={15} strokeWidth={1.3} /></button>
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
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) {
    return <section className="page-section"><div className="page-width"><Eyebrow>404 / not found</Eyebrow><h1 className="page-title">No such cut.</h1><Link href="/work" className="text-link">Back to the work</Link></div></section>;
  }
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  return (
    <article data-testid={`page-project-${project.slug}`}>
      <section className="project-intro page-width">
        <Link href="/work" className="back-link" data-testid="link-back-work"><ArrowLeft size={14} strokeWidth={1.3} /> Back to work</Link>
        <div className="project-heading"><div><Eyebrow>{project.category} / {project.year}</Eyebrow><h1 className="page-title">{project.title}</h1>{project.placeholder && <p className="project-status">Placeholder project — replace with Gio’s work</p>}</div><p className="project-description">{project.description}</p></div>
      </section>
      <section className="project-media-section" data-testid="section-project-media">
        <div className="page-width"><div className="project-player" style={{ aspectRatio: project.aspectRatio }}>{project.videoUrl ? <video className="media-content" src={project.videoUrl} poster={project.thumbnail || undefined} controls playsInline preload="metadata" aria-label={`${project.title} project film`} /> : <PlaceholderVisual project={project} />}</div></div>
      </section>
      <section className="project-notes page-width">
        <Eyebrow>Project notes</Eyebrow>
        <div className="notes-grid"><div><span>Role</span><p>{project.role}</p></div><div><span>Software</span><p>{project.software.join(' / ')}</p></div>{project.client && <div><span>Client</span><p>{project.client}</p></div>}</div>
      </section>
      {project.gallery && project.gallery.length > 0 && <section className="project-gallery page-width"><Eyebrow>Additional media</Eyebrow><div className="gallery-grid">{project.gallery.map((media) => <img key={media.src} src={media.src} alt={media.alt || `${project.title} additional media`} style={{ aspectRatio: media.aspectRatio || '4/3' }} loading="lazy" />)}</div></section>}
      <nav className="project-nav page-width" aria-label="Project navigation">
        <Link href={`/work/${previousProject.slug}`} className="project-nav-link" data-testid="link-previous-project"><ArrowLeft size={15} strokeWidth={1.2} /><span><small>Previous</small>{previousProject.title}</span></Link>
        <Link href={`/work/${nextProject.slug}`} className="project-nav-link next" data-testid="link-next-project"><span><small>Next</small>{nextProject.title}</span><ArrowRight size={15} strokeWidth={1.2} /></Link>
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;