import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../content.jsx';
import { scrollToId } from '../utils.js';

/** Which home section is in view, so "Videos" / "Contact Us" light up like on Wix. */
function useHomeSection(active) {
  const [section, setSection] = useState('');
  useEffect(() => {
    if (!active) return;
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current = '';
      for (const id of ['videos', 'gallery', 'contact']) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);
  return active ? section : '';
}

export default function Header() {
  const { site } = useContent();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const section = useHomeSection(pathname === '/');

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to) => {
    const [path, anchor] = to.split('#');
    if (anchor) return pathname === '/' && section === anchor;
    if (path === '/') return pathname === '/' && (section === '' || section === 'gallery');
    return pathname === path;
  };

  const onNavClick = (e, to) => {
    const [path, anchor] = to.split('#');
    setOpen(false);
    if (pathname === (path || '/')) {
      e.preventDefault();
      if (anchor) {
        window.history.replaceState(null, '', `/#${anchor}`);
        scrollToId(anchor);
      } else {
        window.history.replaceState(null, '', path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (anchor) {
      e.preventDefault();
      navigate({ pathname: path || '/', hash: `#${anchor}` });
    }
  };

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <div className="site-header__inner">
        <button
          className="site-header__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="site-nav" aria-label="Site">
          <ul>
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={isActive(item.to) ? 'is-active' : undefined}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  onClick={(e) => onNavClick(e, item.to)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="social-bar" aria-label="Social Bar">
          {site.social.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
                <img src={s.icon} alt={`Grey ${s.name} Icon`} width="33" height="33" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
