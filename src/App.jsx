 import React, { useEffect, useMemo, useState } from "react";
import { Menu, MapPin, PhoneCall, Shield, Clock, Rocket, Smartphone, Truck, ArrowUpRight } from "lucide-react";

/** EDIT THESE */
const BRAND = {
  name: "YourBrand",
  phone: "+91 98XXXXXXX",
  email: "support@yourbrand.com",
  address: "Your Address, City 400000",
  appStoreUrl: "#",
  playStoreUrl: "#",
  instagram: "#",
};

/* UI primitives */
const Button = ({ children, variant="solid", size="md", className="", ...props }) => (
  <button
    className={[
      "inline-flex items-center justify-center gap-2 rounded-full transition border",
      size==="lg" ? "h-12 px-6 text-base" : "h-10 px-5 text-sm",
      variant==="outline"
        ? "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50"
        : "bg-gray-900 text-white border-gray-900 hover:opacity-95",
      className,
    ].join(" ")}
    {...props}
  >{children}</button>
);

const Chip = ({ children, className="" }) =>
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm shadow-sm border bg-amber-50 text-amber-800 border-amber-200 ${className}`}>{children}</span>;

const CardShell = ({ children, className="", gridBg=false }) => (
  <div className={`relative rounded-[28px] border bg-white ${className}`}
       style={{ borderColor:"#f3b3a6", boxShadow:"0 16px 40px -18px rgba(230,75,71,.25)" }}>
    {gridBg && (
      <div className="pointer-events-none absolute inset-0 opacity-20"
           style={{ backgroundImage:"radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize:"16px 16px" }}/>
    )}
    <div className="relative">{children}</div>
  </div>
);

/* Scroll spy */
function useScrollSpy(ids){
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=> e.isIntersecting && setActive(e.target.id));
    }, { rootMargin:"-45% 0px -55% 0px", threshold:[0, .3, .6, 1]});
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* Sections */
function NavbarSticky(){
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-full border bg-white/90 backdrop-blur shadow-md h-14 px-4 flex items-center justify-between">
          <a className="font-extrabold tracking-tight text-lg" href="#">{BRAND.name}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about">About</a><a href="#how">How it Works ?</a>
            <a href="#features">Features</a><a href="#support">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer">
              <Button className="hidden sm:inline-flex bg-red-500 border-red-500">Get App <ArrowUpRight className="w-4 h-4"/></Button>
            </a>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border"><Menu className="w-5 h-5"/></button>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureChipsRibbon(){
  return (
    <div className="max-w-5xl mx-auto px-4 -mt-2">
      <CardShell className="px-3 py-3">
        <div className="flex flex-wrap gap-3 justify-center">
          <Chip>⚡ Quick Booking</Chip>
          <Chip className="bg-blue-50 text-blue-800 border-blue-200">🌍 Wide Reach</Chip>
          <Chip className="bg-yellow-50 text-yellow-800 border-yellow-200">🚚 Flexible Delivery</Chip>
          <Chip className="bg-rose-50 text-rose-800 border-rose-200">🧰 Secure Handling</Chip>
          <Chip className="bg-green-50 text-green-800 border-green-200">📍 Real-time Tracking</Chip>
          <Chip className="bg-amber-50 text-amber-800 border-amber-200">🤝 User Matching</Chip>
        </div>
      </CardShell>
    </div>
  );
}

function SectionAbout(){
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <CardShell className="p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Easy to use • Process</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color:"#3b2f2f" }}>Got something urgent to send?</h1>
            <p className="mt-4 text-gray-600 text-lg">Connect with nearby travellers & couriers to deliver your parcel in hours — not days. Real-time tracking, trusted verification, and secure handling.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer"><Button size="lg" className="bg-red-500 border-red-500">Play Store</Button></a>
              <a href={BRAND.appStoreUrl} target="_blank" rel="noreferrer"><Button size="lg" variant="outline">App Store</Button></a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4"/> Verified Travellers</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> On-time Delivery</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Live Tracking</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-tr from-rose-200 via-white to-rose-100 border shadow-sm flex items-center justify-center">
              <Smartphone className="w-24 h-24"/>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border flex items-center gap-3">
              <Truck className="w-6 h-6"/>
              <div>
                <p className="text-sm font-semibold">Real-time ETA</p>
                <p className="text-xs text-gray-600">Stay updated every second</p>
              </div>
            </div>
          </div>
        </div>
      </CardShell>
    </section>
  );
}

function SectionHowItWorks(){
  const steps = [
    { n:1, title:"Order with Ease", desc:"Enter pickup & delivery details and choose the best option." },
    { n:2, title:"Meet Your Traveller", desc:"We match your need with a verified traveller on the same route." },
    { n:3, title:"Track & Deliver", desc:"Follow live tracking until your parcel arrives safely." },
  ];
  return (
    <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <CardShell className="p-0">
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Easy to use • Process</span>
            <h2 className="text-4xl font-extrabold mt-3" style={{ color:"#3b2f2f" }}>How it works?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(s=>(
              <div key={s.n} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center">{s.n}</div>
                <div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    </section>
  );
}

function SectionFeatures(){
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <CardShell gridBg className="p-8 lg:p-10">
          <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Have Information • Every sec</span>
          <h3 className="text-3xl font-extrabold mt-3" style={{ color:"#3b2f2f" }}>Real Time Tracking.</h3>
          <p className="text-gray-600 mt-3">Stay updated every step of the way with our real-time tracking feature, ensuring your package is always within reach.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline">Multiple Vehicle Options</Button>
            <Button variant="outline">Multiple Size Options</Button>
          </div>
        </CardShell>
        <CardShell gridBg className="p-8 lg:p-10">
          <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Fastest Time • Best in class</span>
          <h3 className="text-3xl font-extrabold mt-3" style={{ color:"#3b2f2f" }}>On Time Delivery</h3>
          <p className="text-gray-600 mt-3">We prioritize punctuality with smart matching and route optimization so shipments arrive exactly when expected.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline">Fastest Service</Button>
            <Button variant="outline">Trusted Travellers</Button>
          </div>
        </CardShell>
      </div>
    </section>
  );
}

function SectionSupport(){
  return (
    <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <CardShell className="p-8 lg:p-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">Call us • anytime</span>
          <h3 className="text-3xl font-extrabold mt-3" style={{ color:"#3b2f2f" }}>Customer Support</h3>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> {BRAND.phone}</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4"/> {BRAND.email}</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {BRAND.address}</li>
          </ul>
        </div>
        <div>
          <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault(); alert("Message sent! Hook this to EmailJS or your API.");}}>
            <div>
              <label className="text-sm">Name</label>
              <input className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="Your name" required/>
            </div>
            <div>
              <label className="text-sm">Email / Phone</label>
              <input className="mt-1 w-full h-11 px-3 rounded-xl border focus:outline-none" placeholder="you@example.com or +91" required/>
            </div>
            <div>
              <label className="text-sm">Message</label>
              <textarea rows={4} className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none" placeholder="Tell us about your delivery" required/>
            </div>
            <Button className="bg-red-500 border-red-500">Send Message</Button>
          </form>
        </div>
      </div>
    </CardShell>
    </section>
  );
}

function FooterPolicies(){
  return (
    <footer className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CardShell className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><span className="text-xl">₹</span><span className="font-semibold">{BRAND.name}</span></div>
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

function ScrollSpyDots({ ids, active }){
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 hidden lg:flex flex-col gap-3">
      {ids.map(id=>(
        <a key={id} href={`#${id}`}
           className={`w-4 h-4 rounded-full border transition ${active===id ? "bg-red-500 border-red-500 scale-110" : "bg-white border-gray-300 hover:bg-gray-100"}`} />
      ))}
    </div>
  );
}

export default function App(){
  const sections = useMemo(()=>["about","how","features","support","cta"],[]);
  const active = useScrollSpy(sections);

  return (
    <div className="min-h-screen text-gray-900" style={{ background:"linear-gradient(to bottom, #ffdbe0, #ffe9ea, #ffdbe0)" }}>
      <NavbarSticky />
      <FeatureChipsRibbon />
      <SectionAbout />
      <SectionHowItWorks />
      <SectionFeatures />
      <SectionSupport />

      <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CardShell className="p-0 overflow-hidden">
          <div className="bg-red-500 text-white p-8 lg:p-12 rounded-[28px]">
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
              <div className="opacity-70 hidden md:block">
                <ul className="space-y-2 text-2xl font-semibold">
                  <li>Courier carriers</li><li>Delivery seekers</li><li>Tourists</li>
                  <li>Anytime Delivery</li><li>Travelling Change</li><li>Earn on the way</li>
                </ul>
              </div>
            </div>
          </div>
        </CardShell>
      </section>

      <FooterPolicies />

      <a href={BRAND.playStoreUrl} target="_blank" rel="noreferrer"
         className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl"
         aria-label="Get App">
        <Rocket className="w-7 h-7"/>
      </a>

      <ScrollSpyDots ids={sections} active={active} />
    </div>
  );
}
