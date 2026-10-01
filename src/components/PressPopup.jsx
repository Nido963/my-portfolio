import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useKeys, useScrollLock } from '../utils.js';
import Html from './Html.jsx';
import { CloseIcon } from './Icons.jsx';

/** The lightbox each "Lire l'article complet" button opens on the Press page. */
export default function PressPopup({ article, onClose }) {
  const { popup } = article;
  const panelRef = useRef(null);

  useScrollLock(true);
  useKeys(true, { Escape: onClose });

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return createPortal(
    <div
      className="press-popup"
      role="dialog"
      aria-modal="true"
      aria-label={popup.title || article.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="press-popup__x" onClick={onClose} aria-label="Back to site" title="Back to site">
        <CloseIcon />
      </button>

      <article
        ref={panelRef}
        tabIndex={-1}
        className={`press-popup__panel${popup.paper ? ' press-popup__panel--paper' : ''}`}
      >
        {popup.title && (
          <h2 className={`press-popup__title${popup.titleCenter ? ' is-center' : ''}`}>{popup.title}</h2>
        )}
        {popup.subtitle && <h3 className="press-popup__subtitle">{popup.subtitle}</h3>}

        {popup.paragraphs && (
          <div className="press-popup__text">
            {popup.paragraphs.map((p, i) => (
              <Html as="p" key={i} html={p} />
            ))}
          </div>
        )}

        {popup.images?.map((img) => (
          <img
            key={img.src}
            className="press-popup__img"
            src={img.src}
            alt={img.alt || popup.title || article.title}
            style={{ width: img.width }}
            loading="lazy"
          />
        ))}

        {popup.closeButton && (
          <button type="button" className="btn btn--close" onClick={onClose}>
            Close
          </button>
        )}
      </article>
    </div>,
    document.body
  );
}
