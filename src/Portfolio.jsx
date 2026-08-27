import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  GitBranch,
  Globe,
  Mail,
  Menu,
  MonitorSmartphone,
  Sparkles,
  SunMoon,
  TimerReset,
  Trophy,
  Zap,
  X,
} from "lucide-react";
import heroPortfolio from "../assets/hero-portfolio.png";

const githubUrl = "https://github.com/shantanu2389";
const linkedinUrl = "https://www.linkedin.com/in/shantanu-mishra-15391a3ba/";

const phrases = ["Frontend Developer", "React Developer", "UI Designer"];

const timeline = [
  { year: "2024", title: "Started Web Development", detail: "Learned HTML, CSS, JavaScript, and the fundamentals of responsive design." },
  { year: "2025", title: "Built React & Tailwind Projects", detail: "Created interactive apps, polished UIs, and practical portfolio pieces." },
  { year: "2026", title: "Focused on Premium Frontend Experiences", detail: "Blending smooth animation, thoughtful UX, and clean component architecture." },
];

const techStack = [
  { name: "React", icon: Code2, glow: "from-cyan-400/20 to-emerald-400/10" },
  { name: "JavaScript", icon: Zap, glow: "from-amber-400/20 to-rose-400/10" },
  { name: "GitHub", icon: GitBranch, glow: "from-violet-400/20 to-fuchsia-400/10" },
  { name: "Tailwind", icon: Sparkles, glow: "from-emerald-400/20 to-cyan-400/10" },
  { name: "Node.js", icon: Globe, glow: "from-lime-400/20 to-emerald-400/10" },
  { name: "UI Design", icon: MonitorSmartphone, glow: "from-rose-400/20 to-amber-400/10" },
];

const projects = [
  {
    title: "Birthday Surprise Website",
    desc: "Interactive animated surprise website with cinematic transitions, playful effects, and memorable storytelling sections.",
    tech: "React, Tailwind CSS, Vite",
    demo: "https://example.com",
    caseStudy: "A polished interactive landing page designed to surprise and delight while keeping the experience fast and responsive.",
  },
  {
    title: "Portfolio Website",
    desc: "Modern responsive portfolio with premium gradients, glassmorphism cards, and smooth reveals for a professional presence.",
    tech: "React, Tailwind CSS, Vite",
    demo: "https://example.com",
    caseStudy: "Focused on clarity, strong visual hierarchy, and immersive micro-interactions to elevate the developer brand.",
  },
  {
    title: "Calculator App",
    desc: "A clean calculator app with an accessible layout, simple interactions, and mobile-friendly behavior.",
    tech: "React, JavaScript",
    demo: "https://example.com",
    caseStudy: "Designed to be lightweight, easy to use, and a practical example of modern React UI building blocks.",
  },
];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "100+", label: "Hours Coding" },
  { value: "5+", label: "Technologies" },
  { value: "2+", label: "Years Learning" },
];

const highlights = [
  "Modern, responsive layouts built for every screen size.",
  "Smooth animations, glowing accents, and premium UI details.",
  "Clear React architecture with a focus on performance and polish.",
];

export default function Portfolio() {
  const [formStatus, setFormStatus] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubProfile, setGithubProfile] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(storedTheme || (prefersLight ? "light" : "dark"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, current)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeLoop = () => {
      const phrase = phrases[phraseIndex];
      setTypedText(phrase.slice(0, charIndex));

      if (!isDeleting && charIndex < phrase.length) {
        charIndex += 1;
      } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
      } else if (!isDeleting) {
        isDeleting = true;
        window.setTimeout(typeLoop, 900);
        return;
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      window.setTimeout(typeLoop, isDeleting ? 35 : 60);
    };

    typeLoop();
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetch("https://api.github.com/users/shantanu2389")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch GitHub profile");
        return response.json();
      })
      .then((data) => {
        if (isMounted) setGithubProfile(data);
      })
      .catch(() => {
        if (isMounted) setGithubProfile(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = document.getElementById("stats-section");
    if (!target) return undefined;

    const animateCounters = () => {
      const finish = [10, 100, 5, 2];
      const duration = 1300;
      const startTime = performance.now();

      const step = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts(finish.map((value) => Math.floor(value * eased)));
        if (progress < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const moveCursor = (event) => setCursorPosition({ x: event.clientX, y: event.clientY });

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handlePointerEnter = (event) => {
      const target = event.target.closest("a, button, input, textarea, [role='button']");
      const cursorEl = document.querySelector(".cursor");
      if (target && cursorEl) {
        cursorEl.classList.add("is-active");
      }
    };

    const handlePointerLeave = (event) => {
      const target = event.target.closest("a, button, input, textarea, [role='button']");
      const cursorEl = document.querySelector(".cursor");
      if (target && cursorEl) {
        cursorEl.classList.remove("is-active");
      }
    };

    document.addEventListener("pointerover", handlePointerEnter);
    document.addEventListener("pointerout", handlePointerLeave);

    return () => {
      document.removeEventListener("pointerover", handlePointerEnter);
      document.removeEventListener("pointerout", handlePointerLeave);
    };
  }, []);

  const handleTiltMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 10 });
  };

  const handleTiltLeave = () => setTilt({ x: 0, y: 0 });

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:hm7694821@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus("Your email app is opening with the message ready to send.");
    event.currentTarget.reset();
  };

  const accentLabel = useMemo(() => (theme === "light" ? "Light mode" : "Dark mode"), [theme]);

  return (
    <div className="min-h-screen scroll-smooth bg-[var(--surface)] font-sans text-[var(--text)]">
      <div className="cursor" style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)` }} />
      <div className="loader" aria-hidden="true" data-loaded={isLoaded}>
        <div className="loader-shell">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      </div>
      <div className="particle-layer" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => (<span key={index} className="particle" />))}</div>
      <div className="blob blob-one" aria-hidden="true" />
      <div className="blob blob-two" aria-hidden="true" />

      <nav className="fixed left-0 top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--panel)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-2xl font-bold tracking-wide" aria-label="Go to home">Shantanu<span className="text-emerald-500 dark:text-emerald-300">.</span></a>
          <div className="hidden gap-8 text-sm text-[var(--text)]/90 md:flex">{["Home", "About", "Skills", "Projects", "Contact"].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>))}</div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--theme-btn-border)] bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] shadow-lg backdrop-blur-md transition duration-300 hover:border-emerald-500 hover:text-emerald-500" aria-label={`Switch to ${accentLabel} theme`}>
              <SunMoon size={16} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="icon-button md:hidden" aria-label="Toggle navigation" type="button">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="h-1 w-full bg-[var(--border)]"><div className="h-full rounded-r bg-emerald-500 dark:bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.9)] transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} /></div>
        
        {/* Responsive Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="fixed left-0 top-[73px] z-30 w-full border-b border-[var(--border)] bg-[var(--panel)]/95 py-6 shadow-xl backdrop-blur-xl md:hidden transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col items-center gap-6 text-base font-medium">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link w-fit py-1 text-center"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="grid w-full max-w-6xl items-center gap-14 pt-16 md:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">Available for freelance</p>
            <h1 className="mb-5 text-5xl font-black leading-tight md:text-7xl">Hi, I&apos;m <span className="text-emerald-600 dark:text-emerald-300">Shantanu Mishra</span></h1>
            <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-200">{typedText}<span className="animate-pulse">|</span></p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">I build modern frontend experiences with smooth animation, React, and a strong eye for detail.</p>
            <ul className="mt-6 grid gap-3 text-sm text-[var(--text)]">{highlights.map((item) => (<li key={item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3 shadow-lg shadow-[var(--shadow-color)]"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-300" /><span>{item}</span></li>))}</ul>
            <div className="mt-10 flex flex-wrap gap-4"><a href="#projects" className="primary-button">View Projects <ArrowUpRight size={18} /></a><a href="/resume.docx" download="Shantanu_Mishra_Resume.docx" className="secondary-button"><Download size={18} />Download Resume</a><a href={githubUrl} target="_blank" rel="noreferrer" className="secondary-button"><GitBranch size={18} />GitHub</a></div>
            <a href="#about" className="scroll-indicator mt-8 inline-flex items-center gap-2 text-sm text-[var(--text)]">Scroll down <span className="scroll-dot" /></a>
          </div>

          <div className="reveal flex justify-center" style={{ "--reveal-delay": "120ms" }}>
            <div className="relative w-full max-w-md" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
              <div className="absolute inset-0 rounded-full bg-emerald-400/25 blur-3xl" />
              <article className="tilt-card card-surface relative flex h-[420px] w-full flex-col items-center justify-center p-8 shadow-2xl" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
                <div className="glow-ring absolute inset-4 rounded-3xl border border-emerald-500/20 dark:border-emerald-400/20" />
                <img src={githubProfile?.avatar_url || heroPortfolio} alt={githubProfile?.name || "Shantanu Mishra"} className="h-40 w-40 rounded-full border-4 border-emerald-500 dark:border-emerald-300 object-cover shadow-lg" />
                <h2 className="mt-8 text-3xl font-bold">Shantanu Mishra</h2>
                <p className="mt-2 text-center text-[var(--muted)]">Frontend Developer • React Enthusiast</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">{["React", "Tailwind", "UI Design"].map((tag) => (<span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-[var(--tag-text)] px-3 py-1 text-sm font-medium">{tag}</span>))}</div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[var(--surface-alt)]/60 border-y border-[var(--border)] px-6 py-24">
        <div className="reveal mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <article className="card-surface p-7"><p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">About Me</p><h2 className="mb-5 text-4xl font-bold md:text-5xl">Learning, building, and polishing modern interfaces.</h2><p className="text-lg leading-relaxed text-[var(--muted)]">I’m a passionate frontend learner from Dera Bassi, creating modern interfaces with React, JavaScript, and thoughtful design choices. I focus on clarity, visual polish, and smooth user experiences that feel premium.</p><ul className="mt-6 grid gap-3 text-[var(--text)]">{["Current focus: React ecosystem, modern UI patterns, and interactive design.", "Fun fact: I enjoy turning ideas into small, delightful experiences.", "Learning journey: from HTML/CSS basics to portfolio-grade interfaces and animation.", "Coding hours: focused practice, building projects and refining every detail."].map((item) => (<li key={item} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3">{item}</li>))}</ul></article>
          <article id="stats-section" className="grid gap-6 md:grid-cols-2">{stats.map((stat, index) => (<div key={stat.label} className="reveal card-surface p-6" style={{ "--reveal-delay": `${index * 90}ms` }}><p className="text-4xl font-black text-emerald-600 dark:text-emerald-300">{stat.label === "Hours Coding" ? `${counts[1]}+` : stat.label === "Technologies" ? `${counts[2]}+` : stat.label === "Years Learning" ? `${counts[3]}+` : `${counts[0]}+`}</p><p className="mt-2 text-[var(--muted)]">{stat.label}</p></div>))}</article>
        </div>
      </section>

      <section id="skills" className="px-6 py-24"><div className="reveal mx-auto max-w-6xl"><p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">Tech Stack</p><h2 className="mb-14 text-4xl font-bold md:text-5xl">Hover-ready tools and technologies</h2><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{techStack.map((item, index) => { const Icon = item.icon; return <article key={item.name} className={`tech-chip card-surface p-6 bg-gradient-to-br ${item.glow}`} style={{ "--reveal-delay": `${index * 70}ms` }}><Icon className="mb-4 text-emerald-500 dark:text-emerald-300" size={28} /><h3 className="text-2xl font-bold text-[var(--text)]">{item.name}</h3><p className="mt-2 text-[var(--muted)]">Modern stack choice for interface building, performance, and clean workflows.</p></article>; })}</div></div></section>

      <section id="projects" className="bg-[var(--surface-alt)]/60 border-y border-[var(--border)] px-6 py-24"><div className="reveal mx-auto max-w-6xl"><p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">Real Projects</p><h2 className="mb-14 text-4xl font-bold md:text-5xl">Showcase cards with live preview and case studies</h2><div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => (<article key={project.title} className="project-card reveal card-surface overflow-hidden flex flex-col justify-between" style={{ "--reveal-delay": `${index * 90}ms` }}><div className="flex h-52 items-center justify-center bg-gradient-to-br from-emerald-400/10 via-[var(--surface-alt)] to-rose-400/10 border-b border-[var(--border)]"><MonitorSmartphone className="text-[var(--text)]" size={54} /></div><div className="p-6 flex-grow flex flex-col justify-between"><div><h3 className="mb-3 text-2xl font-bold">{project.title}</h3><p className="mb-4 leading-relaxed text-[var(--muted)]">{project.desc}</p><p className="mb-2 text-sm text-emerald-600 dark:text-emerald-300 font-semibold">Tech: {project.tech}</p><p className="mb-5 text-sm text-[var(--muted)] line-clamp-3">{project.caseStudy}</p></div><div className="flex flex-wrap gap-2 pt-2"><a href={project.demo} target="_blank" rel="noreferrer" className="primary-button text-xs py-2 h-10 px-3">Live Demo</a><button type="button" onClick={() => setSelectedProject(project)} className="secondary-button text-xs py-2 h-10 px-3">Case Study</button><a href={githubUrl} target="_blank" rel="noreferrer" className="secondary-button text-xs py-2 h-10 px-3">GitHub</a></div></div></article>))}</div></div></section>

      <section className="px-6 py-24"><div className="reveal mx-auto grid max-w-6xl gap-8 md:grid-cols-3">{[{title:"Experience Timeline", icon:BriefcaseBusiness, text:"2024 → Started web development, 2025 → Learned React and reusable UI patterns, 2026 → Building polished frontend projects."}, {title:"Certifications", icon:Trophy, text:"React fundamentals, JavaScript mastery basics, GitHub foundations, and practical frontend workflow practice."}, {title:"Current Focus", icon:TimerReset, text:"React ecosystem, performance improvements, animation details, and responsive portfolio design."}].map((item, index) => { const Icon = item.icon; return <article key={item.title} className="card-surface p-6" style={{ "--reveal-delay": `${index * 90}ms` }}><Icon className="mb-4 text-emerald-500 dark:text-emerald-300" size={22} /><h3 className="text-xl font-bold text-[var(--text)]">{item.title}</h3><p className="mt-3 text-[var(--muted)]">{item.text}</p></article>; })}</div></section>

      <section className="bg-[var(--surface-alt)]/60 border-y border-[var(--border)] px-6 py-24"><div className="reveal mx-auto grid max-w-6xl gap-8 md:grid-cols-2"><article className="card-surface p-6"><h3 className="text-2xl font-bold">Experience Timeline</h3><div className="mt-6 space-y-6">{timeline.map((item) => (<div key={item.year} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-emerald-500 dark:before:bg-emerald-300 after:absolute after:left-[5px] after:top-6 after:h-full after:w-px after:bg-[var(--timeline-line)]"><p className="text-sm uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300 font-semibold">{item.year}</p><h4 className="mt-2 text-xl font-semibold text-[var(--text)]">{item.title}</h4><p className="mt-2 text-[var(--muted)]">{item.detail}</p></div>))}</div></article><article className="card-surface p-6"><h3 className="text-2xl font-bold">Developer Notes</h3><p className="mt-3 text-[var(--muted)]">This portfolio now includes a typing intro, polished glow effects, animated stats, a downloadable resume, theme switching, and richer project pages for a more premium presentation.</p><div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-5 text-sm text-[var(--text)]">Tip: Replace the placeholder demo links with real case studies and screenshots once your live project URLs are ready.</div></article></div></section>

      <section id="contact" className="px-6 py-24"><div className="reveal mx-auto max-w-4xl"><p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">Contact</p><h2 className="mb-6 text-4xl font-black md:text-5xl">Let&apos;s build something memorable</h2><p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">Interested in collaboration, freelance work, or a polished frontend solution? Send a note and I&apos;ll reply soon.</p><form className="mt-10 grid gap-5" onSubmit={handleContactSubmit} aria-label="Contact Shantanu"><div className="grid gap-5 md:grid-cols-2"><label className="form-field"><span>Name</span><input name="name" type="text" autoComplete="name" required /></label><label className="form-field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label></div><label className="form-field"><span>Message</span><textarea name="message" rows="6" required /></label><div className="flex flex-wrap items-center gap-5"><button type="submit" className="primary-button"><Mail size={18} />Send Message</button><a href={githubUrl} target="_blank" rel="noreferrer" className="secondary-button"><GitBranch size={18} />GitHub</a><a href={linkedinUrl} target="_blank" rel="noreferrer" className="secondary-button"><BriefcaseBusiness size={18} />LinkedIn</a></div><p className="min-h-6 text-sm text-[var(--muted)]" role="status">{formStatus}</p></form></div></section>

      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-2xl relative animate-scaleIn">
            <button type="button" onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] transition" aria-label="Close details">
              <X size={20} />
            </button>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-300 font-semibold">Project Spotlight</p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--text)]">{selectedProject.title}</h3>
            </div>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">{selectedProject.desc}</p>
            <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-300 font-semibold">Tech stack: {selectedProject.tech}</p>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text)] mb-2">Case Study</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{selectedProject.caseStudy}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="primary-button text-xs py-2 h-10 px-4">Live Demo</a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="secondary-button text-xs py-2 h-10 px-4">GitHub</a>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">(c) 2026 Shantanu Mishra. Built with React, Tailwind CSS, and Vite.</footer>
    </div>
  );
}
