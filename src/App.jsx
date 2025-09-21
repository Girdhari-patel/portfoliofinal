import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Menu, ArrowUpRight, Github, Linkedin, Mail, Phone, Download, ExternalLink, FolderGit2, Star, MapPin
} from "lucide-react";

/** ====== YOUR INFO (EDIT) ====== */
const PROFILE = {
  name: "Your Name",
  role: "Frontend Developer",
  location: "Mumbai, IN",
  email: "you@example.com",
  phone: "+91 98XXXXXXX",
  github: "https://github.com/yourhandle",
  linkedin: "https://www.linkedin.com/in/yourhandle/",
  resumeUrl: "#", // link to your PDF resume
  primary: "#e64b47",
  borderTint: "#f3b3a6",
  heading: "#3b2f2f",
};

const PROJECTS = [
  {
    title: "Smart Courier App",
    desc: "Next.js + Tailwind app with real-time tracking and map overlays.",
    tags: ["Next.js", "Tailwind", "Mapbox", "Supabase"],
    live: "#",
    code: "#",
  },
  {
    title: "Portfolio Engine",
    desc: "Markdown-driven personal site generator with dark mode and MDX.",
    tags: ["Vite", "MDX", "Framer Motion"],
    live: "#",
    code: "#",
  },
  {
    title: "UI Components Kit",
    desc: "Accessible, composable React components with headless patterns.",
    tags: ["React", "Radix", "TypeScript"],
    live: "#",
    code: "#",
  },
];

/** ====== PRIMITIVES (CowIndia vibe) ====== */
const Button = ({ children, variant = "solid", size = "md", className = "", ...props }) => (
  <button
    className={[
      "inline-flex items-center justify-center gap-2 rounded-full transition border",
      size === "lg" ? "h-12 px-6 text-base" : "h-10 px-5 text-sm",
      variant === "outline"
        ? "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50"
        : "bg-gray-900 text-white border-gray-900 hover:opacity-95",
      className,
    ].join(" ")}
    {...props}
  >
    {children}
  </button>
);

const Chip = ({ children, className = "" }) => (
  <span
    className={[
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm shadow-sm border",
      "bg-amber-50 text-amber-800 border-amber-200",
      className,
    ].join(" ")}
  >
    {children}
  </span>
);

const Card = ({ children, className = "", gridBg = false }) => (
  <div
    className={["relative rounded-[28px] border bg-white", className].join(" ")}
    style={{
      borderColor: PROFILE.borderTint,
      boxShadow: "0 16px 40px -18px rgba(230,75,71,0.28)",
    }}
  >
    {gridBg && <div className="pointer-events-none absolute inset-0 opacity-20 grid-pan" />}
    <div className="relative">{children}</div>
  </div>
);

/** ====== Animations ====== */
const useAnims = () => {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 0.6;
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: dur, ease: "easeOut" } },
  };
  const fade = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: dur } } };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } } };
  return { fadeUp, fade, stagger };
};

/** ====== Scroll Spy ====== */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -55% 0px", threshold: [0, 0.3, 0.6, 1] }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/** ====== Sections ====== */
function Navbar() {
  const { fade } = useAnims();
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="rounded-full border bg-white/90 backdrop-blur shadow-md h-14 px-4 flex items-center justify-between"
        >
          <a href="#" className="font-extrabold tracking-tight text-lg">{PROFILE.name}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
              <Button className="hidden sm:inline-flex bg-red-500 border-red-500">
                Resume <Download className="w-4 h-4" />
              </Button>
            </a>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function Hero() {
  const { fadeUp, stagger } = useAnims();
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <Card className="p-8 lg:p-12">
          <div className="text-center">
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Open to work • Remote/Hybrid</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: PROFILE.heading }}>
              {PROFILE.name}
            </h1>
            <p className="mt-2 text-lg text-gray-700">{PROFILE.role} • <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4"/>{PROFILE.location}</span></p>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              I build crisp, accessible UIs with React + Tailwind. Love motion design, performance, and clean DX.
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <motion.a variants={fadeUp} href={PROFILE.github} target="_blank" className="inline-flex w-10 h-10 rounded-full border items-center justify-center text-gray-700"><Github className="w-5 h-5"/></motion.a>
              <motion.a variants={fadeUp} href={PROFILE.linkedin} target="_blank" className="inline-flex w-10 h-10 rounded-full border items-center justify-center text-gray-700"><Linkedin className="w-5 h-5"/></motion.a>
              <motion.a variants={fadeUp} href={`mailto:${PROFILE.email}`} className="inline-flex w-10 h-10 rounded-full border items-center justify-center text-gray-700"><Mail className="w-5 h-5"/></motion.a>
            </motion.div>
          </div>

          {/* Hero “chips rail” as highlights */}
          <div className="mt-12 hero-rail rounded-full bg-white/60 backdrop-blur p-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Node"].map((s, i) => (
                <span key={s} className={`chip-bob ${i%4===0?'chip-tilt-1':i%4===1?'chip-tilt-2':i%4===2?'chip-tilt-3':'chip-tilt-4'} delay-${(i%5)+1}`}>
                  <Chip className="bg-yellow-100 text-black/80 border-yellow-200">{s}</Chip>
                </span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

function Work() {
  const { fadeUp, stagger } = useAnims();
  return (
    <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="p-8 lg:p-10" gridBg>
        <div className="text-center mb-8">
          <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Selected work</span>
          <h2 className="text-3xl font-extrabold mt-3" style={{ color: PROFILE.heading }}>Projects</h2>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className="rounded-2xl border p-5 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-gray-700"/>
                  <h3 className="font-semibold">{p.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {p.live && <a className="inline-flex w-8 h-8 rounded-full border items-center justify-center" href={p.live} target="_blank"><ExternalLink className="w-4 h-4"/></a>}
                  {p.code && <a className="inline-flex w-8 h-8 rounded-full border items-center justify-center" href={p.code} target="_blank"><Github className="w-4 h-4"/></a>}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map(t => <Chip key={t} className="bg-gray-100 text-gray-800 border-gray-200">{t}</Chip>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </section>
  );
}

function Skills() {
  const { fadeUp } = useAnims();
  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <Card className="p-8 lg:p-10">
          <h2 className="text-3xl font-extrabold" style={{ color: PROFILE.heading }}>Skills</h2>
          <p className="mt-2 text-gray-600">I design & ship delightful interfaces with solid engineering.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Node", "Git"].map(s => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const { fadeUp } = useAnims();
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <Card className="p-8 lg:p-10" gridBg>
          <h2 className="text-3xl font-extrabold" style={{ color: PROFILE.heading }}>Testimonials</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border p-5 bg-white">
              <div className="flex items-center gap-2 text-amber-600"><Star className="w-4 h-4"/> <b>CTO, Acme Inc.</b></div>
              <p className="mt-2 text-sm text-gray-600">“Delivered a pixel-perfect dashboard with great attention to accessibility and performance.”</p>
            </div>
            <div className="rounded-2xl border p-5 bg-white">
              <div className="flex items-center gap-2 text-amber-600"><Star className="w-4 h-4"/> <b>PM, Delta Labs</b></div>
              <p className="mt-2 text-sm text-gray-600">“Superb communication and motion design sense. Our users loved the micro-interactions.”</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="p-0 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="bg-red-500 text-white p-8 lg:p-12 rounded-[28px]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight">Let’s build something great</h3>
              <p className="mt-2 text-white/90">Available for freelance & full-time. Based in {PROFILE.location}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">Download CV <Download className="w-4 h-4"/></Button>
                </a>
                <a href={`mailto:${PROFILE.email}`}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">Email me <ArrowUpRight className="w-4 h-4"/></Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block opacity-80">
              <ul className="space-y-2 text-2xl font-semibold">
                <li>Clean, accessible UI</li>
                <li>Animation that serves UX</li>
                <li>Performance-minded</li>
                <li>Reusable components</li>
                <li>Docs & handoff</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}

function Contact() {
  const { fadeUp } = useAnims();
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
        <Card className="p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Contact</span>
              <h3 className="text-3xl font-extrabold mt-3" style={{ color: PROFILE.heading }}>Let’s talk</h3>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4"/>{PROFILE.email}</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4"/>{PROFILE.phone}</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/>{PROFILE.location}</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a href={PROFILE.github} target="_blank"><Button variant="outline">GitHub</Button></a>
                <a href={PROFILE.linkedin} target="_blank"><Button variant="outline">LinkedIn</Button></a>
              </div>
            </div>
            <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! Wire this to EmailJS or your API.");}}>
              <div><label className="text-sm">Name</label><input className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="Your name" required/></div>
              <div><label className="text-sm">Email</label><input type="email" className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="you@example.com" required/></div>
              <div><label className="text-sm">Message</label><textarea rows={4} className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none" placeholder="Project idea, timeline, budget…" required/></div>
              <Button className="bg-red-500 border-red-500">Send Message</Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{PROFILE.name}</span>
              <span>• {PROFILE.role}</span>
            </div>
            <nav className="flex flex-wrap gap-5">
              <a href={PROFILE.github} className="hover:underline" target="_blank">GitHub</a>
              <a href={PROFILE.linkedin} className="hover:underline" target="_blank">LinkedIn</a>
              <a href={`mailto:${PROFILE.email}`} className="hover:underline">Email</a>
            </nav>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.</p>
          </div>
        </Card>
      </div>
    </footer>
  );
}

function Dots({ ids, active }) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 hidden lg:flex flex-col gap-3">
      {ids.map((id) => (
        <a key={id} href={`#${id}`} className={[
          "dot w-4 h-4 rounded-full border",
          active === id ? "bg-red-500 border-red-500 scale-110" : "bg-white border-gray-300 hover:bg-gray-100",
        ].join(" ")} />
      ))}
    </div>
  );
}

export default function App() {
  const sections = useMemo(() => ["about", "work", "skills", "testimonials", "contact", "cta"], []);
  const active = useScrollSpy(sections);

  return (
    <div className="min-h-screen text-gray-900" style={{ background: "linear-gradient(to bottom, #ffdbe0, #ffe9ea, #ffdbe0)" }}>
      <Navbar />
      <Hero />
      <Work />
      <Skills />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />

      {/* Floating Contact FAB */}
      <a href={`mailto:${PROFILE.email}`} className="fab-bob fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl" aria-label="Contact">
        <Mail className="w-7 h-7"/>
      </a>

      <Dots ids={sections} active={active} />
    </div>
  );
}
