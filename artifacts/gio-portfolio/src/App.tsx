import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { featuredProject, projects, type Project } from '@/data/projects';
import '@/index.css';

const queryClient = new QueryClient();

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
    { href: '/work', label: 'Selected work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="relative z-40 px-5 py-5 sm:px-8 lg:px-12" data-testid="site-header">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-home">
          <span className="flex h-8 w-8 items-center justify-center border border-foreground text-[13px] font-bold tracking-[-.08em] transition-colors group-hover:bg-foreground group-hover:text-background" aria-hidden="true">G</span>
          <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.18em]">Gio / editor</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`link-underline font-mono-ui text-[10px] uppercase tracking-[.14em] ${location === link.href ? 'text-primary' : 'text-foreground/70'}`} data-testid={`link-${link.label.toLowerCase().replaceAll(' ', '-')}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="flex h-9 w-9 items-center justify-center border border-foreground md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
          {menuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute left-0 right-0 top-full border-y border-foreground/15 bg-background px-5 py-6 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="font-display text-4xl leading-none" data-testid={`mobile-link-${index}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/15 px-5 py-8 sm:px-8 lg:px-12" data-testid="site-footer">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-4xl italic leading-none">Gio</p>
          <p className="mt-3 font-mono-ui text-[9px] uppercase tracking-[.16em] text-foreground/55">Editing time into feeling.</p>
        </div>
        <div className="flex items-center gap-6 font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/65">
          <a className="link-underline" href="mailto:hello@gio.studio" data-testid="link-footer-email">Email</a>
          <a className="link-underline" href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a>
          <span className="text-foreground/40">© {new Date().getFullYear()} Gio</span>
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
    <div className="site-noise min-h-[100dvh] overflow-hidden bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function MediaVisual({ project, className = '', showVideo = false }: { project: Project; className?: string; showVideo?: boolean }) {
  return (
    <div className={`media-frame ${className}`} style={{ backgroundColor: project.accent }} data-testid={`media-${project.slug}`}>
      <img src={project.cover} alt={`${project.title} still`} loading="lazy" />
      {showVideo && (
        <video className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 group-hover:opacity-100" src={project.video} muted loop playsInline autoPlay preload="metadata" aria-label={`${project.title} video preview`} />
      )}
    </div>
  );
}

function ProjectCard({ project, index = 0, className = '' }: { project: Project; index?: number; className?: string }) {
  return (
    <Reveal delay={(index % 3) + 1} className={className}>
      <Link href={`/work/${project.slug}`} className="project-card group block" data-testid={`card-project-${project.slug}`}>
        <MediaVisual project={project} showVideo />
        <div className="flex items-start justify-between gap-4 border-b border-foreground/20 py-4">
          <div>
            <h3 className="font-display text-[2rem] leading-none sm:text-[2.35rem]">{project.title}</h3>
            <p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/55">{project.client} / {project.year}</p>
          </div>
          <span className="project-arrow mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-foreground/25 text-foreground/70" aria-hidden="true">
            <ArrowUpRight size={15} strokeWidth={1.3} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono-ui text-[9px] uppercase tracking-[.2em] text-primary">{children}</p>;
}

function Home() {
  return (
    <>
      <section className="px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pb-32 lg:pt-20" data-testid="section-home-hero">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between gap-8 sm:mb-14">
            <Reveal><Eyebrow>Independent editor / motion designer</Eyebrow></Reveal>
            <Reveal delay={1}><span className="hidden font-mono-ui text-[9px] uppercase tracking-[.15em] text-foreground/50 sm:block">Based between here + elsewhere</span></Reveal>
          </div>
          <div className="clip-reveal">
            <h1 className="hero-title font-display italic">Gio edits<br /><span className="not-italic">time.</span></h1>
          </div>
          <div className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-[1fr_280px] sm:items-end lg:grid-cols-[1fr_390px]">
            <Reveal>
              <p className="max-w-[530px] text-balance text-lg leading-[1.28] text-foreground/75 sm:text-xl">I shape films, titles and moving images around the part you remember later.</p>
            </Reveal>
            <Reveal delay={1} className="border-l border-primary pl-4">
              <p className="font-mono-ui text-[10px] leading-[1.6] text-foreground/65">A practice in rhythm, texture and the carefully chosen cut.<br />Currently available for select collaborations.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-5 py-5 text-primary-foreground sm:px-8 sm:py-8 lg:px-12" data-testid="section-showreel">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-4 flex items-center justify-between">
            <Eyebrow>Showreel / 01:32</Eyebrow>
            <span className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-primary-foreground/50">Sound on if you like</span>
          </div>
          <div className="media-frame aspect-[16/9] min-h-[300px] w-full bg-[#202420] sm:aspect-[2.1/1]">
            <video className="h-full w-full object-cover opacity-80" src={featuredProject.heroVideo ?? featuredProject.video} poster={featuredProject.cover} muted loop autoPlay playsInline preload="metadata" aria-label="Gio showreel" />
            <div className="absolute inset-0 z-[2] flex items-end justify-between p-5 sm:p-8">
              <p className="max-w-[300px] font-display text-3xl leading-[.95] text-primary-foreground sm:text-5xl">Fragments,<br /><i>held together.</i></p>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-foreground/60 font-mono-ui text-[10px] uppercase tracking-[.08em] text-primary-foreground">Play</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36" data-testid="section-selected-work">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
            <div><Eyebrow>Selected work / 2020—24</Eyebrow><h2 className="mt-4 font-display text-5xl leading-[.9] sm:text-7xl">The cut<br /><i>is the story.</i></h2></div>
            <Link href="/work" className="link-underline hidden pb-1 font-mono-ui text-[10px] uppercase tracking-[.14em] sm:block" data-testid="link-view-all-work">View all work <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.5} /></Link>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
            <ProjectCard project={projects[0]} index={0} className="sm:col-span-2 lg:col-span-7" />
            <ProjectCard project={projects[1]} index={1} className="sm:col-span-1 lg:col-span-5 lg:mt-32" />
            <ProjectCard project={projects[2]} index={2} className="sm:col-span-1 lg:col-span-5 lg:col-start-3" />
            <ProjectCard project={projects[3]} index={3} className="sm:col-span-1 lg:col-span-6 lg:col-start-9 lg:mt-36" />
          </div>
          <div className="mt-12 sm:hidden"><Link href="/work" className="link-underline font-mono-ui text-[10px] uppercase tracking-[.14em]" data-testid="link-view-all-work-mobile">View all work <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.5} /></Link></div>
        </div>
      </section>

      <section className="border-t border-foreground/15 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36" data-testid="section-home-about">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><Eyebrow>Point of view</Eyebrow></div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="font-display text-4xl leading-[.98] sm:text-6xl">Good editing is a kind of listening. It knows when to move, when to stay, and when a quiet frame is doing all the work.</p>
            <Link href="/about" className="link-underline mt-10 inline-block font-mono-ui text-[10px] uppercase tracking-[.14em]" data-testid="link-read-about">A little more about Gio <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.5} /></Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

function Work() {
  return (
    <section className="px-5 pb-24 pt-16 sm:px-8 sm:pb-36 sm:pt-24 lg:px-12" data-testid="page-work">
      <div className="mx-auto max-w-[1600px]">
        <Reveal><Eyebrow>Archive / selected work</Eyebrow><h1 className="page-title mt-8 font-display">The work</h1></Reveal>
        <Reveal delay={1} className="mt-10 max-w-[560px] text-lg leading-[1.3] text-foreground/70 sm:ml-[25%]">Films, campaigns, title sequences and visual experiments. Each project starts with the same question: what should this feel like when it ends?</Reveal>
        <div className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:mt-32 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-28">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} className={index % 4 === 0 ? 'sm:col-span-2 lg:col-span-7' : index % 4 === 1 ? 'lg:col-span-5 lg:mt-28' : index % 4 === 2 ? 'lg:col-span-5 lg:col-start-3' : 'lg:col-span-6 lg:col-start-9 lg:mt-24'} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5 pb-24 pt-16 sm:px-8 sm:pb-36 sm:pt-24 lg:px-12" data-testid="page-about">
      <div className="mx-auto max-w-[1600px]">
        <Reveal><Eyebrow>About / the person behind the timeline</Eyebrow><h1 className="page-title mt-8 max-w-5xl font-display">A good frame<br /><i>stays with you.</i></h1></Reveal>
        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-8 lg:mt-32">
          <div className="lg:col-span-4"><div className="media-frame aspect-[4/5]"><img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Gio working at an edit desk" /></div><p className="mt-3 font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/50">Somewhere between the bins</p></div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-display text-4xl leading-[.98] sm:text-6xl">I’m Gio — an independent editor and motion designer working across film, culture and the spaces in between.</p>
            <div className="mt-12 grid gap-8 border-t border-foreground/20 pt-7 sm:grid-cols-2">
              <div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-primary">Approach</p><p className="mt-4 text-sm leading-[1.55] text-foreground/70">Start with the feeling, then find the rhythm. I like the human details: the breath before a line, the hand just out of frame, the cut you only notice on a second watch.</p></div>
              <div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-primary">Based</p><p className="mt-4 text-sm leading-[1.55] text-foreground/70">Available remotely and in-studio for thoughtful teams, independent directors and brands with something real to say.</p></div>
            </div>
          </div>
        </div>
        <div className="mt-24 border-t border-foreground/20 pt-8 sm:mt-40">
          <Eyebrow>Selected collaborators</Eyebrow>
          <div className="mt-10 grid grid-cols-2 gap-y-5 font-display text-3xl sm:grid-cols-4 sm:text-4xl">
            {['NOWNESS', 'Mubi', 'Monocle', 'Aesop', 'Sonder', 'Vitra', 'The Face', 'Object & Thing'].map((name) => <span key={name} className="text-foreground/75">{name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-28 lg:px-12 lg:py-36" data-testid="section-contact-band">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow>Have a feeling in mind?</Eyebrow>
        <div className="mt-8 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl font-display text-6xl leading-[.82] sm:text-8xl lg:text-[10rem]">Let’s make<br /><i>something felt.</i></h2>
          <Link href="/contact" className="link-underline w-fit pb-1 font-mono-ui text-[10px] uppercase tracking-[.15em]" data-testid="link-start-conversation">Start a conversation <ArrowUpRight className="ml-2 inline" size={14} strokeWidth={1.5} /></Link>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="px-5 pb-24 pt-16 sm:px-8 sm:pb-36 sm:pt-24 lg:px-12" data-testid="page-contact">
      <div className="mx-auto max-w-[1600px]">
        <Reveal><Eyebrow>Contact / hello</Eyebrow><h1 className="page-title mt-8 font-display">Let’s talk.</h1></Reveal>
        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:mt-32">
          <div className="lg:col-span-4"><p className="max-w-xs text-lg leading-[1.35] text-foreground/70">For a new film, a title sequence, a campaign with a pulse — tell me what you’re making and where it wants to go.</p><a href="mailto:hello@gio.studio" className="link-underline mt-8 inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.14em]" data-testid="link-contact-email"><Mail size={14} strokeWidth={1.4} /> hello@gio.studio</a></div>
          <div className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <div className="border-t border-foreground/20 py-10" data-testid="status-contact-sent"><p className="font-display text-5xl leading-none">Message noted.</p><p className="mt-4 max-w-sm text-sm leading-[1.5] text-foreground/65">Thanks for reaching out. Gio will be in touch soon.</p><button type="button" className="link-underline mt-8 font-mono-ui text-[10px] uppercase tracking-[.14em]" onClick={() => setSent(false)} data-testid="button-send-another">Send another</button></div>
            ) : (
              <form className="border-t border-foreground/20" onSubmit={(event) => { event.preventDefault(); setSent(true); }} data-testid="form-contact">
                <label className="block border-b border-foreground/20 py-6"><span className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/50">Your name</span><input required name="name" className="mt-3 block w-full border-0 bg-transparent p-0 text-xl outline-none placeholder:text-foreground/30 focus:ring-0" placeholder="Name" data-testid="input-contact-name" /></label>
                <label className="block border-b border-foreground/20 py-6"><span className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/50">Email address</span><input required type="email" name="email" className="mt-3 block w-full border-0 bg-transparent p-0 text-xl outline-none placeholder:text-foreground/30 focus:ring-0" placeholder="you@studio.com" data-testid="input-contact-email" /></label>
                <label className="block border-b border-foreground/20 py-6"><span className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/50">The idea</span><textarea required name="message" rows={4} className="mt-3 block w-full resize-none border-0 bg-transparent p-0 text-xl outline-none placeholder:text-foreground/30 focus:ring-0" placeholder="A few words about the project..." data-testid="input-contact-message" /></label>
                <button type="submit" className="mt-8 flex items-center gap-3 border border-foreground px-5 py-4 font-mono-ui text-[10px] uppercase tracking-[.14em] transition-colors hover:bg-foreground hover:text-background" data-testid="button-send-message">Send message <ArrowUpRight size={14} strokeWidth={1.5} /></button>
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
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return <section className="px-5 py-32 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1600px]"><Eyebrow>404 / not found</Eyebrow><h1 className="mt-8 font-display text-7xl">No such cut.</h1><Link href="/work" className="link-underline mt-10 inline-block font-mono-ui text-[10px] uppercase tracking-[.15em]">Back to the work</Link></div></section>;
  }
  const nextProject = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length];
  return (
    <article data-testid={`page-project-${project.slug}`}>
      <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Link href="/work" className="link-underline inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.15em] text-foreground/60" data-testid="link-back-work"><ArrowLeft size={14} strokeWidth={1.3} /> Back to selected work</Link>
          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:mt-28">
            <div className="lg:col-span-8"><Eyebrow>{project.client} / {project.year}</Eyebrow><h1 className="page-title mt-8 font-display">{project.title}</h1></div>
            <p className="max-w-sm text-lg leading-[1.3] text-foreground/70 lg:col-span-3 lg:col-start-10">{project.description}</p>
          </div>
        </div>
      </section>
      <section className="bg-secondary px-5 py-5 sm:px-8 sm:py-8 lg:px-12" data-testid="section-project-media">
        <div className="mx-auto max-w-[1600px]">
          <div className="media-frame aspect-[16/10] min-h-[320px] bg-[#262824] sm:aspect-[2/1]"><video className="h-full w-full object-cover opacity-90" src={project.video} poster={project.cover} controls playsInline preload="metadata" aria-label={`${project.title} project film`} /></div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3"><Eyebrow>Project notes</Eyebrow></div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:grid-cols-3">
            <div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-foreground/45">Role</p><p className="mt-3 text-sm leading-[1.4]">{project.role}</p></div>
            <div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-foreground/45">Discipline</p><p className="mt-3 text-sm leading-[1.4]">{project.discipline}</p></div>
            <div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-foreground/45">Software</p><p className="mt-3 text-sm leading-[1.7]">{project.software.join(' / ')}</p></div>
          </div>
        </div>
      </section>
      <section className="border-t border-foreground/15 px-5 pb-24 pt-10 sm:px-8 sm:pb-36 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between"><Eyebrow>More from the timeline</Eyebrow><span className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/45">Stills / process</span></div>
          <div className="grid gap-5 sm:grid-cols-2"><div className="media-frame aspect-[4/3]"><img src={project.gallery[0]} alt={`${project.title} behind the scenes still 1`} loading="lazy" /></div><div className="media-frame aspect-[4/3] sm:mt-20"><img src={project.gallery[1]} alt={`${project.title} behind the scenes still 2`} loading="lazy" /></div></div>
          <div className="mt-24 flex justify-end border-t border-foreground/20 pt-7"><Link href={`/work/${nextProject.slug}`} className="group flex items-center gap-5" data-testid="link-next-project"><span className="text-right"><span className="block font-mono-ui text-[9px] uppercase tracking-[.15em] text-foreground/45">Next project</span><span className="mt-2 block font-display text-4xl leading-none">{nextProject.title}</span></span><span className="flex h-10 w-10 items-center justify-center border border-foreground/30 transition-colors group-hover:bg-foreground group-hover:text-background"><ArrowUpRight size={16} strokeWidth={1.3} /></span></Link></div>
        </div>
      </section>
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