import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || !('IntersectionObserver' in window)) return undefined;
    const rect = el.getBoundingClientRect();
    const seen = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (seen) {
      el.classList.add('is-in');
      return undefined;
    }
    el.classList.add('reveal');
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.classList.add('is-in');
      io.disconnect();
    }, { threshold: 0.14 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Count({ to }) {
  const ref = useRef(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || !('IntersectionObserver' in window)) return undefined;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 800);
        setValue(Math.round(to * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);
  return <b ref={ref}>{value}</b>;
}
