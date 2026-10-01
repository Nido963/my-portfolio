import { useContent } from '../content.jsx';
import { useTitle } from '../utils.js';
import Html from '../components/Html.jsx';
import Reveal from '../components/Reveal.jsx';
import '../styles/bio.css';

export default function Bio() {
  const { bio } = useContent();
  useTitle(bio.title);
  const { collective, founder } = bio;

  return (
    <div className="bio">
      <section className="container bio-intro">
        <Reveal as="h2" className="bio-h">
          {collective.heading}
        </Reveal>
        <Reveal as="p" className="bio-intro__text">
          {collective.text}
        </Reveal>
      </section>

      <section className="container bio-founder">
        <div className="bio-founder__stage">
          <Reveal className="bio-founder__portrait">
            <img src={founder.portrait} alt="Nidal Abdo" />
          </Reveal>
          <Reveal className="bio-founder__caption">
            <p className="bio-founder__quote">{founder.quote}</p>
            <h2 className="bio-h bio-founder__name">{founder.name}</h2>
            <p className="bio-founder__role">{founder.role}</p>
          </Reveal>
        </div>
        <Reveal>
          <Html as="p" className="bio-founder__text" html={founder.html} />
        </Reveal>
      </section>

      <hr className="bio-rule" />

      <section className="container bio-exp">
        <Reveal as="h2" className="bio-spaced-h">
          {bio.experiencesHeading}
        </Reveal>

        {bio.experiences.map((exp, i) => (
          <Reveal className="bio-exp__block" key={i}>
            <Html as="h3" className="bio-exp__heading" html={exp.heading} />
            {exp.lines.map((line, j) => (
              <Html
                as="p"
                key={j}
                className={`bio-exp__line${line.sub ? ' is-sub' : ''}`}
                html={line.html}
              />
            ))}
          </Reveal>
        ))}
      </section>

      <hr className="bio-rule" />

      <section className="container bio-edu">
        <Reveal as="h2" className="bio-edu__h">
          {bio.educationHeading}
        </Reveal>
        <Reveal as="ul" className="bio-edu__list">
          {bio.education.map((e, i) => (
            <Html as="li" key={i} html={e} />
          ))}
        </Reveal>
      </section>

      <hr className="bio-rule" />

      <section className="container bio-bottom">
        <Reveal>
          <img src={bio.bottomImage} alt="Collectif Nafass on stage" loading="lazy" />
        </Reveal>
      </section>
    </div>
  );
}
