import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useFullpage } from "@/hooks/useFullpage";
import { contact, sectionNames, sections } from "@/data/content";
import { Contact, Hero, Philosophy, Process, Projects, Services } from "@/components/Sections";

const ease = [0.76, 0, 0.24, 1] as const;
const useDesktop = () => {
  const q = "(min-width:768px)";
  const [m, setM] = useState(() => matchMedia(q).matches);
  useEffect(() => { const l = matchMedia(q); const f = () => setM(l.matches); l.addEventListener("change", f); return () => l.removeEventListener("change", f); }, []);
  return m;
};

const Logo = () => (
  <a href="#home" className="flex items-center gap-3" aria-label="Layers Design Studio home">
    <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden><circle cx="20" cy="20" r="20" fill="#F59E6C" /><path d="M11 12h14l4 4v12H11z" fill="#fff" /><path d="M25 12v4h4z" fill="#E07B4A" /></svg>
    <span className="font-display text-xl">Layers Design Studio</span>
  </a>
);

export default function App() {
  const desktop = useDesktop();
  const { index, go } = useFullpage(sections, desktop);
  const [menu, setMenu] = useState(false);
  const [hint, setHint] = useState(true);
  useEffect(() => { const h = () => setHint(false); addEventListener("wheel", h, { once: true }); addEventListener("keydown", h, { once: true }); return () => { removeEventListener("wheel", h); removeEventListener("keydown", h); }; }, []);
  const views = [<Hero go={go} />, <Philosophy go={go} />, <Services />, <Projects />, <Process />, <Contact />];
  const dark = index === 2 || index === 3 || index === 4;
  const nav = (i: number) => { setMenu(false); if (desktop) go(i); else document.getElementById(sections[i])?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 ${dark && desktop ? "text-bg" : "text-ink"}`}>
        <Logo />
        <button onClick={() => setMenu(true)} aria-label="Open menu" className="rounded-full border border-current/30 p-3"><Menu size={18} /></button>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.nav aria-label="Main" className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-3 bg-moss text-bg" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}>
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="absolute right-8 top-6"><X /></button>
            {sectionNames.map((n, i) => <button key={n} onClick={() => nav(i)} className="font-display text-5xl hover:text-coral md:text-7xl">{n}</button>)}
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="label mt-6 text-coral">Instagram {contact.handle}</a>
          </motion.nav>
        )}
      </AnimatePresence>
      {desktop ? (
        <>
          <main className="relative h-dvh overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.section key={index} id={sections[index]} className="absolute inset-0 overflow-hidden"
                initial={{ clipPath: "inset(100% 0 0 0)", y: 40, opacity: 1 }} animate={{ clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1 }} exit={{ opacity: 0, y: -24, transition: { duration: 0.6 } }} transition={{ duration: 0.9, ease }}>
                {views[index]}
              </motion.section>
            </AnimatePresence>
          </main>
          <div className={`label fixed bottom-6 left-10 z-50 ${dark ? "text-bg" : "text-ink"}`}>0{index + 1} / 06 · {sectionNames[index]}</div>
          <nav aria-label="Sections" className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
            {sectionNames.map((n, i) => <button key={n} title={n} aria-label={n} onClick={() => go(i)} className={`h-2 w-2 rounded-full border border-coral ${i === index ? "bg-coral" : ""}`} />)}
          </nav>
          {hint && <div className="label fixed bottom-6 right-10 z-50 flex items-center gap-3">Scroll <motion.span className="block h-px w-10 origin-left bg-current" animate={{ scaleX: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} /></div>}
        </>
      ) : (
        <main className="h-dvh snap-y snap-mandatory overflow-y-auto">
          {views.map((v, i) => <section key={sections[i]} id={sections[i]} className="min-h-dvh snap-start">{v}</section>)}
        </main>
      )}
    </>
  );
}
