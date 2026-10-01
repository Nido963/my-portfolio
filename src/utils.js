import { useEffect } from 'react';

export const HEADER_HEIGHT = 58;

export function scrollToId(id, behavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  window.scrollTo({ top, behavior });
}

/** Sets the browser tab title like the original Wix pages. */
export function useTitle(title) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}

/** Locks page scroll while a modal/lightbox is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/** Calls handler on Escape / arrow keys while active. */
export function useKeys(active, handlers) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => handlers[e.key]?.(e);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
}
