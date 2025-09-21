 import React, { useEffect, useMemo, useState } from "react";
import {
  Menu, MapPin, PhoneCall, Shield, Clock, Rocket, Smartphone, Truck, ArrowUpRight
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** ===== Brand (EDIT THESE) ===== */
const BRAND = {
  name: "YourBrand",
  phone: "+91 98XXXXXXX",
  email: "support@yourbrand.com",
  address: "Your Address, City 400000",
  appStoreUrl: "#",
  playStoreUrl: "#",
  instagram: "#",
  // optional brand colors (override classes if you want)
  primary: "#e64b47",     // CTA red
  borderTint: "#f3b3a6",  // warm card border
  heading: "#3b2f2f",     // deep brown
};

/** ===== UI primitives ===== */
const Button = ({ children, variant = "solid", size = "md", className = "", ...props }) => (
  <button
    className={[
      "inline-flex items-center justify-center gap-2 rounded-full transition border",
      size === "lg" ? "h-12 px-6 text-base" : "h-10 px-5 text-sm",
      variant === "outline"
        ? "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50"
        : "bg-gray-900 text-white border-gray-900 hover:opacity-95",
      "btn-float",
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

const CardShell = ({ children, className = "", gridBg = false }) => (
  <div
    className={["relative rounded-[28px] border bg-white", className].join(" ")}
    style={{
      borderColor: BRAND.borderTint,
      boxShadow: "0 16px 40px -18px rgba(230,75,71,0.28)",
    }}
  >
    {gridBg && <div className="pointer-events-none absolute inset-0 opacity-20 grid-pan" />}
    <div className="relative">{children}</div>
  </div>
);

/** ===== Animations ===== */
const useAnims = () => {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 0.6;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: dur, ease: "easeOut" } },
  };
  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: dur } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } },
  };
  return { fadeUp, fade, stagger, reduce };
};

/** ===== Scroll Spy ===== */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -55% 0px", threshold: [0, 0.3, 0.6, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/** ===== Keyword scroller (CTA right) ===== */
function KeywordScroller({ items = [] }) {
  const { reduce } = useAnims();
  // Duplicate list for seamless loop
  const list = [...items, ...items];
  if (reduce) {
    // No animation when reduced motion preferred
    return (
      <ul className="space-y-2 text-2xl font-semibold opacity-80">
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    );
  }
  return (
    <div className="h-[220px] overflow-hidden">
      <motion.div
        aria-hidden="true"
        initial={{ y: 0 }}
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        className="flex flex-col gap-2 text-2xl font-semibold opacity-80"
      >
        {list.map((t, i) => <div key={i}>{t}</div>)}
      </motion.div>
    </div>
  );
}

/** ===== Sections ===== */
function NavbarSticky() {
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
          <a href="#" className="font-extrabold tracking-tight text-lg">
            {BRAND.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#how" className="hover:opacity-80">How it Works ?</a>
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#support" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer">
              <Button className="hidden sm:inline-flex bg-red-500 border-red-500">Get App <ArrowUpRight className="w-4 h-4" /></Button>
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

function FeatureChipsRibbon() {
  const { stagger, fadeUp } = useAnims();
  const chips = [
    "⚡ Quick Booking",
    "🌍 Wide Reach",
    "🚚 Flexible Delivery",
    "🧰 Secure Handling",
    "📍 Real-time Tracking",
    "🤝 User Matching",
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 -mt-2">
      <CardShell className="px-3 py-3">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {chips.map((label) => (
            <motion.span key={label} variants={fadeUp}>
              <Chip>{label}</Chip>
            </motion.span>
          ))}
        </motion.div>
      </CardShell>
    </div>
  );
}

function SectionAbout() {
  const { fadeUp } = useAnims();
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <CardShell className="p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">
                Easy to use • Process
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: BRAND.heading }}>
                Got something urgent to send?
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Connect with nearby travellers & couriers to deliver your parcel in hours — not days. Real-time
                tracking, trusted verification, and secure handling.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-red-500 border-red-500">Play Store</Button>
                </a>
                <a href={BRAND.appStoreUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" variant="outline">App Store</Button>
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Verified Travellers</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> On-time Delivery</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Live Tracking</div>
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="aspect-[4/3] rounded-[28px] bg-gradient-to-tr from-rose-200 via-white to-rose-100 border shadow-sm flex items-center justify-center"
              >
                <Smartphone className="w-24 h-24" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border flex items-center gap-3"
              >
                <Truck className="w-6 h-6" />
                <div>
                  <p className="text-sm font-semibold">Real-time ETA</p>
                  <p className="text-xs text-gray-600">Stay updated every second</p>
                </div>
              </motion.div>
            </div>
          </div>
        </CardShell>
      </motion.div>
    </section>
  );
}

function SectionHowItWorks() {
  const { stagger, fadeUp } = useAnims();
  const steps = [
    { n: 1, title: "Order with Ease", desc: "Enter pickup & delivery details and choose the best option." },
    { n: 2, title: "Meet Your Traveller", desc: "We match your need with a verified traveller on the same route." },
    { n: 3, title: "Track & Deliver", desc: "Follow live tracking until your parcel arrives safely." },
  ];
  return (
    <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <CardShell className="p-0">
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Easy to use • Process</span>
            <h2 className="text-4xl font-extrabold mt-3" style={{ color: BRAND.heading }}>How it works?</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {steps.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center">{s.n}</div>
                <div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardShell>
    </section>
  );
}

function SectionFeatures() {
  const { fadeUp } = useAnims();
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <CardShell gridBg className="p-8 lg:p-10">
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Have Information • Every sec</span>
            <h3 className="text-3xl font-extrabold mt-3" style={{ color: BRAND.heading }}>Real Time Tracking.</h3>
            <p className="text-gray-600 mt-3">
              Stay updated every step of the way with our real-time tracking feature, ensuring your package is always within reach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline">Multiple Vehicle Options</Button>
              <Button variant="outline">Multiple Size Options</Button>
            </div>
          </CardShell>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <CardShell gridBg className="p-8 lg:p-10">
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Fastest Time • Best in class</span>
            <h3 className="text-3xl font-extrabold mt-3" style={{ color: BRAND.heading }}>On Time Delivery</h3>
            <p className="text-gray-600 mt-3">
              We prioritize punctuality with smart matching and route optimization so shipments arrive exactly when expected.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline">Fastest Service</Button>
              <Button variant="outline">Trusted Travellers</Button>
            </div>
          </CardShell>
        </motion.div>
      </div>
    </section>
  );
}

function SectionSupport() {
  const { fadeUp } = useAnims();
  return (
    <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
        <CardShell className="p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Call us • anytime</span>
              <h3 className="text-3xl font-extrabold mt-3" style={{ color: BRAND.heading }}>Customer Support</h3>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> {BRAND.phone}</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> {BRAND.email}</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {BRAND.address}</li>
              </ul>
            </div>
            <div>
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent! (Wire this to EmailJS or your backend)");
                }}
              >
                <div>
                  <label className="text-sm">Name</label>
                  <input className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="Your name" required />
                </div>
                <div>
                  <label className="text-sm">Email / Phone</label>
                  <input className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="you@example.com or +91" required />
                </div>
                <div>
                  <label className="text-sm">Message</label>
                  <textarea rows={4} className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none" placeholder="Tell us about your delivery" required />
                </div>
                <Button className="bg-red-500 border-red-500">Send Message</Button>
              </form>
            </div>
          </div>
        </CardShell>
      </motion.div>
    </section>
  );
}

function FooterPolicies() {
  return (
    <footer className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CardShell className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">₹</span>
              <span className="font-semibold">{BRAND.name}</span>
            </div>
            <nav className="flex flex-wrap gap-5">
              <a href="#" className="hover:underline">Terms & Conditions</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Refund & Cancellation Policy</a>
              <a href="#" className="hover:underline">Declaration Policy</a>
              <a href="#" className="hover:underline">Insurance policy</a>
            </nav>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.</p>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          </div>
        </CardShell>
      </div>
    </footer>
  );
}

function ScrollSpyDots({ ids, active }) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 hidden lg:flex flex-col gap-3">
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={[
            "dot w-4 h-4 rounded-full border",
            active === id ? "bg-red-500 border-red-500 scale-110" : "bg-white border-gray-300 hover:bg-gray-100",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

/** ===== Main Page ===== */
export default function App() {
  const sections = useMemo(() => ["about", "how", "features", "support", "cta"], []);
  const active = useScrollSpy(sections);

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ background: "linear-gradient(to bottom, #ffdbe0, #ffe9ea, #ffdbe0)" }}
    >
      <NavbarSticky />
      <FeatureChipsRibbon />
      <SectionAbout />
      <SectionHowItWorks />
      <SectionFeatures />
      <SectionSupport />

      {/* CTA */}
      <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CardShell className="p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="bg-red-500 text-white p-8 lg:p-12 rounded-[28px]"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-extrabold tracking-tight">Ready to get started?</h3>
                <p className="mt-2 text-white/90">Download now and experience our unique services</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={BRAND.appStoreUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10"> App Store</Button>
                  </a>
                  <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">▶ Play Store</Button>
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <KeywordScroller
                  items={[
                    "Courier carriers",
                    "Delivery seekers",
                    "Tourists",
                    "Anytime Delivery",
                    "Travelling Change",
                    "Earn on the way",
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </CardShell>
      </section>

      <FooterPolicies />

      {/* Floating FAB */}
      <a
        href={BRAND.playStoreUrl}
        target="_blank"
        rel="noreferrer"
        className="fab-bob fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl"
        aria-label="Get App"
      >
        <Rocket className="w-7 h-7" />
      </a>

      {/* Scroll dots */}
      <ScrollSpyDots ids={sections} active={active} />
    </div>
  );
}
