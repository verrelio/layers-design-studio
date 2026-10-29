import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import { cn } from "@/lib/utils";
import { contact, heroImages, layers, projects, services, type Project } from "@/data/content";

type Go = (i: number) => void;
const ease = [0.76, 0, 0.24, 1] as const;
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} loading="lazy" className={cn("h-full w-full object-cover bg-sand", className)}
    onError={(e) => { e.currentTarget.style.background = "linear-gradient(135deg,#8FA68A,#EDE6DA)"; e.currentTarget.removeAttribute("src"); }} />
);
const Btn = ({ children, onClick, ghost }: { children: React.ReactNode; onClick: () => void; ghost?: boolean }) => (
  <button onClick={onClick} className={cn("rounded-full px-7 py-3 text-sm font-medium transition-colors", ghost ? "border border-ink/30 hover:border-coral" : "bg-coral text-ink hover:bg-deep")}>{children}</button>
);
const Line = ({ children, d = 0 }: { children: React.ReactNode; d?: number }) => (
  <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 + d }}>{children}</motion.span></span>
);

const MOB = { cardWidth: 40, cardHeight: 54, birthHeight: 5, exitHeight: 90, railBirth: -14, railExit: 62 };
export function Hero({ go }: { go: Go }) {
  const [mobile] = useState(() => matchMedia("(max-width:767px)").matches);
  return (
    <ImageStreamHero images={heroImages} cards={9} speed={22} axis={58} path={mobile ? MOB : undefined} className="min-h-dvh w-full bg-bg md:h-full">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 py-24 text-center"
        style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(250,247,242,.92), rgba(250,247,242,0) 70%)" }}>
        <p className="label mb-6">Landscape Architecture · Kolkata</p>
        <h1 className="max-w-4xl text-[2.6rem] leading-[1.05] md:text-8xl"><Line>Spaces that grow <em className="text-deep">with</em></Line><Line d={0.1}>the people who live in them.</Line></h1>
        <p className="mt-6 max-w-lg text-ink/80">Landscape design, site planning and open-space strategy for homes, campuses and communities.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Btn onClick={() => go(3)}>View projects</Btn><Btn ghost onClick={() => go(5)}>Start a conversation</Btn></div>
      </div>
    </ImageStreamHero>
  );
}

const words = ["alive", "rooted", "breathing", "timeless", "welcoming"];
export function Philosophy({ go }: { go: Go }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setInterval(() => setW((x) => (x + 1) % words.length), 2000); return () => clearInterval(t); }, []);
  return (
    <div className="relative flex min-h-dvh md:h-full items-center justify-center bg-bg px-6 py-28 md:py-0">
      <div className="absolute left-[4%] top-[14%] hidden h-[72%] w-[18%] overflow-hidden rounded-lg lg:block"><Img src="/images/p4.jpg" alt="Lush garden around a lily pond" /></div>
      <div className="absolute right-[4%] top-[14%] hidden h-[72%] w-[18%] overflow-hidden rounded-lg lg:block"><Img src="/images/p6.jpg" alt="Resort villa courtyard with pool" /></div>
      <div className="max-w-2xl text-center">
        <button onClick={() => go(3)} className="label mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2">Our approach <ArrowRight size={14} /></button>
        <h2 className="text-4xl md:text-7xl">Landscapes that feel
          <span className="relative block h-[1.15em] overflow-hidden italic text-deep">
            {words.map((x, i) => (
              <motion.span key={x} className="absolute inset-x-0" initial={false} animate={{ y: w === i ? 0 : w > i ? -120 : 120, opacity: w === i ? 1 : 0 }} transition={{ type: "spring", stiffness: 50 }}>{x}</motion.span>
            ))}
          </span></h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink/80">We design the spaces between buildings, the courtyards, podiums, pools, streets and roofs where daily life actually happens. Every project is built in layers: land, water, planting, structure and people, each one considered, none of them an afterthought.</p>
        <div className="mt-8 flex justify-center gap-6 border-t border-ink/15 pt-6 text-sm md:gap-10">
          {[["Selected", "Projects shared"], ["5", "Layers per design"], ["Kolkata", "and beyond"]].map(([a, b]) => <div key={b}><div className="font-display text-3xl">{a}</div><div className="label mt-1">{b}</div></div>)}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [a, setA] = useState(0);
  return (
    <div className="flex min-h-dvh md:h-full flex-col gap-1 bg-ink pt-16 md:flex-row md:pt-0">
      {services.map((s, i) => (
        <motion.div key={s.title} tabIndex={0} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} layout
          animate={{ flexGrow: a === i ? 2.2 : 1 }} transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="group relative min-h-[34dvh] flex-1 basis-0 overflow-hidden">
          <Img src={s.image} alt={s.title} className={cn("transition duration-700", a === i ? "scale-105 grayscale-0" : "grayscale")} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-bg">
            <p className="label">0{i + 1}</p><h3 className="mt-2 text-4xl">{s.title}</h3>
            <p className={cn("mt-3 max-w-xs text-sm leading-relaxed transition-all duration-500", a === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0")}>{s.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const cats = ["All", "Residential", "Commercial", "Institutional", "Hospitality"];
export function Projects() {
  const [cat, setCat] = useState("All");
  const [hov, setHov] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  const cur = list[Math.min(hov, list.length - 1)];
  const next = () => open && setOpen(list[(list.indexOf(open) + 1) % list.length]);

  // Intercept fullpage scroll: cycle through projects before advancing section
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ dir: number }>;
      const dir = ev.detail.dir;
      if (dir > 0 && hov < list.length - 1) {
        ev.preventDefault();
        setHov((h) => Math.min(list.length - 1, h + 1));
      } else if (dir < 0 && hov > 0) {
        ev.preventDefault();
        setHov((h) => Math.max(0, h - 1));
      }
      // if at the boundary (first or last), don't preventDefault → section advances
    };
    window.addEventListener("fullpage:willstep", handler);
    return () => window.removeEventListener("fullpage:willstep", handler);
  }, [hov, list.length]);

  return (
    <div className="relative min-h-dvh md:h-full overflow-hidden bg-ink text-bg">
      <AnimatePresence>
        <motion.div key={cur.images[0] + cur.title} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="h-full" animate={{ scale: 1.08 }} transition={{ duration: 14 }}><Img src={cur.images[0]} alt={cur.title} /></motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      <div className="relative z-10 flex min-h-dvh md:h-full flex-col justify-end px-5 pb-10 pt-24 md:px-14 md:pb-16">
        <ul className="mb-8 max-h-[45dvh] overflow-y-auto">
          {list.map((p, i) => (
            <li key={p.title}><button onMouseEnter={() => setHov(i)} onFocus={() => setHov(i)} onClick={() => setOpen(p)}
              className={cn("font-display text-3xl leading-tight transition-opacity md:text-5xl", i === hov ? "opacity-100" : "opacity-50")}>{p.title}</button></li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => { setCat(c); setHov(0); }} className={cn("label rounded-full border px-4 py-2", cat === c ? "border-coral bg-coral text-ink" : "border-bg/40")}>{c}</button>)}</div>
        <div className="mt-4 flex gap-2 overflow-x-auto">{list.map((p, i) => <button key={p.title} aria-label={p.title} onClick={() => setHov(i)} className={cn("h-14 w-20 shrink-0 overflow-hidden rounded", i === hov && "ring-2 ring-coral")}><Img src={p.images[0]} alt="" /></button>)}</div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal className="fixed inset-0 z-[70] grid grid-rows-[45dvh_1fr] overflow-y-auto bg-ink/95 text-bg md:grid-cols-[2fr_1fr] md:grid-rows-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex snap-x overflow-x-auto">{open.images.map((s) => <div key={s} className="h-[45dvh] w-full shrink-0 snap-center md:h-full"><Img src={s} alt={open.title} className="object-cover" /></div>)}</div>
            <div className="flex flex-col justify-center gap-4 p-8">
              <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-5 top-5 z-10 rounded-full bg-ink/60 p-2"><X /></button>
              <p className="label">{open.type} · {open.location}</p><h3 className="text-4xl md:text-5xl">{open.title}</h3>
              <p className="text-bg/80">{open.text}</p><div><Btn onClick={next}>Next project</Btn></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Process() {
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const t = setInterval(() => setA((x) => (x + 1) % 5), 3000); return () => clearInterval(t); }, [paused]);
  return (
    <div className="flex min-h-dvh md:h-full flex-col items-center justify-center gap-10 bg-moss px-6 py-24 text-bg md:py-0 md:flex-row md:justify-around">
      <div className="relative h-[48dvh] w-full max-w-md md:h-[55dvh]" style={{ perspective: 1200 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-38deg)" }}>
          {layers.map((l, i) => (
            <motion.button key={l.t} onClick={() => setA(i)} aria-label={l.t} animate={{ z: i * 46 + (a === i ? 50 : 0) }} transition={{ type: "spring", stiffness: 90 }}
              className={cn("absolute left-[15%] top-[20%] h-[55%] w-[70%] rounded border p-3 text-left backdrop-blur-sm transition-colors", a === i ? "border-coral bg-coral/30 shadow-[0_0_40px_rgba(245,158,108,.5)]" : "border-bg/30 bg-bg/10")}>
              <span className="label">0{i + 1}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="max-w-sm"><p className="label text-coral">0{a + 1} / 05</p>
        <AnimatePresence mode="wait"><motion.div key={a} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <h3 className="mt-3 text-5xl">{layers[a].t}</h3><p className="mt-4 text-bg/80">{layers[a].d}</p></motion.div></AnimatePresence></div>
    </div>
  );
}

const types = ["Residential", "Commercial", "Institutional", "Hospitality", "Other"];
export function Contact() {
  const [f, setF] = useState({ name: "", email: "", phone: "", type: types[0], message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Please enter a valid email.";
    if (f.message.trim().length < 10) er.message = "Tell us a little more (10+ characters).";
    setErr(er);
    if (Object.keys(er).length) return;
    const body = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nType: ${f.type}\n\n${f.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Project enquiry: " + f.type)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const inp = "w-full border-0 border-b border-ink/30 bg-transparent py-3 outline-none focus:border-coral";
  return (
    <div className="grid min-h-dvh md:h-full bg-bg md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-24 md:px-14">
        <h2 className="text-5xl leading-none md:text-8xl">Let's design the <em className="text-deep">space between.</em></h2>
        <div className="mt-10 space-y-1 text-sm"><p>{contact.address}</p><p>{contact.email}</p><p>{contact.phone}</p>
          <p><a className="underline decoration-coral underline-offset-4" href={contact.instagram} target="_blank" rel="noreferrer">Instagram {contact.handle}</a></p></div>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium hover:bg-deep"><MessageCircle size={16} /> Chat on WhatsApp</a>
        <p className="label mt-12 text-ink/60">© 2026 Layers Design Studio</p>
        <p className="mt-2 text-xs text-ink/50">Design concept for presentation only. Images and project details are illustrative.</p>
      </div>
      <div className="flex items-center bg-sand px-6 py-10 md:px-14">
        {done ? <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl">Thank you. Your email app should open with your message ready to send.</motion.p> : (
          <form onSubmit={submit} noValidate className="w-full max-w-md space-y-3">
            {(["name", "email", "phone"] as const).map((k) => <div key={k}><input aria-label={k} placeholder={k[0].toUpperCase() + k.slice(1)} value={f[k]} onChange={set(k)} className={inp} />{err[k] && <p className="text-xs text-clay">{err[k]}</p>}</div>)}
            <select aria-label="Project type" value={f.type} onChange={set("type")} className={inp}>{types.map((t) => <option key={t}>{t}</option>)}</select>
            <div><textarea aria-label="Message" placeholder="Message" rows={3} value={f.message} onChange={set("message")} className={inp} />{err.message && <p className="text-xs text-clay">{err.message}</p>}</div>
            <Btn onClick={() => {}}>Send message</Btn>
          </form>)}
      </div>
    </div>
  );
}
