import { Link } from 'react-router-dom';
import { useContent } from '../content.jsx';
import { useTitle } from '../utils.js';
import Html from '../components/Html.jsx';
import Reveal from '../components/Reveal.jsx';
import VideoEmbed from '../components/VideoEmbed.jsx';
import { ChevronLeft } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import '../styles/show-detail.css';

export default function ShowDetail({ slug }) {
  const { showPages } = useContent();
  const show = showPages[slug];
  useTitle(show?.title);
  if (!show) return <NotFound />;

  return (
    <div className="page-bg-wrap">
      <div className="page-bg" style={{ backgroundImage: `url(${show.background})` }} aria-hidden="true" />

      <div className="container show-detail">
        {/* Same as Wix: the back arrow returns to the Videos section of the home page */}
        <Link to="/#videos" className="show-detail__back" aria-label="Back">
          <ChevronLeft />
        </Link>

        <div className="show-detail__col">
          <Reveal as="h1" className="sd-title">
            {show.heading}
          </Reveal>
          <Reveal className="sd-credits">
            {show.credits.map((c, i) => (
              <Html as="p" key={i} html={c} />
            ))}
          </Reveal>

          {show.sections.map((s) => (
            <Reveal as="section" key={s.heading} className={`sd-section${s.small ? ' is-small' : ''}`}>
              <h2 className="sd-h2">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <Html as="p" key={i} html={p} />
              ))}
            </Reveal>
          ))}

          {show.peopleHeading && (
            <Reveal as="h2" className="sd-people-h">
              {show.peopleHeading}
            </Reveal>
          )}

          <div className={`sd-people${show.peopleHeading ? '' : ' no-heading'}`}>
            {show.people.map((p) => (
              <Reveal as="article" className="sd-person" key={p.name}>
                <img src={p.image} alt={p.name} loading="lazy" />
                <h3>{p.name}</h3>
                <Html as="p" className={p.small ? 'is-small' : undefined} html={p.bio} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal as="section" className={`sd-media${show.media.align === 'left' ? ' is-left' : ''}`}>
          <h2 className="sd-media__h">{show.media.heading}</h2>
          <div className="sd-media__videos">
            {show.media.videos.map((v) => (
              <VideoEmbed key={v.id || v.url} video={v} title={show.heading} className={v.type === 'facebook' ? 'is-fb' : ''} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
