import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Bio from './pages/Bio.jsx';
import Shows from './pages/Shows.jsx';
import ShowDetail from './pages/ShowDetail.jsx';
import Press from './pages/Press.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bio" element={<Bio />} />
        <Route path="shows-1" element={<Shows />} />
        <Route path="habitus" element={<ShowDetail slug="habitus" />} />
        <Route path="what-if-tomorrow" element={<ShowDetail slug="what-if-tomorrow" />} />
        <Route path="in-motion" element={<ShowDetail slug="in-motion" />} />
        <Route path="press" element={<Press />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
