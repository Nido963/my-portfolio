import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../content.jsx';
import { scrollToId, useTitle } from '../utils.js';
import Reveal from '../components/Reveal.jsx';
import VideoEmbed from '../components/VideoEmbed.jsx';
import Gallery from '../components/Gallery.jsx';
import '../styles/home.css';

export default function Home() {
  const { home } = useContent();
  const { hash } = useLocation();
  useTitle(home.title);

  // Menu links "Videos" / "Contact Us" land here as /#videos and /#contact
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => scrollToId(id, 'auto'), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="home">
      <Hero hero={home.hero} />

      <section id="videos" className="home-videos" aria-label="Videos">
        <div className="container home-videos__grid">
          {home.videos.map((v) => (
            <Reveal className="home-video" key={v.youtubeId}>
              <VideoEmbed video={v} title={v.title} />
              <h2 className="home-video__title">
                {v.title}
                {v.subtitle && (
                  <>
                    <br />
                    {v.subtitle}
                  </>
                )}
              </h2>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="gallery" className="home-gallery" aria-label="Gallery">
        <div className="home-gallery__inner">
          <Gallery gallery={home.gallery} />
        </div>
      </section>

      <section className="home-quote">
        <img className="home-quote__mark" src={home.quote.image} alt="" width="180" height="180" />
        <Reveal as="p" className="home-quote__text container">
          {home.quote.text}
        </Reveal>
      </section>

      <Contact contact={home.contact} />
    </div>
  );
}

function Hero({ hero }) {
  const bgRef = useRef(null);

  // Gentle parallax on the hero photo (the Wix strip scrolled slower than the page)
  useEffect(() => {
    const el = bgRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        el.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="home-hero" aria-label="top of page">
      <div className="home-hero__bg" ref={bgRef} style={{ backgroundImage: `url(${hero.image})` }} />
      <Reveal as="h1" className="home-hero__title">
        {hero.heading}
      </Reveal>
    </section>
  );
}

function Contact({ contact }) {
  const fbSrc =
    'https://www.facebook.com/plugins/page.php?' +
    new URLSearchParams({
      href: contact.facebookPage,
      tabs: 'timeline',
      width: '282',
      height: '579',
      small_header: 'false',
      adapt_container_width: 'true',
      hide_cover: 'false',
      show_facepile: 'true',
      locale: 'en_US',
    });

  return (
    <section id="contact" className="home-contact" aria-label="Contact Us">
      <div className="home-contact__col home-contact__col--fb">
        <iframe
          className="home-contact__fb"
          src={fbSrc}
          title="fb:page Facebook Social Plugin"
          width="282"
          height="579"
          loading="lazy"
          allow="encrypted-media"
        />
      </div>

      <div className="home-contact__col home-contact__col--info">
        <Reveal as="h2" className="home-contact__heading">
          {contact.heading}
        </Reveal>
        <div className="home-contact__lines">
          {contact.lines.map((l) => (
            <p key={l.text}>{l.href ? <a href={l.href}>{l.text}</a> : l.text}</p>
          ))}
        </div>
        <ul className="home-contact__social">
          {contact.social.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
                <img src={s.icon} alt={s.name} width="42" height="42" />
              </a>
            </li>
          ))}
        </ul>
        <img className="home-contact__photo" src={contact.middleImage} alt="Collectif Nafass" loading="lazy" />
        <h6 className="home-contact__signature">{contact.signature}</h6>
      </div>

      <div
        className="home-contact__col home-contact__col--photo"
        style={{ backgroundImage: `url(${contact.rightImage})` }}
        role="img"
        aria-label="Collectif Nafass"
      />
    </section>
  );
}
