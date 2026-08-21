/**
 * Hooks compartidos FAYD.
 * Extraídos de App.jsx sin cambios de comportamiento (refactor lote 2),
 * salvo useReveal cuyo cleanup de timer sí se corrigió (commit 5d405).
 */
import { useEffect, useState } from 'react';

export function useScrollY(threshold = 0) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export function useReveal(threshold = 0.15, delay = 0) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref) return;
    let timer;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold }
    );
    obs.observe(ref);
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [ref, threshold, delay]);
  return {
    ref: setRef,
    className: visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    style: { transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms` },
  };
}
