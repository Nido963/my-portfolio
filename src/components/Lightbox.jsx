import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKeys, useScrollLock } from '../utils.js';
import { usePreload } from './Gallery.jsx';
import { CloseIcon, ExpandIcon, ShareIcon, ThinChevron } from './Icons.jsx';

/** Full-screen photo viewer — white page, photo on the left, title + credit on the right (like Wix). */
export default function Lightbox({ items, index, onChange, onClose }) {
  const item = items[index];
  const count = items.length;
  const prev = () => index > 0 && onChange(index - 1);
  const next = () => index < count - 1 && onChange(index + 1);
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useScrollLock(true);
  useKeys(true, { Escape: onClose, ArrowLeft: prev, ArrowRight: next });
  usePreload(items[index + 1]?.src);
  usePreload(items[index - 1]?.src);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${item.title || 'Image'} | Home`;
    return () => {
      document.title = prevTitle;
    };
  }, [item.title]);

  // Touch swipe on phones
  const touch = useRef(null);
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touch.current = null;
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: item.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      /* user cancelled */
    }
  };

  const fullscreen = () => {
    const el = rootRef.current;
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Image'}
      tabIndex={-1}
      ref={rootRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__tools">
        <button type="button" onClick={fullscreen} aria-label="Full screen">
          <ExpandIcon />
        </button>
        <button type="button" onClick={share} aria-label="Share">
          <ShareIcon />
        </button>
        {copied && <span className="lightbox__copied">Link copied</span>}
      </div>

      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>

      <div className="lightbox__stage">
        <button
          type="button"
          className="lightbox__arrow lightbox__arrow--prev"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous Item"
        >
          <ThinChevron dir="left" />
        </button>

        <figure className="lightbox__figure">
          <img key={item.src} src={item.src} alt={item.title || ''} />
        </figure>

        <button
          type="button"
          className="lightbox__arrow lightbox__arrow--next"
          onClick={next}
          disabled={index === count - 1}
          aria-label="Next Item"
        >
          <ThinChevron dir="right" />
        </button>

        <aside className="lightbox__info">
          {item.title && <h1>{item.title}</h1>}
          {item.description && <p>{item.description}</p>}
        </aside>
      </div>
    </div>,
    document.body
  );
}
