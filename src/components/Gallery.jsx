import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Lightbox from './Lightbox.jsx';

// Same deep-link format the Wix gallery used: ?pgid=jcoipdc8-<item id>
const PGID_PREFIX = 'jcoipdc8-';

/** Collage gallery with the exact Wix layout (positions scale with the width). */
export default function Gallery({ gallery }) {
  const { width, height, items } = gallery;
  const [params, setParams] = useSearchParams();

  const pgid = params.get('pgid');
  const openIndex = pgid ? items.findIndex((it) => PGID_PREFIX + it.id === pgid) : -1;

  const open = useCallback(
    (index) => {
      const next = new URLSearchParams(params);
      next.set('pgid', PGID_PREFIX + items[index].id);
      setParams(next, { replace: openIndex !== -1, preventScrollReset: true });
    },
    [params, setParams, items, openIndex]
  );

  const close = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete('pgid');
    setParams(next, { replace: true, preventScrollReset: true });
  }, [params, setParams]);

  return (
    <>
      <div className="gallery" style={{ paddingBottom: `${(height / width) * 100}%` }}>
        {items.map((item, i) => (
          <GalleryItem key={item.id} item={item} index={i} width={width} height={height} onOpen={open} />
        ))}
      </div>
      {openIndex !== -1 && <Lightbox items={items} index={openIndex} onChange={open} onClose={close} />}
    </>
  );
}

function GalleryItem({ item, index, width, height, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const style = {
    left: `${(item.x / width) * 100}%`,
    top: `${(item.y / height) * 100}%`,
    width: `${(item.w / width) * 100}%`,
    height: `${(item.h / height) * 100}%`,
  };

  return (
    <button
      type="button"
      className={`gallery__item${loaded ? ' is-loaded' : ''}`}
      style={style}
      onClick={() => onOpen(index)}
      aria-label={item.title || 'image'}
      aria-haspopup="dialog"
    >
      <img src={item.src} alt={item.title || ''} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
      {(item.title || item.description) && (
        <span className="gallery__overlay">
          <span className="gallery__title">{item.title}</span>
          <span className="gallery__desc">{item.description}</span>
        </span>
      )}
    </button>
  );
}

export function usePreload(src) {
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }, [src]);
}
