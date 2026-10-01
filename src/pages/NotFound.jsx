import { Link } from 'react-router-dom';
import { useTitle } from '../utils.js';

export default function NotFound() {
  useTitle('Page not found | Collectif Nafass');
  return (
    <div className="not-found container">
      <h1>404</h1>
      <p>This page doesn’t exist.</p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
}
