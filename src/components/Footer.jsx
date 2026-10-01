import { useContent } from '../content.jsx';

export default function Footer() {
  const { site } = useContent();
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{site.domain}</p>
      </div>
    </footer>
  );
}
