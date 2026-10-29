import { useCallback, useEffect, useRef, useState } from "react";

export function useFullpage(ids: readonly string[], enabled: boolean) {
  const fromHash = useCallback(() => Math.max(0, ids.indexOf(location.hash.slice(1))), [ids]);
  const [index, setIndex] = useState(fromHash);
  const lock = useRef(false);
  const go = useCallback((n: number) => {
    const i = Math.min(ids.length - 1, Math.max(0, n));
    setIndex(i);
    history.replaceState(null, "", `#${ids[i]}`);
  }, [ids]);
  const step = useCallback((d: number) => {
    if (lock.current) return;
    lock.current = true;
    setTimeout(() => (lock.current = false), 900);
    setIndex((cur) => {
      const i = Math.min(ids.length - 1, Math.max(0, cur + d));
      history.replaceState(null, "", `#${ids[i]}`);
      return i;
    });
  }, [ids]);
  useEffect(() => {
    if (!enabled) return;
    let y0 = 0;
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= 8) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      // If the wheel event is inside a scrollable container that hasn't reached
      // its end in the scroll direction, let the container scroll and don't
      // advance to the next section.
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const ov = getComputedStyle(el).overflowY;
        if ((ov === "auto" || ov === "scroll") && el.scrollHeight > el.clientHeight + 2) {
          if (dir > 0 && el.scrollTop < el.scrollHeight - el.clientHeight - 2) return;
          if (dir < 0 && el.scrollTop > 2) return;
        }
        el = el.parentElement;
      }
      step(dir);
    };
    const key = (e: KeyboardEvent) => {
      if (/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) step(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) step(-1);
    };
    const ts = (e: TouchEvent) => { y0 = e.touches[0].clientY; };
    const te = (e: TouchEvent) => { const dy = y0 - e.changedTouches[0].clientY; if (Math.abs(dy) > 50) step(dy > 0 ? 1 : -1); };
    const hash = () => setIndex(fromHash());
    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("keydown", key);
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend", te, { passive: true });
    window.addEventListener("hashchange", hash);
    return () => {
      window.removeEventListener("wheel", wheel); window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te);
      window.removeEventListener("hashchange", hash);
    };
  }, [enabled, step, fromHash]);
  return { index, go };
}
