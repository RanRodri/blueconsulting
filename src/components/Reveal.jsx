import { useEffect, useRef, useState } from 'react';

const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Aparición suave al hacer scroll */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(reduce);
  useEffect(() => {
    const show = () => setShown(true);
    window.addEventListener('bc-reveal-all', show);
    if (reduce || !('IntersectionObserver' in window)) { show(); return () => window.removeEventListener('bc-reveal-all', show); }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show(); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(ref.current);
    return () => { io.disconnect(); window.removeEventListener('bc-reveal-all', show); };
  }, []);
  return (
    <Tag ref={ref} className={`reveal${shown ? ' in' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* Contador animado */
export function Count({ to }) {
  const [n, setN] = useState(reduce ? to : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (reduce || !('IntersectionObserver' in window)) { setN(to); return; }
    const set = () => setN(to);
    window.addEventListener('bc-reveal-all', set);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (now) => { const p = Math.min(1, (now - t0) / 1200); setN(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); window.removeEventListener('bc-reveal-all', set); };
  }, [to]);
  return <span ref={ref}>{n}</span>;
}
