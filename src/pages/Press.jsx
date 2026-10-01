import { useState } from 'react';
import { useContent } from '../content.jsx';
import { useTitle } from '../utils.js';
import Reveal from '../components/Reveal.jsx';
import PressPopup from '../components/PressPopup.jsx';
import '../styles/press.css';

export default function Press() {
  const { press } = useContent();
  const [openId, setOpenId] = useState(null);
  useTitle(press.title);
  const open = press.articles.find((a) => a.id === openId);

  return (
    <div className="page-bg-wrap">
      <div className="page-bg" style={{ backgroundImage: `url(${press.background})` }} aria-hidden="true" />

      <div className="container press">
        <Reveal as="h1" className="press__heading">
          {press.heading}
        </Reveal>

        <ul className="press__list">
          {press.articles.map((a) => (
            <Reveal as="li" key={a.id} className="press-item">
              <div className="press-item__logo">
                <img src={a.logo} alt={a.logoAlt} style={{ width: a.logoSize[0], height: a.logoSize[1] }} loading="lazy" />
              </div>
              <div className="press-item__body">
                <p className="press-item__date">{a.date}</p>
                <h2 className="press-item__title">{a.title}</h2>
                <button type="button" className="btn btn--press" aria-haspopup="dialog" onClick={() => setOpenId(a.id)}>
                  {press.buttonLabel}
                </button>
              </div>
            </Reveal>
          ))}
        </ul>

        <h6 className="press__seo">syrian artists</h6>
      </div>

      {open && <PressPopup article={open} onClose={() => setOpenId(null)} />}
    </div>
  );
}
