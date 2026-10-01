import { Link } from 'react-router-dom';
import { useContent } from '../content.jsx';
import { useTitle } from '../utils.js';
import Reveal from '../components/Reveal.jsx';
import '../styles/shows.css';

export default function Shows() {
  const { shows } = useContent();
  useTitle(shows.title);

  return (
    <div className="page-bg-wrap">
      <div className="page-bg" style={{ backgroundImage: `url(${shows.background})` }} aria-hidden="true" />
      <div className="container shows">
        {shows.items.map((show) => (
          <Reveal as="article" key={show.slug} className={`show-card show-card--${show.slug} show-card--${show.align}`}>
            <div className="show-card__frame">
              <img className="show-card__img" src={show.image} alt={show.title} />
              <div className="show-card__overlay">
                <h2 className="show-card__title">{show.title}</h2>
                <Link to={`/${show.slug}`} className="btn">
                  {shows.buttonLabel}
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
